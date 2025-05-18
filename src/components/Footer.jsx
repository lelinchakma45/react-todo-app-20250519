import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white py-6 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0" data-aos="fade-right" data-aos-delay="100">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} TaskMaster. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-4" data-aos="fade-up" data-aos-delay="200">
            <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">
              <i className="bi bi-github text-lg"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">
              <i className="bi bi-twitter text-lg"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">
              <i className="bi bi-linkedin text-lg"></i>
            </a>
          </div>
          
          <div className="mt-4 md:mt-0 text-xs text-gray-500" data-aos="fade-left" data-aos-delay="300">
            Designed by WebSparks AI
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
