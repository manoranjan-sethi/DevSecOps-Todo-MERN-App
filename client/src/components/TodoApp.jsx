import React, { useState, useEffect } from 'react';
import { FaCheckSquare, FaCalendarAlt, FaSortAmountDown, FaExclamationCircle } from 'react-icons/fa';
import TodoItem from './TodoItem';
import api from '../services/api';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Added date');
  const [dueDate, setDueDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 3000);
  };

  const fetchTodos = async () => {
    try {
      const { data } = await api.get('/todos');
      setTodos(data);
    } catch (err) {
      console.error('Error fetching todos:', err);
      showError('Failed to fetch todos. Please try again later.');
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    try {
      const { data } = await api.post('/todos', { 
        text: inputValue,
        dueDate: dueDate || undefined 
      });
      setTodos([data, ...todos]);
      setInputValue('');
      setDueDate('');
      setShowDatePicker(false);
    } catch (err) {
      console.error('Error adding todo:', err);
      showError('Failed to add todo. Please try again.');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
      showError('Failed to delete todo. Please try again.');
    }
  };

  const editTodo = async (id) => {
    const todoToEdit = todos.find((todo) => todo._id === id);
    if (todoToEdit) {
      const newText = prompt('Edit todo:', todoToEdit.text);
      if (newText !== null && newText.trim() !== '') {
        try {
            const { data } = await api.put(`/todos/${id}`, { text: newText });
            setTodos(todos.map((todo) => (todo._id === id ? data : todo)));
        } catch (err) {
            console.error('Error editing todo:', err);
            showError('Failed to update todo. Please try again.');
        }
      }
    }
  };

  const toggleComplete = async (id) => {
    const todoToToggle = todos.find((todo) => todo._id === id);
    if (todoToToggle) {
        try {
            const { data } = await api.put(`/todos/${id}`, { completed: !todoToToggle.completed });
            setTodos(todos.map((todo) => (todo._id === id ? data : todo)));
        } catch (err) {
            console.error('Error toggling todo:', err);
            showError('Failed to update todo status. Please try again.');
        }
    }
  };

  const getFilteredAndSortedTodos = () => {
    let filteredTodos = todos;

    if (filter === 'Completed') {
      filteredTodos = todos.filter((todo) => todo.completed);
    } else if (filter === 'Active') {
      filteredTodos = todos.filter((todo) => !todo.completed);
    }

    return filteredTodos.sort((a, b) => {
      const dateA = new Date(sort === 'Due date' && a.dueDate ? a.dueDate : a.createdAt);
      const dateB = new Date(sort === 'Due date' && b.dueDate ? b.dueDate : b.createdAt);

      if (sort === 'Added date') {
        return new Date(b.createdAt) - new Date(a.createdAt); // Newest first
      } else {
        // Sort by due date (earliest first), push those without due date to end
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 relative">
      {/* Error Alert */}
      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md flex items-center z-50 w-3/4 justify-center">
            <FaExclamationCircle className="mr-2" />
            <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center drop-shadow-sm">
        <div className="bg-blue-600 p-2 rounded-lg mr-3 shadow-lg">
           <FaCheckSquare className="text-white text-2xl" />
        </div>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
          My Todo-s
        </span>
      </h1>

      {/* Input Area */}
      <div className="bg-white p-2 rounded-xl shadow-lg mb-8 flex flex-col border border-gray-100 transition-shadow hover:shadow-xl duration-300">
        <div className="flex items-center w-full">
            <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add new..."
            className="flex-1 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none text-lg bg-transparent"
            />
            <button 
                onClick={() => setShowDatePicker(!showDatePicker)}
                className={`text-gray-400 hover:text-blue-500 px-4 transition-colors duration-200 ${dueDate ? 'text-blue-600' : ''}`}
                title={dueDate ? `Due: ${dueDate}` : "Set Due Date"}
            >
            <FaCalendarAlt size={22} />
            </button>
            <button
            onClick={addTodo}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
            ADD
            </button>
        </div>
        {showDatePicker && (
            <div className="px-4 pb-2">
                <input 
                    type="date" 
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                />
            </div>
        )}
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>

      {/* Filter and Sort Controls */}
      <div className="flex justify-end space-x-6 mb-6 text-gray-500 text-sm font-medium">
        <div className="flex items-center space-x-2 group cursor-pointer">
          <span className="group-hover:text-blue-600 transition-colors">Filter</span>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent border-none focus:ring-0 text-gray-700 font-bold cursor-pointer hover:text-blue-600 transition-colors"
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Active">Active</option>
          </select>
        </div>
        <div className="flex items-center space-x-2 group cursor-pointer">
          <span className="group-hover:text-blue-600 transition-colors">Sort</span>
          <div className="flex items-center cursor-pointer space-x-1">
            <select 
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-gray-700 font-bold cursor-pointer hover:text-blue-600 transition-colors"
            >
              <option value="Added date">Added date</option>
              <option value="Due date">Due date</option>
            </select>
            <FaSortAmountDown className="text-green-500 group-hover:text-green-600 transition-colors" />
          </div>
        </div>
      </div>

      {/* Todo List */}
      <ul className="space-y-3">
        {getFilteredAndSortedTodos().map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            onToggle={toggleComplete}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
