import React, { useState, useEffect } from 'react';

const Header = () => {
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  return (
    <header className="bg-white shadow-sm py-6">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center" data-aos="fade-right" data-aos-delay="100">
            <i className="bi bi-check2-square text-primary-600 text-3xl mr-3"></i>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">TaskMaster</h1>
              <p className="text-sm text-gray-500">Organize your tasks efficiently</p>
            </div>
          </div>
          <div className="text-right" data-aos="fade-left" data-aos-delay="200">
            <p className="text-lg font-medium text-gray-700">{greeting}!</p>
            <p className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
