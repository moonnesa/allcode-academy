import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg sticky top-0">
      <div className="container mx-auto flex justify-center">
        <button className="text-white font-bold text-xl hover:text-gray-200 transition duration-300">
          Picture Heaven
        </button>
      </div>
    </nav>
  );
};

export default Navbar;