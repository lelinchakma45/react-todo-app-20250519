import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import Header from './components/Header';
import Footer from './components/Footer';
import { toast } from 'react-toastify';
import AOS from 'aos';

function App() {
  // Load todos from localStorage on initial render
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  
  const [filter, setFilter] = useState('all');

  // Save todos to localStorage whenever todos state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Refresh AOS when components update
  useEffect(() => {
    AOS.refresh();
  }, [todos, filter]);

  // Add a new todo
  const addTodo = (todo) => {
    setTodos([...todos, todo]);
    toast.success('Task added successfully!');
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast.info('Task removed');
  };

  // Toggle todo completion status
  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Edit a todo
  const editTodo = (id, newText) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
    toast.success('Task updated!');
  };

  // Filter todos based on current filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // Clear all completed todos
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
    toast.info('Completed tasks cleared');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-3xl">
        <div className="card mb-8 transform hover:shadow-lg" data-aos="fade-down">
          <TodoForm addTodo={addTodo} />
        </div>
        
        <div className="card" data-aos="fade-up" data-aos-delay="200">
          <TodoStats 
            todos={todos} 
            filter={filter} 
            setFilter={setFilter} 
            clearCompleted={clearCompleted} 
          />
          
          <TodoList 
            todos={filteredTodos} 
            toggleComplete={toggleComplete} 
            deleteTodo={deleteTodo} 
            editTodo={editTodo} 
          />
          
          {filteredTodos.length === 0 && (
            <div className="py-8 text-center text-gray-500" data-aos="zoom-in" data-aos-delay="300">
              <i className="bi bi-clipboard-check text-5xl mb-3 block text-gray-300"></i>
              <p className="text-lg">
                {filter === 'all' 
                  ? "You don't have any tasks yet. Add one above!" 
                  : filter === 'active' 
                    ? "No active tasks found" 
                    : "No completed tasks found"}
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
