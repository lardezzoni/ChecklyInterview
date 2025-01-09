import React from 'react';

function Home() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center" 
      style={{ backgroundImage: "url('/images/main_home.jpg')" }} // Replace with your image path
    >
      <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg p-10 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-6">
          Checkly WebApp test
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          Test the Checkly integration
        </p>
        <div className="flex justify-center space-x-4">
          <button className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition">
            Get Started
          </button>
          <button className="px-8 py-3 bg-gray-100 text-gray-800 font-semibold rounded-full hover:bg-gray-200 transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;