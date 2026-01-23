# YUNI Learning Platform Backend

Production-ready Flask backend for the YUNI Learning Platform.

## Tech Stack
- **Framework**: Flask
- **Database**: PostgreSQL
- **ORM**: Flask-SQLAlchemy
- **Migrations**: Flask-Migrate
- **Auth**: Flask-JWT-Extended
- **CORS**: Flask-CORS

## Setup Instructions

### 1. Database Setup
Ensure PostgreSQL is running and create the database:
```sql
CREATE DATABASE yuni;
```

### 2. Environment Variables
Copy `.env.example` to `.env` and update the values:
```bash
cp .env.example .env
```

### 3. Installation
Create a virtual environment and install dependencies:
```powershell
Remove-Item -Recurse -Force venv -ErrorAction SilentlyContinue
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
```

**Note for Python 3.13**: We use `psycopg[binary]` (Psycopg v3) for compatibility. The connection string in `app/config.py` automatically handles the `postgresql+psycopg://` prefix.

### 4. Database Migrations
Initialize the database:
```bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

### 5. Running the App
The entry point is `run.py`. Do NOT run `app.py`.
```powershell
python run.py
```

## API Endpoints

### Authentication
- `POST /api/register`: Register a new user.
- `POST /api/login`: Login and receive JWT token.

### Courses & Blogs
- `GET /api/courses`: Fetch all courses.
- `GET /api/blogs`: Fetch all blogs.

### Support
- `POST /api/contact`: Submit contact form message.
- `GET /health`: Health check.

## Testing with Curl

### Register
```bash
curl -X POST http://localhost:5000/api/register \
     -H "Content-Type: application/json" \
     -d '{"fullName": "John Doe", "email": "john@example.com", "phoneNumber": "1234567890", "password": "password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/login \
     -H "Content-Type: application/json" \
     -d '{"email": "john@example.com", "password": "password123"}'
```

## Verify DB via SQL
```sql
SELECT * FROM users WHERE email = 'john@example.com';
```
