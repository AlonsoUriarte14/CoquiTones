import psycopg2
from fastapi import HTTPException
import json

config_file_path = "src/testdbconfig.json"


# Connect to the PostgreSQL database
def connect_to_database():
    with open(config_file_path, "r") as f:
        db_config = json.loads(f.read())

        try:
            connection = psycopg2.connect(**db_config)
            return connection
        except psycopg2.Error as e:
            print("Error connecting to database:", e)
            return None


# Injectable dependency
def get_db_connection():
    connection = connect_to_database()
    if connection is None:
        raise HTTPException(status_code=500, detail="Database connection error")
    try:
        yield connection
    finally:
        connection.close()
