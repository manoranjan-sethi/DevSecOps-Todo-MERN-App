import React from 'react';
import { FaPencilAlt, FaTrashAlt, FaClock } from 'react-icons/fa';

const TodoItem = ({ todo, onDelete, onEdit, onToggle }) => {
  return (
    <li className="group flex items-center justify-between p-4 bg-white hover:bg-blue-50/50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hover:border-blue-100">
      <div className="flex items-center space-x-4 flex-1">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="peer w-6 h-6 text-blue-600 rounded-md border-gray-300 focus:ring-blue-500 cursor-pointer transition-all duration-200"
          />
        </div>
        <span
          className={`text-gray-700 text-lg font-medium transition-all duration-300 ${
            todo.completed ? 'line-through text-gray-400 decoration-2 decoration-gray-300' : ''
          }`}
        >
          {todo.text}
        </span>
      </div>

      <div className="flex flex-col items-end space-y-1">
        <div className="flex items-center space-x-3 mb-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <button
            onClick={() => onEdit(todo.id)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
            title="Edit"
          >
            <FaPencilAlt size={14} />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
            title="Delete"
          >
            <FaTrashAlt size={14} />
          </button>
        </div>
        
        <div className="flex items-center text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
          <FaClock className="mr-1.5 text-orange-400" size={10} />
          <span>{todo.date || '28th Jun 2020'}</span>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
