import Todo from '../models/Todo.js';
import mongoose from 'mongoose';

// @desc    Get all todos
// @route   GET /api/todos
// @access  Public
export const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new todo
// @route   POST /api/todos
// @access  Public
export const createTodo = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      res.status(400);
      throw new Error('Please add a text field');
    }

    const todo = await Todo.create({
      text,
    });

    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Public
export const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error('Todo not found');
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      res.status(404);
      throw new Error('Todo not found');
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Public
export const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error('Todo not found');
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      res.status(404);
      throw new Error('Todo not found');
    }

    await todo.deleteOne();

    res.status(200).json({ id: id });
  } catch (error) {
    next(error);
  }
};
