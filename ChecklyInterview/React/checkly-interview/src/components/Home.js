// Home.js
import React from 'react';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center p-10 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Home Page</h1>
        <p className="text-lg text-gray-700">
          Welcome to our modern React app. Explore the clean and responsive design!
        </p>
        <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;