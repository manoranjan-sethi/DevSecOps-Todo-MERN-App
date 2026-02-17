import React, { useState } from 'react';
import { FaCheckSquare, FaCalendarAlt, FaPlus, FaFilter, FaSortAmountDown } from 'react-icons/fa';
import TodoItem from './TodoItem';

const TodoApp = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Buy groceries for next week', completed: true, date: '28th Jun 2020' },
    { id: 2, text: 'Renew car insurance', completed: false, date: '28th Jun 2020' },
    { id: 3, text: 'Sign up for online course', completed: false, date: '28th Jun 2020' },
  ]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      const newText = prompt('Edit todo:', todoToEdit.text);
      if (newText !== null && newText.trim() !== '') {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, text: newText } : todo
          )
        );
      }
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
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
      <div className="bg-white p-2 rounded-xl shadow-lg mb-8 flex items-center border border-gray-100 transition-shadow hover:shadow-xl duration-300">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add new..."
          className="flex-1 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none text-lg bg-transparent"
        />
        <button className="text-gray-400 hover:text-blue-500 px-4 transition-colors duration-200">
          <FaCalendarAlt size={22} />
        </button>
        <button
          onClick={addTodo}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          ADD
        </button>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>

      {/* Filter and Sort Controls */}
      <div className="flex justify-end space-x-6 mb-6 text-gray-500 text-sm font-medium">
        <div className="flex items-center space-x-2 group cursor-pointer">
          <span className="group-hover:text-blue-600 transition-colors">Filter</span>
          <select className="bg-transparent border-none focus:ring-0 text-gray-700 font-bold cursor-pointer hover:text-blue-600 transition-colors">
            <option>All</option>
            <option>Completed</option>
            <option>Active</option>
          </select>
        </div>
        <div className="flex items-center space-x-2 group cursor-pointer">
          <span className="group-hover:text-blue-600 transition-colors">Sort</span>
          <div className="flex items-center cursor-pointer space-x-1">
            <select className="bg-transparent border-none focus:ring-0 text-gray-700 font-bold cursor-pointer hover:text-blue-600 transition-colors">
              <option>Added date</option>
              <option>Due date</option>
            </select>
            <FaSortAmountDown className="text-green-500 group-hover:text-green-600 transition-colors" />
          </div>
        </div>
      </div>

      {/* Todo List */}
      <ul className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
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
