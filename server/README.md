# Comprehensive Documentation for the Application

This an overview of a herartspace Node.js application that utilizes Express.js for server-side functionality, MongoDB for data storage, and Next.js for the client-side interface. The application includes user authentication, profile management, community network and abuse reporting features.

## Table of Contents
1. [Project Structure](#project-structure)
2. [Server Setup](#server-setup)
   - [Dependencies](#dependencies)
   - [Environment Variables](#environment-variables)
   - [Middleware](#middleware)
   - [Routes](#routes)
3. [Client Setup](#client-setup)
   - [Dependencies](#client-dependencies)
   - [Components](#components)
4. [Usage](#usage)
5. [Error Handling](#error-handling)

## Project Structure
The project is structured into several directories:
```
/project-root

├── /client                    # Next.js frontend application
|   
|   ├── /App                       #App router page 
│   ├── /components            # Reusable UI components
│   ├── /hooks                 # Custom React hooks
│   ├── /utils                 # Utility functions
│   ├── /pages                 # Next.js pages
│   └── package.json           # Client dependencies and scripts



├── /server                 #server files
├── /models                    # Mongoose models (User, Post, Comment, AbuseReport)
├── /routes                    # Express routes (authRoutes, apiRoutes, abuseRoutes)
├── /controllers               # Business logic for routes
├── /middleware                # Custom middleware (authMiddleware, errorHandler, validation)
└── index.js                  # Main server file
```

## Server Setup

### Dependencies
The server uses several key dependencies:
- **dotenv**: Loads environment variables from a `.env` file.
- **express**: Web framework for Node.js to handle routing and middleware.
- **mongoose**: ODM library for MongoDB.
- **cors**: Middleware to enable Cross-Origin Resource Sharing.
- **helmet**: Middleware for securing HTTP headers.
- **express-rate-limit**: Middleware to limit repeated requests to public APIs.

### Environment Variables
The application utilizes environment variables defined in a `.env` file. Key variables include:
- `MONGODB_URI`: Connection string for MongoDB.
- `PORT`: The port on which the server will run.
- `JWT_SECRET`: Secret key used for signing JSON Web Tokens.
- `FRONTEND_URL`: URL of the frontend application.

### Middleware
Middleware functions are used to handle requests and responses:
- `express.json()`: Parses incoming JSON requests.
- `cors()`: Configures CORS settings.
- `helmet()`: Sets various HTTP headers for security.
- `express-session`: Manages user sessions.

### Routes
The server defines several routes some example below: 
1. **Authentication Routes (`/api/auth`)**
   - `POST /signup`: User registration.
   - `POST /login`: User login.
   - `POST /logout`: User logout.
   - Google OAuth integration.

2. **API Routes (`/api`)**
   - `POST /posts/create`: Create a new post (requires authentication).
   - `GET /posts`: Retrieve all posts.
   - `POST /posts/:id/like`: Like a specific post (requires authentication).
   - User profile management.

3. **Abuse Reporting Routes (`/api`)**
   - `POST /abuse-reports`: Submit an abuse report.
   - `GET /abuse-reports`: Retrieve all abuse reports (authentication required).

## Client Setup

### Dependencies
The client is built using Next.js and includes the following dependencies:
- **@radix-ui/react**: UI components library.
- **axios**: Promise-based HTTP client for making requests.
- **tailwindcss**: Utility-first CSS framework for styling.

### Components
Key components in the client include:

1. **LoginPage**
2. **SignUp**
2. **ProfileSettings**
3. **Dashboard**
4. **ProfileSettings**
5. **SideBar**
6. **ResourcePage**
7. **ReportPage**
8. **CounselorsPage**
9. **CommunityPage**




## Usage
To run the server:
1. Ensure MongoDB is running and accessible via the connection string specified in `.env`. Aswell as nodemon is configured correctly in the package.json
2. Install server dependencies using:
    ```bash
    npm install
    ```
3. Start the server with:
    ```bash
    npm start
    ```

To run the client:
1. Navigate to the client directory and install dependencies with:
    ```bash
    npm install
    ```
2. Start the client with:
    ```bash
    npm run dev
    ```

## Error Handling
The application includes error handling middleware that captures errors during request processing and sends appropriate HTTP responses. It logs errors to the console and returns a JSON response with error details.

```javascript
app.use(errorHandler);
```

This middleware should be placed after all route definitions to catch any errors that occur within those routes.

---

