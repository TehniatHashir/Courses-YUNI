import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, inspect, text

load_dotenv()

db_url = os.environ.get('DATABASE_URL', '').replace('postgresql://', 'postgresql+psycopg://')
if not db_url:
    db_url = 'postgresql+psycopg://postgres:1122@localhost:5432/yuni'

print(f"Connecting to: {db_url.split('@')[1]}") # Hide credentials
engine = create_engine(db_url)

with engine.connect() as conn:
    # 1. Current Database
    res = conn.execute(text("SELECT current_database()")).fetchone()
    print(f"Current Database: {res[0]}")

    # 2. Public Tables
    res = conn.execute(text("SELECT tablename FROM pg_tables WHERE schemaname='public'")).fetchall()
    print("Tables in 'public' schema:")
    for row in res:
        print(f" - {row[0]}")

    # 3. Check 'users' table specifically
    inspector = inspect(engine)
    if 'users' in inspector.get_table_names():
        columns = inspector.get_columns('users')
        print("\nColumns in 'users' table:")
        for col in columns:
            print(f" - {col['name']} ({col['type']})")
        
        # 4. Row count
        cnt = conn.execute(text("SELECT COUNT(*) FROM users")).fetchone()
        print(f"\nTotal users: {cnt[0]}")
    else:
        print("\n'users' table NOT FOUND!")
