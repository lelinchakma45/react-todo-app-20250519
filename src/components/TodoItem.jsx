import React, { useState, useRef, useEffect } from 'react';

const TodoItem = ({ todo, toggleComplete, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const editInputRef = useRef(null);
  
  useEffect(() => {
    if (isEditing) {
      editInputRef.current.focus();
    }
  }, [isEditing]);
  
  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };
  
  const handleUpdate = () => {
    if (editText.trim() !== '') {
      editTodo(todo.id, editText);
      setIsEditing(false);
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleUpdate();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(todo.text);
    }
  };
  
  // Get priority color
  const getPriorityColor = () => {
    switch (todo.priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div 
      className={`todo-item group ${todo.completed ? 'todo-item-completed' : ''}`}
      data-aos="fade-up"
      data-aos-delay="50"
      data-aos-anchor-placement="top-bottom"
    >
      <div className="flex-shrink-0">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="todo-checkbox"
        />
      </div>
      
      <div className="ml-3 flex-grow">
        {isEditing ? (
          <input
            type="text"
            ref={editInputRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={handleKeyDown}
            className="input"
          />
        ) : (
          <div>
            <div className={`todo-text ${todo.completed ? 'todo-text-completed' : ''}`}>
              {todo.text}
            </div>
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <span className="mr-2">
                <i className="bi bi-clock mr-1"></i>
                {formatDate(todo.createdAt)}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${getPriorityColor()}`}>
                {todo.priority}
              </span>
            </div>
          </div>
        )}
      </div>
      
      <div className="todo-actions opacity-0 group-hover:opacity-100 transition-opacity">
        {!isEditing && !todo.completed && (
          <button
            onClick={handleEdit}
            className="todo-action-btn todo-action-btn-edit"
            aria-label="Edit task"
          >
            <i className="bi bi-pencil"></i>
          </button>
        )}
        <button
          onClick={() => deleteTodo(todo.id)}
          className="todo-action-btn todo-action-btn-delete"
          aria-label="Delete task"
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
