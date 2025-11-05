import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <section className="text-center space-y-6">
        <div className="relative inline-block">
          <h1 className="text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent animate-pulse">
            404
          </h1>
        </div>

        <h4 className="text-2xl font-semibold mt-2 text-white">SORRY! PAGE NOT FOUND</h4>
        <p className="text-gray-400 max-w-md mx-auto">
          Oops! It seems like the page you're trying to access doesn't exist. If you
          believe there's an issue, feel free to report it, and we'll look into it.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <NavLink
            to="/"
            className="border border-indigo-500 hover:bg-indigo-600 hover:text-white px-5 py-2 rounded-md transition duration-300"
          >
            RETURN HOME
          </NavLink>
       
        </div>
      </section>
    </div>
  );
}
