from pyspark.sql import SparkSession

# Initialize SparkSession
spark = SparkSession.builder \
    .appName("SQL_Exclude_Id_and_Convert_to_CSV") \
    .getOrCreate()

# Read the Parquet file into a DataFrame
parquet_df = spark.read.parquet("updated_policies.parquet")

# Create a temporary view from the DataFrame
parquet_df.createOrReplaceTempView("policies_view")

# Execute SQL to select all columns except _id
sql_query = "SELECT * FROM policies_view"
# Exclude _id from the selected columns
excluded_columns = ["_id"]

# Generate the SELECT statement excluding _id
selected_columns = ", ".join([f"`{col}`" for col in parquet_df.columns if col not in excluded_columns])

# Concatenate the SELECT statement and the table name
sql_query = f"SELECT {selected_columns} FROM policies_view"

# Execute the SQL query
result_df = spark.sql(sql_query)

# Save the resulting DataFrame to a CSV file
result_df.write.csv("updated_policies_ParquetTo.csv", header=True)

# Stop SparkSession
spark.stop()
