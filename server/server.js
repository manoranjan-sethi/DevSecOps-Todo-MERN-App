import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import todoRoutes from './routes/todoRoutes.js';

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

// Connect to MongoDB
/* eslint-disable no-console */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(`MongoDB Connected: ${mongoose.connection.host}`))
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  });
/* eslint-enable no-console */

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow Vite dev server(s)
  })
);
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// Error Handler Middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server started on port ${port}`));
