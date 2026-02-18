# Todo MERN App

A full-stack Todo application built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS. This project features a stunning premium glassmorphism UI, a robust RESTful API backend, and comprehensive task management features.

## 🚀 Key Features

*   **Premium UI/UX**:
    *   **Glassmorphism Design**: Modern, translucent interface with vibrant gradient backgrounds.
    *   **Smooth Animations**: Fluid micro-interactions and transitions for a polished feel.
    *   **Responsive Layout**: Perfectly centered and adaptive design for all devices.
*   **Advanced Task Management**:
    *   **Full CRUD**: Create, Read, Update, and Delete todo items effortlessly.
    *   **Due Dates**: Set and track deadlines with an integrated date picker.
    *   **Smart Filtering**: View tasks by status ("All", "Completed", "Active").
    *   **Flexible Sorting**: Organize tasks by "Added Date" or "Due Date".
*   **Robust Backend**:
    *   **RESTful API**: Secure and efficient API built with Express.js.
    *   **Data Persistence**: Reliable data storage using MongoDB and Mongoose.
    *   **Security**: Implemented with Helmet for HTTP headers and CORS for resource sharing.
*   **Developer Experience**:
    *   **Monorepo Structure**: Efficient code management using npm workspaces.
    *   **Concurrent Execution**: Run both client and server with a single command.

## 🛠️ Tech Stack

### Frontend
-   **Core**: React 18+ (via Vite)
-   **Styling**: Tailwind CSS, PostCSS, Autoprefixer
-   **Icons**: React Icons
-   **State Management**: React Hooks (useState, useEffect)
-   **HTTP Client**: Axios

### Backend
-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MongoDB (via Mongoose)
-   **Security**: Helmet, CORS
-   **Utilities**: Dotenv, Concurrently, Nodemon

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
-   **Node.js**: v18+ (Recommended)
-   **npm**: v9+ or **yarn**
-   **MongoDB**: Local instance or MongoDB Atlas connection string.

## ⚙️ Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/manoranjan-sethi/DevSecOps-Todo-MERN-App.git
    cd todo-mern-app
    ```

2.  **Install Dependencies**
    Install dependencies for both the root, client, and server using the unified script:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the `server/` directory:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/todo-app
    # Add other variables if necessary
    ```

4.  **Run the Application**
    Start both the frontend and backend concurrently:
    ```bash
    npm run dev
    ```
    -   **Frontend**: `http://localhost:5173`
    -   **Backend**: `http://localhost:5000`

## 📂 Project Structure

```
/
├── package.json       # Root configuration (Workspaces + Scripts)
├── client/            # React Frontend (Vite)
│   ├── src/           # Components, hooks, and styles
│   │   ├── components/ # UI Components (TodoApp, TodoItem)
│   │   └── services/   # API Integration
│   └── public/        # Static assets
└── server/            # Express Backend
    ├── models/        # Mongoose Schemas (Todo.js)
    ├── routes/        # API Routes (todoRoutes.js)
    ├── controllers/   # Request Handlers (todoController.js)
    └── server.js      # Server Entry Point
```

## 🔌 API Endpoints

| Method   | Endpoint          | Description                          | Request Body Example           |
| :------- | :---------------- | :----------------------------------- | :----------------------------- |
| `GET`    | `/api/todos`      | Fetch all todos                      | -                              |
| `POST`   | `/api/todos`      | Create a new todo                    | `{ "text": "Buy milk", "dueDate": "2023-12-31" }` |
| `PUT`    | `/api/todos/:id`  | Update a todo (text/status)          | `{ "completed": true }` or `{ "text": "Buy almond milk" }` |
| `DELETE` | `/api/todos/:id`  | Delete a todo                        | -                              |

## 🤝 Contributing

Contributions are welcome!
1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the ISC License. See `LICENSE` for more information.
