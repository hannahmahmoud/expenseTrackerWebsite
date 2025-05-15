
# Expenses Website

## Project Overview
Expenses Website is a full-stack web application designed to help users track, manage, and analyze their personal expenses efficiently. It features user authentication, category management, expense entry, and reporting. The project is divided into two main parts: a backend RESTful API built with Node.js and Express, and a frontend single-page application built with React.

---

## Technologies Used

### Backend
- **Node.js** & **Express.js**: Web server and API framework
- **MySQL** (via Sequelize ORM): Relational database for data persistence
- **Sequelize**: ORM for modeling and querying the database
- **JWT (jsonwebtoken)**: Authentication via JSON Web Tokens
- **bcryptjs**: Password hashing
- **dotenv**: Environment variable management
- **Helmet, CORS, xss-clean**: Security and request hardening
- **express-validator**: Input validation middleware
- **Morgan**: HTTP request logging

### Frontend
- **React** (Create React App)
- **React Router DOM**: Frontend routing
- **Axios**: HTTP client for API requests
- **React Testing Library & Jest**: For frontend testing

---

## Project Structure

\`\`\`
Expenses Website/
├── Backend/
│   ├── Server/                 # Main server entry point (server.js)
│   ├── Controller/             # API route controllers
│   ├── Model/                  # Sequelize models for database tables
│   ├── Route/                  # Express route definitions
│   ├── Configuration/          # Database and app config
│   ├── Utils/                  # Utility functions
│   ├── Validators/             # Request input validation logic
│   ├── package.json            # Backend dependencies and scripts
│   └── config.env              # Environment variables (DB credentials, secrets)
│
├── frontend/
│   ├── public/                 # Public static files
│   ├── src/                    # React source code
│   ├── package.json            # Frontend dependencies and scripts
│   └── README.md               # Frontend-specific readme (optional)
│
└── README.md                   # Project root readme (this file)
\`\`\`

---

## Setup and Installation

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v14+ recommended)
- [MySQL](https://www.mysql.com/) server installed and running
- (Optional) \`npm\` or \`yarn\` package manager

---

### Backend Setup

1. Navigate to the backend directory:
   \`\`\`bash
   cd "Expenses Website/Backend"
   \`\`\`

2. Install backend dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Configure your environment variables in \`config.env\`. Typical variables include:
   \`\`\`
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=expenses_db
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   \`\`\`

4. Initialize the database schema (if using Sequelize CLI or migrations - check your backend docs or scripts).

5. Start the backend server:
   - For development (auto reload on changes):
     \`\`\`bash
     npm run dev
     \`\`\`
   - For production:
     \`\`\`bash
     npm start
     \`\`\`

The backend API will typically run on \`http://localhost:5000\`.

---

### Frontend Setup

1. Navigate to the frontend directory:
   \`\`\`bash
   cd "Expenses Website/frontend"
   \`\`\`

2. Install frontend dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the frontend React development server:
   \`\`\`bash
   npm start
   \`\`\`

The React app will open at \`http://localhost:3000\` and proxy API requests to the backend.

---

## Features Overview

- User Authentication (Signup/Login) with secure password hashing and JWT tokens.
- Add, edit, and delete expense categories.
- CRUD operations on expenses with details like amount, date, category, and notes.
- Data validation on both client and server side.
- Responsive UI built with React for a smooth user experience.
- API routes follow REST principles.
- Security best practices (input sanitization, CORS, helmet, etc.).
- Logging and error handling integrated in backend.

---

## Author / Contact

Developed by **Hannah Mahmoud**  
Contact: hanamahmoud178@gmail.com 
 

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Thanks to the creators of Node.js, Express, React, and Sequelize.
- Inspired by various open-source personal finance apps.

---

*For detailed backend and frontend docs, check their respective folders.*
