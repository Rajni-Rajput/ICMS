from pyspark.sql import SparkSession
from pyspark.sql.functions import col
from datetime import datetime

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
user_policies_df = spark.read.format("csv") \
    .options(**mongo_options) \
    .load()

# Filter for policies created or updated after the last processed timestamp
updated_policies_df = user_policies_df.filter(col("createdAt") >= last_processed_timestamp)

# Show the updated policies
updated_policies_df.show()

# Update the last processed timestamp to the current time
last_processed_timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
print("Last Processed Timestamp:", last_processed_timestamp)

# Write the updated policies DataFrame to Parquet format
updated_policies_df.write.parquet("updated_policies.parquet")




# Stop SparkSession
spark.stop()
