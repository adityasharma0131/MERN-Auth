import React, { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-900 text-white">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-xl">MERN-Auth</h1>
        <button
          className="md:hidden text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>
        <ul className={`flex-col md:flex-row md:flex gap-4 absolute md:static top-12 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent p-4 md:p-0 ${isOpen ? 'flex' : 'hidden'}`}>
          <li className=" flex justify-center items-center p-2 md:py-0"><a href="#" className=" py-2 px-2 hover:text-blue-400 hover:rounded-sm hover:bg-gray-600">Home</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
