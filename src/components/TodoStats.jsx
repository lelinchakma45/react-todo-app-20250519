import React from 'react';

const TodoStats = ({ todos, filter, setFilter, clearCompleted }) => {
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const activeTasks = totalTasks - completedTasks;
  
  // Calculate completion percentage
  const completionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;
  
  return (
    <div className="mb-4 pb-4 border-b border-gray-200" data-aos="fade-up" data-aos-delay="150">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
        <div className="mb-3 sm:mb-0">
          <h2 className="text-lg font-semibold text-gray-800">Your Tasks</h2>
          <div className="text-sm text-gray-500">
            {activeTasks} active, {completedTasks} completed
          </div>
        </div>
        
        {totalTasks > 0 && (
          <div className="flex items-center">
            <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
              <div 
                className="bg-primary-600 h-2.5 rounded-full" 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-700">{completionPercentage}%</span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="flex space-x-1 mb-3 sm:mb-0">
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === 'all' 
                ? 'bg-primary-100 text-primary-800' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('active')}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === 'active' 
                ? 'bg-primary-100 text-primary-800' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Active
          </button>
          <button 
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === 'completed' 
                ? 'bg-primary-100 text-primary-800' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Completed
          </button>
        </div>
        
        {completedTasks > 0 && (
          <button 
            onClick={clearCompleted}
            className="text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            <i className="bi bi-trash mr-1"></i>
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoStats;
