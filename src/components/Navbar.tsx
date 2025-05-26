import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full fixed top-0 bg-white z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">Your Name</div>
          <div className="hidden md:flex space-x-6">
            <a href="#home" className="hover:text-blue-600">
              Home
            </a>
            <a href="#projects" className="hover:text-blue-600">
              Projects
            </a>
            <a href="#tech" className="hover:text-blue-600">
              Tech Stack
            </a>
            <a href="#contact" className="hover:text-blue-600">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
