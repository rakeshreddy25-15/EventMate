# EventMate Backend - Spring Boot with JWT & MySQL

AI Based Event Planning & Scheduling System - Backend API

## Features

✅ **Spring Boot 3.1.5** - Latest Spring Boot framework
✅ **MySQL Database** - Persistent data storage
✅ **JWT Authentication** - Secure token-based authentication
✅ **Spring Security** - Comprehensive security features
✅ **CORS Support** - Frontend integration ready
✅ **RESTful API** - Clean and consistent API design

## Installation & Setup

### 1. Create MySQL Database
```sql
CREATE DATABASE eventmate_db;
```

### 2. Update Configuration
Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.password=your_mysql_password
jwt.secret=your_secret_key
```

### 3. Build and Run
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs on: `http://localhost:8080/api`

## API Endpoints

- **POST** `/api/auth/register` - Register user
- **POST** `/api/auth/login` - Login user
- **GET** `/api/auth/profile` - Get user profile (protected)
- **POST** `/api/auth/logout` - Logout user

## User Roles
- **User** - Regular user
- **Admin** - Administrator
- **Organiser** - Event organiser
