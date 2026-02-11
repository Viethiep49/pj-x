import os
import sys
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Database Configuration
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")  # Default empty password
DB_NAME = os.getenv("DB_NAME", "pet_grooming")

def create_database():
    """Create the database if it doesn't exist."""
    print(f"Connecting to PostgreSQL server at {DB_HOST}:{DB_PORT} as user '{DB_USER}'...")
    try:
        # Connect to default 'postgres' database to create new database
        conn = psycopg2.connect(
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT,
            database="postgres"
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = conn.cursor()
        
        # Check if database exists
        cur.execute(f"SELECT 1 FROM pg_catalog.pg_database WHERE datname = '{DB_NAME}'")
        exists = cur.fetchone()
        
        if not exists:
            print(f"Creating database '{DB_NAME}'...")
            cur.execute(f"CREATE DATABASE {DB_NAME}")
            print(f"Database '{DB_NAME}' created successfully.")
        else:
            print(f"Database '{DB_NAME}' already exists.")
            
        cur.close()
        conn.close()
        return True
    except Exception as e:
        print(f"Error creating database: {e}")
        print("Please ensure PostgreSQL is running and credentials are correct.")
        print("You can set DB_USER and DB_PASSWORD environment variables.")
        return False

def init_schema():
    """Initialize the schema and seed data in the target database."""
    print(f"Initializing schema and seed data in database '{DB_NAME}'...")
    try:
        conn = psycopg2.connect(
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT,
            database=DB_NAME
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = conn.cursor()
        
        # Read schema.sql
        schema_path = os.path.join(os.path.dirname(__file__), 'schema.sql')
        if os.path.exists(schema_path):
            print("Executing schema.sql...")
            with open(schema_path, 'r', encoding='utf-8') as f:
                schema_sql = f.read()
            cur.execute(schema_sql)
            print("Schema initialized successfully.")
        else:
            print("Warning: schema.sql not found.")

        # Read seed.sql
        seed_path = os.path.join(os.path.dirname(__file__), 'seed.sql')
        if os.path.exists(seed_path):
            print("Executing seed.sql...")
            with open(seed_path, 'r', encoding='utf-8') as f:
                seed_sql = f.read()
            cur.execute(seed_sql)
            print("Seed data initialized successfully.")
        else:
            print("Warning: seed.sql not found.")
        
        cur.close()
        conn.close()
        return True
    except Exception as e:
        print(f"Error initializing database: {e}")
        return False

if __name__ == "__main__":
    print("Database Setup Script")
    print("---------------------")
    
    if create_database():
        if init_schema():
            print("\nDatabase initialization complete!")
        else:
            print("\nSchema initialization failed.")
            sys.exit(1)
    else:
        print("\nDatabase creation failed.")
        sys.exit(1)
