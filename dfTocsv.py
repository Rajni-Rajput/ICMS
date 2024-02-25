from pyspark.sql import SparkSession
from pyspark.sql.functions import col
from datetime import datetime
import pandas as pd

# Initialize SparkSession
spark = SparkSession.builder \
    .appName("DataProcessingRoutine") \
    .config("spark.jars.packages", "org.mongodb.spark:mongo-spark-connector_2.12:3.0.1") \
    .getOrCreate()

# Set up MongoDB connection details
mongo_ip = "mongodb+srv://demo1:demo1@cluster0.0vgxldr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongo_database = "test"
mongo_collection = "policies"

# Set up MongoDB options
mongo_options = {
    "uri": mongo_ip,
    "database": mongo_database,
    "collection": mongo_collection,
    "readPreference.name": "secondaryPreferred"
}

# Set up the last processed timestamp (You can persist this timestamp)
last_processed_timestamp = "2024-02-23 14:00:00"

# Query the database table to retrieve new or updated entries
user_policies_df = spark.read.format("com.mongodb.spark.sql.DefaultSource") \
    .options(**mongo_options) \
    .load()

# Filter for policies created or updated after the last processed timestamp
updated_policies_df = user_policies_df.filter(col("createdAt") >= last_processed_timestamp)

# Show the updated policies
updated_policies_df.show()

# Update the last processed timestamp to the current time
last_processed_timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
print("Last Processed Timestamp:", last_processed_timestamp)

# Convert the DataFrame to a Pandas DataFrame
pandas_df = updated_policies_df.toPandas()

# Write the Pandas DataFrame to a CSV file
pandas_df.to_csv("updated_policies.csv", index=False)



# Stop SparkSession
spark.stop