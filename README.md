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
The Mongo DNS and MySQL DNS are needed in the ETL section to retrieve from our database to the HDFS.

## Setup Hadoop File System and Apache Spark

Download `hadoopsetupfinal` folder, which is located inside the `scripts` folder on github. Run flint_test.sh to configure your HDFS and Spark setup.
```
sh ./scripts/hadoopsetupfinal/flint_test.sh 
```

Upon running of the script file, it will ask for 4 inputs:
  - Number of instances: (This specifies the number of slave nodes that you require. If you type in 2 here, a total of 3 instances will be created; 1 for master and 2 for slaves)
  - Instance type: (we typically choose t2.medium, but you can specify any instance that you want. Preferably t2.medium or better. At least 4gb memory is good.)
  - Key name: (just enter your key name without any file extension. E.g. if my key name is database_key.pem, I will enter database_key)
  - Path to key: (Enter the full path to where your key is located, including file extention. E.g /Users/Joseph/.ssh/database_key.pem)
Below is an example of the inputs:
```
Enter number of slaves: 4
Enter instance type: t2.medium
Enter key name: test_instance
Enter key path: /Users/Joseph/.ssh/test_instance.pem
```

Sample output when setup is completed:
```
HDFS online.
Spark online.
launch finished in 0:03:15.
Cluster master: ec2-54-169-132-213.ap-southeast-1.compute.amazonaws.com
Login with: flintrock login databass_cluster
```
If you want to ssh into the master node, simply type the following into your terminal:
```
flintrock login databass_cluster
```

# Extract, Transform and Load
Here, we will perform ETL from our SQL and Mongo databases to the HDFS. 
  - Run the hdfs_numpy.sh file using the following syntax (you have to manually type in the respective DNS):
  - sh hdfs_numpy.sh <mongo_dns> <sql_dns> 
  - This file installs the packages numpy, pyspark, and flask. It also downloads the corresponding pearson.py and spark_tfidf.py from our github repository so that we can proceed to Task 2.
  - After the script has finished execution, etl_sql_reviews.csv should have been located inside "HDFS /checkpoint3/etl_sql_reviews.csv"

Example:
```
(E.g. sh hdfs_numpy.sh ec2-13-250-11-182.ap-southeast-1.compute.amazonaws.com ec2-52-221-180-221.ap-southeast-1.compute.amazonaws.com)
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
flintrock destroy databass_cluster
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

# Pearson Correlation
  - Execute "sh task2a.sh"
  - This process should take roughly ~1min
  - The correlation score will be displayed to you when the script has finished executing

# TF-iDF
  - Execute "sh task2b.sh"
  - This process should take roughly ~15min
  - The TFIDF scores will then be calculated using etl_sql_reviews.csv on the HDFS.
  - The output csv is returned in the following format: "reviewerID", "asin", "word1:tfidf_score1 word2:tfidf_score2 ... wordN:tfidf_scoreN"
  - The head of the csv file will be displayed to you when the script has finished executing

If you want to inspect the ouput csv file, ssh in with:
```
flintrock login databass_cluster
```
and you can locate the file called "tfidf_local.csv".

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
