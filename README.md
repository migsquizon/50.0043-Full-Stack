# 50.043 Big Data Project

Innovating the book review industry
# Automation scripts for setting up and tearing down

## Setup Flask MySql Mongo
There is no need to clone the whole repository. However all scripts in the `start-all-scripts` folder need to be in the same folder and ran within the folder itself.

Download `start-all-scripts` folder.  
```
python3 databass.py start
```
When prompted for `key-name`, enter your ec2-ssh key-name **without .pem** or any file extension.
* Note that it is possible the setup fails.\
 In our testing it has failed in about 1 in 20 times due to instance failed,network error, some packages temporarily down, etc. In that case [destroy](#destroy-scripts) and start again.\
 We have done our best to make sure this happens as little as possible by checking exit codes of every install command and rerunning it if it fails.\
The scripts should take less than 10 minutes to setup fully.

SAMPLE OUTPUT
```
enter key-name: gary-ong
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
Mongo dns
mysql dns
logs dns
```
## Setup Spark Hadoop
Short explanation
```
some code here
```
## Setup Explanation
We use [fLintrocK](https://github.com/nchammas/flintrock) to setup our apache and hadoop backend.\
It then uses [AWS Cloudformation](https://aws.amazon.com/cloudformation/) which is a declarative language for setting up AWS resources. You can take a look at `database.json` to see how the resources are created.

The only two AMIs that we use are `ami-061eb2b23f9f8839c` which is a blank Ubuntu image and `ami-07539a31f72d244e7` which is a blank Amazon Linux 2.

We chose to run Flask,MySql and MongoDB in `t3.small`. `t3.small` has a higher bandwidth than `t2.medium` at **half the price** and the main bottleneck is the internet speed for downloading data and dependencies. Please **DO NOT** change the instance type as occasionally we would get http 503 service unavailable on some dependencies when running on instances with a lower bandwidth. Also **DO NOT** restart any of the instances as all IPs are binded at start and restarting will reset the IPs.


## Destroy scripts
After you are done you can run the destroy script which destroys all resources that we created including security groups and ec2 instances.
```
python3 databass.py destroy
```
```
destroy spark hadoop here
```
# Use case Documentation
## Checkpoint 1 and 2

* **Search**\
You can also search for the book in the search bar on top. Notice that the results change as you type! We used regexp to match the front character to achieve this. However since the time complexity for regexp is too high for MySql (can't query index based on regexp and 1 book has many reviews + overhead of averaging reviews to show overall rating)  we are unable to show the ratings live while searching.\
**Note that since most books do not have titles we implemented search based on ASIN instead.**
* **Categories**\
Categories on the side of the home page can be clicked. Again we used regexp for matching and querying categories. Tricky as categories are in nested lists.

* **Displaying Book**\
Here we display metadata of the book. We also display the reviews with the latest shown on top. Readers also view and buyers also bought are shown whenever available.

* **Add Book**\
You must register first before adding a book. Simply click on the right hand corner to register.\
Once registered, you should be automatically logged in. The top bar should haved changed and you can now add a book. Books are inserted into MongoDb.

* **Write Review**\
You need to register to write a review.
Simply go to any book and click on the write review button. Reviews are inserted into MySql.

* **Logs**

## Checkpoint 3
Some explanation on how u arrive at the answer


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
