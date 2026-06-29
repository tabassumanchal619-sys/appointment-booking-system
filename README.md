# Appointment Booking System Backend

## Overview

The Appointment Booking System Backend is a RESTful API developed using **Node.js**, **Express.js**, **MySQL**, and **Sequelize ORM**. It provides a complete backend solution for managing appointment bookings.

The system allows users to register, log in securely using JWT authentication, browse available services, book appointments, view appointment history, and download appointment slips as PDF files. Administrators can manage categories, services, appointments, and monitor system activity through dashboard APIs.

The project follows a clean layered architecture where routes, controllers, services, models, middleware, and utility modules are separated to keep the code organized, maintainable, and easy to extend.

---

# Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Refresh Token Authentication
* Protected Routes
* Role-Based Authorization (Admin & User)

### Category Management

* Create Category
* Update Category
* Delete Category
* View Categories

### Service Management

* Create Service
* Update Service
* Delete Service
* View Services
* Search Services
* Filter Services

### Appointment Management

* Book Appointment
* View Appointment History
* Prevent Duplicate Time Slots
* Prevent Past Date Booking
* Approve Appointment
* Reject Appointment
* Complete Appointment
* Cancel Appointment

### Dashboard

* Total Users
* Total Categories
* Total Services
* Total Appointments
* Pending Appointments
* Approved Appointments
* Cancelled Appointments
* Completed Appointments

### Additional Features

* Appointment PDF Generation
* Automatic Email Reminder
* Database Migrations
* Database Seeders

---

# Technologies Used

* Node.js
* Express.js
* MySQL
* Sequelize ORM
* JWT Authentication
* bcryptjs
* Nodemailer
* node-cron
* PDFKit
* dotenv

---

# Project Structure

```text
appointment-booking-backend
│
├── src
│   ├── config
│   ├── controllers
│   ├── jobs
│   ├── middlewares
│   ├── migrations
│   ├── models
│   ├── pdf
│   ├── routes
│   ├── seeders
│   ├── services
│   └── utils
│
├── postman
├── node_modules
│
├── .env
├── .gitignore
├── app.js
├── db.js
├── package.json
├── package-lock.json
├── server.js
└── test-db.js
```

## Folder Description

| Folder          | Description                                                 |
| --------------- | ----------------------------------------------------------- |
| **config**      | Stores database configuration and application settings.     |
| **controllers** | Handles incoming requests and returns responses.            |
| **jobs**        | Contains scheduled background jobs such as email reminders. |
| **middlewares** | Authentication and authorization middleware.                |
| **migrations**  | Sequelize migration files for database schema.              |
| **models**      | Sequelize models and database relationships.                |
| **pdf**         | Generates appointment PDF slips.                            |
| **routes**      | Defines all API endpoints.                                  |
| **seeders**     | Inserts initial data into the database.                     |
| **services**    | Contains the business logic of the application.             |
| **utils**       | Helper functions used throughout the project.               |

---

# Architecture

The project follows a layered architecture.

```text
Client
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Models (Sequelize ORM)
   │
   ▼
MySQL Database
```

### Request Flow

1. The client sends an HTTP request.
2. The request is received by the appropriate route.
3. The route forwards the request to a controller.
4. The controller validates the request and calls the required service.
5. The service executes the business logic.
6. The model interacts with the MySQL database.
7. The response is returned to the client.

---

# Authentication

The application uses **JWT (JSON Web Token)** for authentication.

After a successful login, the system generates:

* Access Token
* Refresh Token

Protected routes require the following header:

```http
Authorization: Bearer <access_token>
```

The system supports two user roles:

* User
* Admin

Administrative APIs can only be accessed by authenticated administrators.

---

# Database Models

## User

Stores user account information.

| Field    |
| -------- |
| id       |
| name     |
| email    |
| password |
| role     |

---

## Category

Stores service categories.

| Field       |
| ----------- |
| id          |
| name        |
| description |

---

## Service

Stores appointment services.

| Field       |
| ----------- |
| id          |
| category_id |
| name        |
| description |
| price       |
| duration    |

---

## Appointment

Stores appointment details.

| Field      |
| ---------- |
| id         |
| user_id    |
| service_id |
| date       |
| time       |
| status     |

Appointment Status:

* Pending
* Approved
* Rejected
* Cancelled
* Completed

---

# Installation

Clone the repository.

```bash
git clone <repository-url>
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=appointment_db
DB_USER=root
DB_PASSWORD=your_password

JWT_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Run database migrations.

```bash
npx sequelize-cli db:migrate
```

Run seeders (optional).

```bash
npx sequelize-cli db:seed:all
```

Start the development server.

```bash
npm run dev
```

Or start the application.

```bash
npm start
```

---

# API Testing

The APIs can be tested using:

* Postman
* Thunder Client
* Insomnia

For protected routes, include the JWT access token in the Authorization header.

```http
Authorization: Bearer <access_token>
```

---

# Error Handling

The API returns standard HTTP status codes.

| Status Code | Description           |
| ----------- | --------------------- |
| 200         | OK                    |
| 201         | Created               |
| 400         | Bad Request           |
| 401         | Unauthorized          |
| 403         | Forbidden             |
| 404         | Not Found             |
| 500         | Internal Server Error |

---

# Future Improvements

* Online Payment Integration
* SMS Notifications
* Appointment Rescheduling
* Calendar Integration
* Docker Support
* Swagger API Documentation
* Unit Testing
* Integration Testing

---

# License

This project is created for educational and learning purposes.

---

# Author

**Asfia Anchal**

Backend Developer | Node.js | Express.js | MySQL | Sequelize ORM
