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

So make sure you cd into the `start-all-scripts` folder, then run the following command.
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
The `Mongo DNS` and `MySQL DNS` are needed in the ETL section to retrieve from our database to the HDFS.

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

* **Logs**
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
      - The formula for pearson is as follows :
         ![alt text](data:image/png;base64,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)
         (xy*count -(x*y))/(sqrt(count*x^2-(x*x))*(sqrt(count*y^2-(y*y)))

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
A2HSAKHC3IBRE6,B000F83SZQ,"the:0.151670965635, and:0.223112519025, i:0.288685120363, this:0.310181937816, in:0.60653914134, it:1.15346511519, was:0.708464869905, as:1.26347197711, not:2.28988905287, one:1.36014837207, an:1.45460924747, very:1.55425680957, characters:1.75027869815, well:3.91201486684, it's:2.20340235369, enjoyed:2.06945526766, i'm:2.43289833117, written:2.66645522981, sure:2.9690590998, why:3.11098704785, she's:3.54792981484, mystery:3.77718959317, much.:4.41171730945, called:4.57631987134, amy:6.33597853936, tho:6.99802341083, clean,:6.98584838495, drawn.:8.08776646176, brewster:10.7536710414"
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
