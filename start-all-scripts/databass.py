import boto3
import pprint
import requests
import time

client = boto3.client('cloudformation')
ec2 = boto3.client('ec2')
pp = pprint.PrettyPrinter()

def parse_template(template):
    with open(template) as template_fileobj:
        template_data = template_fileobj.read()
    client.validate_template(TemplateBody=template_data)
    return template_data

def stack_exists(stack_name):
    stacks = client.list_stacks()['StackSummaries']
    for stack in stacks:
        if stack['StackStatus'] == 'DELETE_COMPLETE':
            continue
        if stack_name == stack['StackName']:
            return True
    return False

def create_stack(name):
    if not stack_exists(name):
        template = parse_template('database.json')
        client.create_stack(StackName=name,\
            TemplateBody=template,Parameters=[
                {
                    'ParameterKey':'KeyName',
                    'ParameterValue':'gary-ong'
                },
                {
                    'ParameterKey':'InstanceType',
                    'ParameterValue':'t2.micro'
                },
                {
                    'ParameterKey':'SparkIP',
                    'ParameterValue':'123.123'
                }
        
        ])
        print('creating cloud formation stack')
        waiter = client.get_waiter('stack_create_complete')
        waiter.wait(StackName=name)
        print('stack created')
    else:
        print('stack already exists')
        

def get_instance_ids(name):
    ls = []
    for output in client.describe_stacks(StackName=name)['Stacks'][0]['Outputs']:
        if output['OutputKey'] == 'Mongo' or  output['OutputKey'] == 'MySql' or  output['OutputKey'] == 'Flask':
            ls.append(output['OutputValue'])
    return ls

def get_dns(name):
    for output in client.describe_stacks(StackName=name)['Stacks'][0]['Outputs']:
        if output['OutputKey'] == 'PublicDNS':
            DNS = output['OutputValue']
            break
    return DNS

def get_statuses(ids):
    """
    waits for everything to be ready
    """
    print('waiting for instances to be ready')
    waiter1 = ec2.get_waiter('instance_status_ok')
    waiter2 = ec2.get_waiter('system_status_ok')
    waiter1.wait(InstanceIds=ids)
    waiter2.wait(InstanceIds=ids)
    return True

def destroy_stack(name):
    try:
        print('destroying stack {}'.format(name))
        client.delete_stack(StackName=name)
        waiter = client.get_waiter('stack_delete_complete')
        waiter.wait(StackName=name)
        print('stack {} deleted'.format(name))
        return True
    except Exception as e:
        print(e)
    
def is_db_ready(dns):
    if requests.get('{}:5000/test/mongo'.format(dns)).status_code ==200 and \
    requests.get('{}:5000/test/sql'.format(dns)).status_code == 200:
        return True
    else:
        return False

# destroy_stack('databass')

if __name__ == '__main__':
    create_stack('databass')
    ids = get_instance_ids('databass')
    print(ids)
    if get_statuses(ids):
        dns = get_dns('databass')
        time.sleep(60)#wait for 1 minute before polling
        while not is_db_ready(dns):#poll for flask backend to check if db is up
            time.sleep(15)
        print("DNS OF FRONT END PAGE")
        print("http://{}:3000".format(dns))



# print(get_statuses(InstanceIds))

# response = ec2.describe_instance_status(
#     InstanceIds=[
#         'i-07d1d4fdbc613128e',
#         'i-002fab3957bb03db7',
#         'i-07d7b120ed7a4abff'
#     ])

# pp.pprint(response['InstanceStatuses'])



# InstanceIds=[
#         'i-07d1d4fdbc613128e',
#         'i-002fab3957bb03db7',
#         'i-07d7b120ed7a4abff'
#     ]

# waiter = client.get_waiter('stack_create_complete')
# waiter.wait(StackName='databass')
# print(waiter)
