# Todo MERN App

A full-stack Todo application built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS. This project features a premium glassmorphism UI and a robust RESTful API backend, organized as a monorepo with npm workspaces.


## 🚀 Features

- **Premium UI**: Vibrant gradient background, glassmorphism effects, and smooth micro-interactions.
- **Full CRUD**: Create, Read, Update, and Delete todo items.
- **Responsive Design**: Perfectly centered and responsive for all screen sizes.
- **RESTful API**: Robust backend with Express.js and MongoDB.
- **Monorepo Structure**: efficient code management using npm workspaces.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Icons
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **Tools**: Concurrently, Nodemon, Dotenv

## 📋 Prerequisites

Ensure you have the following installed including:
- **Node.js**: v14+
- **npm**: v6+
- **MongoDB**: Locally running instance or a remote connection string.

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd todo-mern-app
    ```

2.  **Install Dependencies**
    Run this command at the root to install dependencies for both client and server:
    ```bash
    npm install
    ```

3.  **Configure Environment**
    The server comes with a default configuration, but you can create a `.env` file in `server/.env` if you need to customize the port or database URI:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/todo-app
    ```

4.  **Run the Application**
    Start both the frontend and backend concurrently with a single command:
    ```bash
    npm run dev
    ```
    - **Frontend**: http://localhost:5173
    - **Backend**: http://localhost:5000

## 📂 Project Structure

```
/
├── package.json       # Root configuration (Workspaces + Scripts)
├── client/            # React Frontend
│   ├── src/           # Components and styles
│   └── services/      # API Services
└── server/            # Express Backend
    ├── models/        # Mongoose Models
    ├── routes/        # API Routes
    ├── controllers/   # Business Logic
    └── server.js      # Entry Point
```

## 🔌 API Endpoints

| `GET` | `/api/todos` | Fetch all todos |
| `POST` | `/api/todos` | Create a new todo |
| `PUT` | `/api/todos/:id` | Update a todo |
| `DELETE` | `/api/todos/:id` | Delete a todo |

## 🌟 New Features
- **Due Dates**: Set due dates for your todos with an integrated date picker.
- **Filtering**: Filter todos by "All", "Completed", or "Active".
- **Sorting**: Sort todos by "Added Date" or "Due Date".
- **Error Handling**: Graceful UI alerts for API errors.

## 🤝 Contributing
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
Distributed under the ISC License. See `LICENSE` for more information.
