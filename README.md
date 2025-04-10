## Overview
This project provides REST APIs for user management, including user registration, role-based authentication, and authorization using JWT. The system ensures restricted access where:
- Users have read-only access.
- Admins have update and delete privileges.

## Description
A RESTful API for managing users with role-based access control, authentication, and filtering options.

- Users can register with a specific role.
- Every time a user registers, a **JWT token is generated** and returned.
- For sensitive actions like **deleting a user** & **updating User**, the app requires the **admin’s token**.
- The backend decodes the token, extracts the `role`, and checks if the user is an `admin` or a normal `user`.
  - ✅ If **admin**: Access is granted.
  - ❌ If **user**: Access is denied.

## Features
- **User Registration**: Register users with first name, last name, email, and phone.
- **Retrieve User**: Fetch user details by ID.
- **Update User**: Modify user details (Admin only).
- **Delete/Disable User**: Remove or disable user accounts (Admin only).
- **Role Management**: Create roles and assign them to users.
- **Authentication & Authorization**: Implement JWT-based authentication and role-based access control.
- **User Listing with Filters**: Fetch all users with filtering options (First Name, Last Name, Email, Phone, Role).

## API Endpoints

### User Management
- `POST /api/users/register` - Register a new user with token 
- `GET /api/users/{id}` - Retrieve user by ID
- `PUT /api/users/{id}` - Update user details (Admin only)
- `DELETE /api/users/{id}` - Delete/Disable user (Admin only)
- `GET /api/users` - List all users
- `GET /api/users/?firstname={firstname}` - Filter users by first name

### Role Management
- `POST /api/roles` - Create a new role
- `POST /api/users/{id}/roles` - Assign a role to a user
- `GET /api/roles/getroles` - Retrieve all roles

## Tech Stack
- **Backend**: Node.js, Express.js
- **Authentication**: JWT (JSON Web Token)
- **Database**: MySQL
- **ORM**: Sequelize

## Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/AtharvDalal/Digialpha-Task
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (.env file):
```
PORT=5000
DB_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

4. Start the server:
```bash
npm start
```

## Usage
1. Register a new user using the `/api/users/register` endpoint.
2. Use the token to access restricted routes.

## Authorization Rules
- **Users**: Can view their own profile.
- **Admins**: Can update, delete users and assign roles.

## Contributing
Feel free to contribute by submitting a pull request or reporting issues.

## License
MIT License
