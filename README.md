# InternIntelligence_Naath_Bank

## Overview

This project is a secure and efficient banking system designed to manage various banking operations, including account management, transaction processing, user authentication, and settings management. The backend is built using **Django**, while the frontend is developed using **React** with **Vite** as the build tool. The system ensures robust security features such as encryption, fraud detection, input validation, and rate limiting.

### Table of Contents

- [InternIntelligence\_Naath\_Bank](#internintelligence_naath_bank)
  - [Overview](#overview)
    - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Architecture](#architecture)
    - [Tech Stack](#tech-stack)
  - [Installation](#installation)
    - [Backend (Django)](#backend-django)
  - [Create a .env file in the root directory of the backend](#create-a-env-file-in-the-root-directory-of-the-backend)
- [API Documentation](#api-documentation)
  - [Accounts API](#accounts-api)
    - [**Create Account**](#create-account)
  - [Authentication API](#authentication-api)
    - [**Login**](#login)
    - [**Logout**](#logout)
  - [Settings API](#settings-api)
    - [**Update User Settings**](#update-user-settings)
  - [Security Measures](#security-measures)
  - [Contributing](#contributing)
    - [**Fork the Repository**](#fork-the-repository)
    - [**Clone the Forked Repository**](#clone-the-forked-repository)
    - [**Create a New Branch**](#create-a-new-branch)
    - [**Make Changes and Commit**](#make-changes-and-commit)
    - [**Push to Your Fork**](#push-to-your-fork)
    - [**Create a Pull Request**](#create-a-pull-request)
  - [License](#license)
  - [Contact](#contact)

---

## Features

- **Account Management**: CRUD operations for managing account details and balance updates.
- **Transaction Processing**: Handling fund transfers, bill payments, and maintaining transaction history.
- **User Authentication**: Secure login, logout, and session management.
- **Settings Management**: Managing user preferences and security settings.
- **Security Features**:
  - Encryption for sensitive data.
  - Fraud detection mechanisms.
  - Input validation and sanitization.
  - Rate limiting to protect against abuse.

---

## Architecture

The project follows a **Client-Server Architecture**:

- **Backend (Django)**: Handles all business logic, database operations, and API endpoints.
- **Frontend (React/Vite)**: Provides a user-friendly interface for interacting with the backend APIs.
- **Database**: Uses SQLite for storing account, transaction, and user data securely.

### Tech Stack

- **Backend**: Django, Python
- **Frontend**: React, Vite, JavaScript
- **Database**: SQLite
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: HTTPS, Input Validation, Rate Limiting

---

## Installation

### Backend (Django)

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/WuorBhang/InternIntelligence_Naath_Bank.git
   cd InternIntelligence_Naath_Bank/backend

2. **Set Up Virtual Environment**:

```bash
1. python -m venv venv
2. source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install Dependencies**:

```bash
pip install -r requirements.txt
```

4. **Set Up Database**:

## Create a .env file in the root directory of the backend

env

```bash
1. DATABASE_URL=sqlite:///db.sqlite3
2. SECRET_KEY=your_secret_key
3. DEBUG=True
4. ALLOWED_HOSTS=localhost,127.0.0.1
```

5. **Apply migrations**:

```bash
python manage.py migrate
```

6. **Run the Server**:

```bash
python manage.py runserver
```

B. ## Frontend (React/Vite)

1 .**Navigate to the Frontend Directory**:

```bash
cd frontend
```

2. **Install Dependencies**:

```bash
npm install
```

3. **Start the Development Server**:

```bash
npm run dev
```

4. **Build the Production Bundle**:

```bash
npm run build
```

# API Documentation

This document outlines the available RESTful API endpoints for the system.

## Accounts API

### **Create Account**

**Endpoint**  
`POST /api/accounts/`

**Description**  
This endpoint creates a new account with a specified account number, balance, and currency.

**Request Body**  
The request should include the following fields in JSON format:

```json
{
  "account_number": "string",   
  "balance": 0,                 
  "currency": "USD"    
}
```

**Response**  
A successful response will return the details of the newly created account.

**Example Response**:

```json
{
  "id": 1,                    
  "account_number": "string",  
  "balance": 0,                 
  "currency": "USD"  
}
```

**Status Codes**:

- **201 Created**: Account successfully created.
- **400 Bad Request**: Missing or invalid data in the request body.

---

## Authentication API

### **Login**

**Endpoint**  
`POST /api/auth/login/`

**Request Body**:

```json
{
  "username": "string",
  "password": "string"
}
```

---

### **Logout**

**Endpoint**  
`POST /api/auth/logout/`

---

## Settings API

### **Update User Settings**

**Endpoint**  
`PUT /api/settings/`

**Request Body**:

```json
{
  "notification_preferences": ["email", "sms"],
  "security_questions": [
    { "question": "What is your favorite color?", "answer": "blue" }
  ]
}
```

---

## Security Measures

- **Authentication**: Uses JSON Web Tokens (JWT) for secure user authentication.
- **Sessions**: Sessions are managed securely with Django's built-in mechanisms.
- **Input Validation**: All inputs are validated and sanitized to prevent injection attacks.
- **Rate Limiting**: Implements rate limiting to protect against brute-force attacks and abuse.
- **Encryption**: Sensitive data (e.g., passwords, transactions) are encrypted at rest and in transit.
- **HTTPS**: All communication between the frontend and backend is secured using HTTPS.

---

## Contributing

### **Fork the Repository**

Fork this repository to your GitHub account.

### **Clone the Forked Repository**

```bash
git clone https://github.com/your-username/InternIntelligence_Naath_Bank.git
```

### **Create a New Branch**

```bash
git checkout -b feature/new-feature
```

### **Make Changes and Commit**

```bash
git add .
git commit -m "Add new feature"
```

### **Push to Your Fork**

```bash
git push origin feature/new-feature
```

### **Create a Pull Request**

Open a Pull Request on the main repository, describing your changes.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact

For any questions or feedback, please contact:

- **Email**: <uhuribhang211@gmail.com>
- **GitHub**: [@WuorBhang](https://github.com/WuorBhang)
- **LinkedIn**: [Wuor Bhang](https://www.linkedin.com/in/wuorbhang/)
