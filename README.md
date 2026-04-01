# Full-Stack Library Management System (MERN)

A complete full-stack Library Management System built using MongoDB, Express.js, React.js (Vite), and Node.js. It features role-based access control with separate features for Admins and standard Users.

## Features
- **Authentication:** JWT based secure login.
- **Roles:**
  - `admin`: Access to Maintenance, Reports, and Transactions.
  - `user`: Access only to Reports and Transactions.
- **Maintenance Module:** Manage Users, Memberships, and Media (Books/Movies).
- **Reports Module:** View active issues, pending returns, and system health.
- **Transactions Module:** Issue media, calculate fines upon return, and record fine payments.

## Project Structure
- `/backend`: Node.js Express server with Mongoose schemas and API controllers.
- `/frontend`: React application built with Vite and React Router Dom.

## Prerequisites
- Node.js (v16+)
- MongoDB (Running locally on default port 27017 or update `MONGO_URI` in `.env`)

## Setup Instructions

### 1. Database & Initial User Setup 
Ensure MongoDB is running locally. To seed the initial **Admin** user:
```bash
cd backend
npm install
node seed.js
```
*This will create an Admin user with username: `admin` and password: `admin123`.*

### 2. Run Backend
```bash
cd backend
npm run start
# Or using nodemon:
npm run dev
```
(Server will run on http://localhost:5000)

### 3. Run Frontend
```bash
cd frontend
npm install
npm run dev
```
(App will run on http://localhost:5173 - check your terminal for the exact Vite port)

## Login Credentials
- **Username:** `admin`
- **Password:** `admin123`

Enjoy using the Library Management System!
