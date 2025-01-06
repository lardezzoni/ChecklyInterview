import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-yellow-400">
          MyApp
        </Link>
        <div className="flex space-x-6">
          <Link to="/" className="text-gray-200 hover:text-yellow-400 transition">
            Home
          </Link>
          <Link to="/about" className="text-gray-200 hover:text-yellow-400 transition">
            About
          </Link>
          <Link to="/contact" className="text-gray-200 hover:text-yellow-400 transition">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;