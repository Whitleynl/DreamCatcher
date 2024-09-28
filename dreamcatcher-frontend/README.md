# Dreamcatcher

Dreamcatcher is a web application that allows users to log, search, and manage their dreams. The app is built with a Django backend and a React frontend.

## Features
- Log dreams with details such as title, description, mood, and lucidity level.
- Search dreams by title or description.
- View a list of all logged dreams.

## Technologies
- **Backend**: Django (with Django REST Framework)
- **Frontend**: React, Axios, TailwindCSS

## Prerequisites

Ensure you have the following installed on your machine:
- **Python 3.8+**
- **Node.js** (v14 or newer)
- **npm** or **yarn**

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/whitleynl/dreamcatcher.git
cd dreamcatcher
```

### 2. Backend Setup (Django)

#### a) Create a Virtual Environment

```bash
python3 -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
```

#### b) Install Backend Dependencies

```bash
pip install -r requirements.txt
```

#### c) Apply Database Migrations

```bash
python manage.py migrate
```

#### d) Run the Backend Server

```bash
python manage.py runserver
```

The Django backend will now be running at `http://localhost:8000`.

### 3. Frontend Setup (React)

#### a) Navigate to the Frontend Directory and Install Dependencies

```bash
cd dreamcatcher-frontend
npm install
```

#### b) Run the Frontend Development Server

```bash
npm start
```

The React frontend will be running at `http://localhost:3000`.

### 4. Access the Application

Once both the backend and frontend servers are running:
- Open `http://localhost:3000` to access the app.
- The frontend communicates with the Django API at `http://localhost:8000`.

## Notes

- Ensure both backend and frontend servers are running for full functionality.
- If you encounter any issues, check the browser console and backend logs for error messages.

## License

This project is licensed under the MIT License (whatever that means).
