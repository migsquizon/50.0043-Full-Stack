# 50.043 Big Data Project

Innovating the book review industry
# Automation scripts for setting up and tearing down

## Setup
There is no need to clone the whole repository. However all scripts in the start-all-scripts folder need to be in the same folder and ran within the folder itself.

Download `start-all-scripts` folder.  
We use [fLintrocK](https://github.com/nchammas/flintrock) to setup our apache and hadoop backend.\
It then uses [AWS Cloudformation](https://aws.amazon.com/cloudformation/) which is a declarative language for setting up AWS resources. You can take a look at `database.json` to see how the resources are created.

To setup flask,mysql,mongo
```
python3 databass.py start
```
The only two AMIs that we use are `ami-061eb2b23f9f8839c` which is a blank Ubuntu image and `ami-07539a31f72d244e7` which is a blank Amazon Linux 2.

We chose to run Flask,MySql and MongoDB in `t3.small`. `t3.small` has a higher bandwidth than `t2.medium` at **half the price** and the main bottleneck is the internet speed for downloading data and dependencies. Please **DO NOT** change the instance type as occasionally we would get http 503 service unavailable on some dependencies when running on instances with a lower bandwidth. Also **DO NOT** restart any of the instances as all IPs are binded at start and restarting will reset the IPs.


## Viewing application
Just wait after running the start scripts.
DNS of frontend will be printed as soon as possible when it is ready.\
SAMPLE OUTPUT
```
creating cloud formation stack
stack created
['i-0edd1fc15cf8b4899', 'i-0c4ff56f1d9fc42f5', 'i-097ba40aa025db785']
waiting for instances to be ready
Instance ready
waiting for databases to load data
Waiting for db to load
Waiting for db to load
Waiting for db to load
Waiting for db to load
Waiting for db to load
Waiting for db to load
Waiting for db to load
front end page
http://ec2-13-229-123-250.ap-southeast-1.compute.amazonaws.com:3000
```

How to view part 3 here too.
## Destroy scripts
After you are done you can run the destroy script which destroys all resources that we created including security groups and ec2 instances.
```
python3 databass.py destroy
```

# Setting up Development Environment
## Setting up backend

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Virtual Environment and Flask

What things you need to install the software and how to install them

If you have virtualenv installed, please skip:
```
pip install virtualenv virtualenvwrapper
```

From there, you need to add the following lines to your ~/.bash_profile  (notice that for macOS the file name is .bash_profile  and for Ubuntu it is .bashrc .

```
nano ~/.bash_profile
```

Append the following to the end. Ensure that the path corresponds to your root python path.

```
export WORKON_HOME=$HOME/.virtualenvs
export VIRTUALENVWRAPPER_PYTHON=/usr/local/bin/python3
source /usr/local/bin/virtualenvwrapper.sh
```

Then source it

```
source ~/.bash_profile
```

Finally, create the virtual environment and install flask.

```
mkvirtualenv env_name -p python3
pip install Flask
```

Ensure you are in the virtual environment, before installing flask as this allows us to isolate our development environment.

To activate and deacivate the virtual environment:

```
workon env_name # activates virtual env
deactivate # deactivates virtual env
```

## Setting up the frontend

@frontend peeps, edit for necessary setup

Also please restructure the client folder according to React requirements
