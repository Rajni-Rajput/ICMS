import pyspark
from pyspark import SparkContext, SQLContext
from pyspark.sql.functions import lit, to_timestamp
from datetime import datetime


# Set up Spark configuration
conf = pyspark.SparkConf().set("spark.jars.packages",
                               "org.mongodb.spark:mongo-spark-connector_2.12:3.0.1") \
                           .setMaster("local") \
                           .setAppName("MyApp") \
                           .setAll([("spark.driver.memory", "40g"), ("spark.executor.memory", "50g")])

# Entry point to PySpark
sc = SparkContext(conf=conf)
sqlC = SQLContext(sc)

# MongoDB connection details
mongo_username = "demo1"
mongo_password = "demo1"
mongo_cluster = "cluster0.0vgxldr.mongodb.net"
mongo_database = "test"
mongo_collection = "policies"  # Update to your policy collection name

# Construct MongoDB URI
mongo_ip = f"mongodb+srv://{mongo_username}:{mongo_password}@{mongo_cluster}/{mongo_database}.{mongo_collection}?retryWrites=true&w=majority"

# Load policy data from MongoDB
policy_df = sqlC.read.format("com.mongodb.spark.sql.DefaultSource").option("uri", mongo_ip).load()

# Create a temporary view for policies
policy_df.createOrReplaceTempView("policies")

# Define the user email for whom to fetch policies
user_email = "rajni@gmail.com"

# Query to select policies for the specified user email
user_policies_df = sqlC.sql(f"SELECT * FROM policies WHERE email = '{user_email}'")
# print(user_policies_df)
user_policies_df.show()

# Check if there are any policies for the user
if user_policies_df.count() > 0:
    # Get the current timestamp
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(current_time)

    # Convert current_time to timestamp type
    current_time_timestamp = to_timestamp(lit(current_time))

    # Update the updatedAt column with the current timestamp
    updated_policies_df = user_policies_df.withColumn("updatedAt", current_time_timestamp)
    print(updated_policies_df)

    # Write the updated policies back to the MongoDB collection
    updated_policies_df.write.format("com.mongodb.spark.sql.DefaultSource") \
        .option("uri", mongo_ip) \
        .mode("append") \
        .save()
    print("Policy updated successfully.")
else:
    print("No policies found for the specified user.")


# Stop SparkContext
sc.stop()
