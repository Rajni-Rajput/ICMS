import pyspark
from pyspark import SparkContext, SQLContext


# Set up Spark configuration
conf = pyspark.SparkConf().set("spark.jars.packages",
                               "org.mongodb.spark:mongo-spark-connector_2.12:3.0.1") \
                           .setMaster("local") \
                           .setAppName("MyApp") \
                           .setAll([("spark.driver.memory", "40g"), ("spark.executor.memory", "50g")])

# Entry point to PySpark
sc = SparkContext(conf=conf)
sqlC = SQLContext(sc)

mongo_username = "demo1"
mongo_password = "demo1"
mongo_cluster = "cluster0.0vgxldr.mongodb.net"
mongo_database = "test"
mongo_collection = "users"  

mongo_ip = f"mongodb+srv://{mongo_username}:{mongo_password}@{mongo_cluster}/{mongo_database}.{mongo_collection}?retryWrites=true&w=majority"

print(mongo_ip)

# Load data from MongoDB 
users = sqlC.read.format("com.mongodb.spark.sql.DefaultSource").option("uri", mongo_ip).load()

# Create a temporary view
users.createOrReplaceTempView("users")

# Define the provided timestamp
provided_timestamp = "2024-02-21 12:00:00"

# Query to select users whose createdAt timestamp is more recent than the provided timestamp
filtered_users = sqlC.sql(f"SELECT * FROM users WHERE createdAt > '{provided_timestamp}'")

# Display the user details
filtered_users.show()





















# import pymongo
# from pymongo import MongoClient

# cluster = MongoClient("mongodb+srv://demo1:demo1@cluster0.0vgxldr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

# db = cluster["test1"]

# collection = db["student"]

# #post = {"_id": 0 , "name"  : "Rajni"}

# #collection.insert_one(post)

# #collection.insert_many([{"name":"Ridhi"},{"name":"Somi"},{"name":"Archi"}])

# results = collection.find()

# for result in results:
#     print(result)

