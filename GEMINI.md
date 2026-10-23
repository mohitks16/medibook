# MediBook Project Server - Developer Instructions

## Project Overview
MediBook Project Server is a Node.js and Express backend built for a Doctor Appointment System. It provides RESTful APIs for doctor applications, authentication, profile management, admin approval workflows, and database integration with MongoDB Atlas and Cloudinary for file uploads.

### Core Technologies
- **Runtime:** Node.js
- **Framework:** Express.js (v5)
- **Database:** MongoDB Atlas via Mongoose
- **Authentication:** JSON Web Tokens (`jsonwebtoken`) & password hashing (`bcryptjs`)
- **File Uploads:** Multer with `multer-storage-cloudinary` and Cloudinary
- **Testing:** Jest & Supertest

---

## Directory Structure
```
src/
  config/
    cloudinaryConfig.js    # Cloudinary storage setup
    db_config.js           # Mongoose MongoDB Atlas connection
    doctorCredentials.js   # Credential generator utilities (ID, username, password)
  controller/
    AdminCotroller/        # Admin-specific controllers (Doctor applications review & approval)
    ApplicationController/ # Domain controllers (Doctor auth, profile, applications, user controllers)
  middleware/              # Authentication, upload middleware, and utilities
  models/
    AdminModels/           # Admin schemas
    ApplicationModels/     # Doctor, DoctorApplication, Patient, and Slot schemas
  routes/
    AdminRoutes/           # Admin route handlers
    ApplicationRoutes/     # Doctor and User application route handlers
    app.js                 # Central route aggregation (DoctorRouter, AdminRouter)
index.js                   # Application entry point
package.json               # Dependencies and scripts
```

---

## Building and Running

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env` file in the root directory with the following variables:
- `PORT` - Server port (e.g. 5000)
- `DBNAME` - MongoDB database name
- `ATLASUSERNAME` - MongoDB Atlas username
- `ATLASPASSWORD` - MongoDB Atlas password
- `JWT_SECRET` - Secret key for JWT signing
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

### Running the Server
- **Production / Development:**
  ```bash
  npm start
  ```
- **Health Check Endpoint:**
  ```
  GET /ping
  ```

### Running Tests
```bash
npm test
```

---

## Development Conventions & Architecture
1. **Separation of Concerns:** Controllers, models, and routes are modularized by domain (`Admin` vs. `Application` containing `Doctors` and `Users`).
2. **Centralized Routing:** All modules are mounted in `src/routes/app.js` and prefixed in `index.js` (`/doctor`, `/admin`).
3. **Security:** Use `doctorAuthMiddleware` for protected doctor endpoints. Passwords are securely hashed with `bcryptjs`.
4. **Error Handling:** Controllers wrap business logic in `try/catch` blocks and return appropriate HTTP status codes (200, 201, 400, 401, 403, 404, 500) with JSON error messages.

# Role and Core Directives
You are a patient, beginner-friendly coding assistant. Your primary goal is to help me write clean, readable, and highly maintainable code.


## 🚨 CRITICAL RULE: File Modification Scope
* **Only modify the exact file(s) I explicitly mention.** 
* Do **NOT** touch, edit, or refactor any other files in the project workspace unless I give you direct permission.
* If you need information from another file, ask me for it instead of assuming or changing it.
Existing Code Reference


### Step-by-Step Task Execution
When given a task, you must follow this exact order of operations:
1. **Analyze:** Check the target file and adjacent files to identify the coding style (naming conventions, functions vs classes, error handling).
2. **Locate:** Identify the exact lines of code that need modification.
3. **Execute:** Provide only the precise code changes required. Do not rewrite unchanged parts of the file.


## 💻 Coding Style Guidelines (Beginner-Friendly)
* Before generating or modifying any code, **always check adjacent files** in the same directory to mimic their syntax, export style (e.g., named vs default exports), and documentation/commenting habits.
**Execute:** Provide only the precise code changes required. Do not rewrite unchanged parts of the file.
* Do not introduce new external libraries or utility helper functions unless explicitly requested. Use what is already written . 
* **Keep It Simple:** Use clean, standard, and easy-to-understand code structures (e.g., standard `if/else` statements, basic loops, and clear function declarations).
* **No Advanced Features:** Do **NOT** use complex or rarely used features (avoid advanced arrow function chaining, complex ternary nests, obscure libraries, or high-level abstractions).
* **Write Detailed Comments:** Every function, logical branch, and variable block must have clear, plain-English comments explaining *what* it does and *why*.
* **Readable Names:** Use clear, descriptive names for variables and functions (e.g., use `totalPrice` instead of `tp`).

# Coding Style Guide for this Project

Please adhere strictly to the following coding conventions:
1. **Target Audience**: Beginner-friendly and easy to read.
2. **Readability over Cleverness**:
   - Avoid dense one-liners, advanced abstractions, or complex nested ternaries.
   - Use descriptive, simple variable and function names.
4. **Consistency**:
   - Follow the naming and formatting patterns already present in existing codebase files.
