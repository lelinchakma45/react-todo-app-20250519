import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TodoForm = ({ addTodo }) => {
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('medium');
  const inputRef = useRef(null);
  
  useEffect(() => {
    // Focus the input field when component mounts
    inputRef.current.focus();
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (input.trim() === '') return;
    
    const newTodo = {
      id: uuidv4(),
      text: input.trim(),
      completed: false,
      priority: priority,
      createdAt: new Date().toISOString()
    };
    
    addTodo(newTodo);
    setInput('');
    setPriority('medium');
    inputRef.current.focus();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-aos="fade-up" data-aos-delay="100">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-grow">
          <label htmlFor="todo-input" className="block text-sm font-medium text-gray-700 mb-1">
            What needs to be done?
          </label>
          <input
            id="todo-input"
            type="text"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="input"
          />
        </div>
        
        <div className="sm:w-1/4">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="input"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button 
          type="submit" 
          className="btn btn-primary flex items-center"
          disabled={input.trim() === ''}
        >
          <i className="bi bi-plus-lg mr-2"></i>
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
