# 50.043 Big Data Project

Innovating the book review industry
# Automation scripts for setting up and tearing down

## Setup
There is no need to clone the whole repository. However all scripts in the start-all-scripts folder need to be in the same folder and ran within the folder itself.


```
Download scripts script to be filled
```

Download `start-all-scripts` folder and run startall.sh\
startall.sh uses [fLintrocK](https://github.com/nchammas/flintrock) to setup our apache and hadoop backend.\
It then uses [AWS Cloudformation](https://aws.amazon.com/cloudformation/) which is a declarative language for setting up AWS resources. You can take a look at database.json to see how the resources are created.
```
./startall.sh
```
The only two AMIs that we use are `ami-061eb2b23f9f8839c` which is a blank Ubuntu image and `ami-07539a31f72d244e7` which is a blank Amazon Linux 2.

After running `startall.sh` the program will take some time to setup ~10 minutes. As it will setup MySql MongoDB Flask and Apache Spark Namenode and Datanode on different servers. There is no need to key in IP addresses as all IP addresses has been keyed in for you. Because of this is is important that you **do not** restart any of the instances as the IP address of the current instance would change.

## Viewing application
Running the `dns.sh` after a while would give you the dns of our frontend application. Note that the order of setting up might not be in order **so the flask app might be ready while mysql is not ready**. Please it give time for it to setup. 
```
./dns.sh
```

How to view part 3 here too.
## Destroy scripts
After you are done you can run `destroyall.sh` which destroys all resources that we created including security groups and ec2 instances.
```
./destroyall.sh
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
