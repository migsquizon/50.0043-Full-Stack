# 50.043 Big Data Project

Innovating the book review industry
# Automation scripts for setting up and tearing down

First we create our virtual environment and install the dependencies that we need:
 - flintrock (We will be using this external library to setup our Hadoop and Spark clusters
 - requests

```
python3 -m venv databass
source databass/bin/activate
pip3 install flintrock
pip3 install requests
```

## Setup Flask MySql Mongo
All scripts in the `start-all-scripts` folder need to be in the same folder and ran within the folder itself.

Make sure you cd into the `start-all-scripts` folder, then run the following command.
```
cd start-all-scripts
python3 databass.py start
```
When prompted for `key-name`, enter your ec2-ssh key-name **without .pem** or any file extension.
* Note that it is possible the setup fails.\
 In our testing it has failed in about 1 in 20 times due to instance failed,network error, some packages temporarily down, etc. In that case [destroy](#destroy-scripts) and start again.\
 We have done our best to make sure this happens as little as possible by checking exit codes of every install command and rerunning it if it fails.\
The scripts should take less than 10 minutes to setup fully.

SAMPLE OUTPUT
```
enter key_name:gary-ong
creating cloud formation stack
stack created
['i-09f7907c885d39c47', 'i-05c16febec95fc809', 'i-09d8b481b6976dbc9']
waiting for instances to be ready
Instance ready
waiting for databases to load data
Waiting for db to load
Waiting for db to load
Waiting for db to load
Waiting for db to load
front end page
ec2-18-140-67-192.ap-southeast-1.compute.amazonaws.com:3000
sql dns:
ec2-18-138-254-8.ap-southeast-1.compute.amazonaws.com
mongo dns:
ec2-13-229-251-145.ap-southeast-1.compute.amazonaws.com
logs dns:
ec2-18-140-67-192.ap-southeast-1.compute.amazonaws.com:5000/logs
```
The `Mongo DNS` and `MySQL DNS` are needed in the ETL section to retrieve from our database to the HDFS.\
You can type `python3 databass.py describe` to see the DNS again if you wish.
## Setup Hadoop File System and Apache Spark

First and foremost, we must export the path to our key as an environment variable. (E.g. export databass_path=/Users/Joseph/.ssh/test_instance.pem)
```
export databass_path=<path to key>
```

In the `hadoopsetupfinal` folder, which is located inside the `scripts` folder. Run `flint_test.sh` to configure your HDFS and Spark setup.
```
sh ./scripts/hadoopsetupfinal/flint_test.sh 
```

Upon running of the script file, it will ask for 3 inputs:
  - Number of instances: (This specifies the number of slave nodes that you require. If you type in 2 here, a total of 3 instances will be created; 1 for master and 2 for slaves)
  - Instance type: (we typically choose t2.medium, but you can specify any instance that you want. Preferably t2.medium or better. At least 4gb memory is good.)
  - Key name: (just enter your key name without any file extension. E.g. if my key name is database_key.pem, I will enter database_key)
Below is an example of the inputs:
```
Enter number of slaves: 4
Enter instance type: t2.medium
Enter key name: test_instance
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
flintrock login --ec2-region ap-southeast-1 --ec2-identity-file $databass_path --ec2-user ec2-user databass_cluster
```

# Extract, Transform and Load
Here, we will perform ETL from our SQL and Mongo databases to the HDFS. 
  - In the same `hadoopsetupfinal` folder, run the `hdfs_numpy.sh` file using the following syntax (you have to manually type in the respective DNS):
  - This file installs the packages numpy, pyspark, and flask. It also downloads the corresponding pearson.py and spark_tfidf.py from our github repository so that we can proceed to Task 2.
  - After the script has finished execution, etl_sql_reviews.csv should have been located inside "HDFS /checkpoint3/etl_sql_reviews.csv"

Example:
```
sh hdfs_numpy.sh <mongo_dns> <sql_dns> 
```

## Setup Explanation
We use [fLintrocK](https://github.com/nchammas/flintrock) to setup our apache and hadoop backend.\
It then uses [AWS Cloudformation](https://aws.amazon.com/cloudformation/) which is a declarative language for setting up AWS resources. You can take a look at `database.json` to see how the resources are created.

The only two AMIs that we use are `ami-061eb2b23f9f8839c` which is a blank Ubuntu image and `ami-07539a31f72d244e7` which is a blank Amazon Linux 2.

We chose to run Flask,MySql and MongoDB in `t3.small`. `t3.small` has a higher bandwidth than `t2.medium` at **half the price** and the main bottleneck is the internet speed for downloading data and dependencies. Please **DO NOT** change the instance type as occasionally we would get http 503 service unavailable on some dependencies when running on instances with a lower bandwidth. Also **DO NOT** restart any of the instances as all IPs are binded at start and restarting will reset the IPs.


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

* **Logs**\
You can view the logs in logs dns. Refresh the page to see the most recent logs. Note that visiting the log page itself is also being logged.

## Checkpoint 3
### ETL
  - Our ETL script downloads uses pymongo and the python mysql connector to download the Reviews table from SQL and the metadata in mongoDB.
  - After getting the csv and json files, these were put into the hadoop file system using CLI commands.
### Pearson Correlation
  - Execute `task2a.sh`. This file is located under `/scripts/hadoopsetupfinal`
```
sh ./scripts/hadoopsetupfinal/task2a.sh
```
  - This process should take roughly ~1min
  - The correlation score will be displayed to you when the script has finished executing
  - How it was done
      - the Kindle reviews and price data was obtained from hadoop filesystem
      - Length of review was calculated using f.split and then f.size on the column review text
      - Using a groupby function on asin, we can get the average review length of the review text.
      - Using asin, we performed a join to combine the two tables and dropped all columns other than price and average review length.
      - We passed this Dataframe into an RDD and performed a flatmap to get the x,y,x^2,y^2 and xy ( x refers to the average review length and y refers to price )
      - Using reduceByKey, we get the summation of the above results.
      - The formula for pearson correlation is as follows :

      ![alt text](https://github.com/migsquizon/50.0043-Full-Stack/blob/automation/pearson.JPG)

### TF-iDF
  - Execute `task2b.sh`. This file is located under `/scripts/hadoopsetupfinal`
```
sh ./scripts/hadoopsetupfinal/task2b.sh
```
  - This process should take roughly ~15min
  - The TFIDF scores will then be calculated using etl_sql_reviews.csv on the HDFS.
  - We used pyspark ML library to compute te TFIDF score. CountVectorizer was used to tokenize the words and their respective word count, and IDF to calculate inverse document frequency.
  - After the scores were calculated, we used RDD and map function to convert all the word indices back to the actual words itself.
  - The output csv is returned in the following format: "reviewerID", "asin","unixReviewTime", "word1:tfidf_score1 word2:tfidf_score2 ... wordN:tfidf_scoreN"
  - The output file is saved on the HDFS, and a copy of the csv is also stored on the local file system of the master node.
  - The head of the csv file will be displayed to you when the script has finished executing

Sample Output:
```
A1UG4Q4D3OAH3A,B000FA64PA,1381449600,"a:0.26024822983, of:0.436887874635, is:0.560014716532, :1.0016420482, that:0.762247037686, story:1.12772258808, great:1.59994230354, reading:1.86328920655, story.:2.25741534146, many:2.45506817076, now:2.73222314772, worth:3.17808231997, times:3.40894791738, under:4.21856393662, working:4.22849767813, over.:5.09169904731, darkness:5.97214539573, committing:7.79925284731, sabotage:8.19607058837, cloak:9.17321659597, darth:10.4308935793, maul:11.2332400518"
```

If you want to inspect the ouput csv file, ssh in with:
```
flintrock login --ec2-region ap-southeast-1 --ec2-identity-file $databass_path --ec2-user ec2-user databass_cluster
```
and you can locate the file called `tfidf_local.csv`.

## Destroy scripts
After you are done you can run the destroy script which destroys all resources that we created including security groups and ec2 instances.
```
python3 databass.py destroy
flintrock destroy --ec2-region ap-southeast-1 databass_cluster
```
Also remember to deactive your virtual environment and delete it.
```
deactivate
rm -R databass
```
