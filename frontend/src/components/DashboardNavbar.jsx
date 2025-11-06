
import React, { useState } from "react";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";

const DashboardNavbar = ({ searchText, setSearchText,userEmail, onLogout}) => {
   const navigate = useNavigate();
   const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
};

   

 
  return (
    <>
       <nav className="bg-white text-blue-800 font-bold py-4 shadow-md text-xl border-b border-gray-200 px-4">
        <div className="flex items-center justify-between relative">
          
          {/* Left: Add Details Button */}
          <div className="absolute left-0">
            <button
              onClick={() => navigate("/add-details")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Add Details
            </button>
          </div>

          {/* Center: Title */}
          <h1 className="mx-auto text-2xl font-semibold tracking-wide text-center">
            Explore Journeys <span className="text-blue-500">| Gain Insights</span> <span className="text-blue-500">| Grow Together</span>
          </h1>
      
          <div className="relative inline-block text-left">
  {/* Avatar */}
  <div
    className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white cursor-pointer"
    onClick={toggleMenu}
  >
    {userEmail.charAt(0).toUpperCase()}
  </div>

  {/* Dropdown */}
  {isMenuOpen && (
    <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg z-10">
      <button
        onClick={onLogout}
        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
  )}
</div>

     
        </div>
      </nav>




      <div className="w-full flex justify-center mt-4 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row max-w-3xl w-full h-auto sm:h-12 rounded-lg overflow-hidden shadow-lg bg-white">
          {/* <select className="bg-gray-100 px-3 py-2 sm:py-0 text-sm font-medium text-gray-700 outline-none hover:bg-gray-200 cursor-pointer">
            <option>Search In:</option>
            <option>Name</option>
            <option>Enrollment</option>
            <option>Domain</option>
            <option>Company</option>
            <option>Year</option>
            <option>Type</option>
          </select> */}

          <input
            placeholder="Search Your Inspiration..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full px-4 py-2 sm:py-0 outline-none text-sm text-gray-700 focus:ring-2 focus:ring-blue-400"
          />

          <button className="bg-blue-600 px-4 py-2 sm:py-0 text-white hover:bg-blue-700 active:scale-95 transition-all duration-150">
            <i className="fa-solid fa-magnifying-glass text-lg"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardNavbar;
