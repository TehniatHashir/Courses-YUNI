import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'default_secret_key')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', '').replace('postgresql://', 'postgresql+psycopg://')
    if not SQLALCHEMY_DATABASE_URI:
        # Fallback if env is missing, though load_dotenv() is called
        SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg://postgres:1122@localhost:5432/yuni'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'jwt_default_secret')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    
    CORS_ORIGIN = os.environ.get('CORS_ORIGIN', 'http://localhost:3000')
