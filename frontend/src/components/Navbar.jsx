// import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "../store/auth";

// function Navbar({ onLoginClick }) {
//   const location = useLocation();
//   const isHome = location.pathname === "/";
//   const { isloggedin, LogOutUser } = useAuth();

//   return (
//     <nav className="bg-[#1e293b] px-6 py-3 shadow flex justify-between items-center">
//       {/* Logo / Brand */}
//       <h2 className="text-2xl font-bold text-white tracking-wide">SCET Nexus</h2>

//       {/* Navigation Links */}
//       <ul className="flex gap-6 text-sm font-medium items-center">
//         <li>
//           <Link to="/" className="text-white hover:text-green-400 transition">
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link to="/about" className="text-white hover:text-green-400 transition">
//             About
//           </Link>
//         </li>
//         <li>
//           <Link to="/contact" className="text-white hover:text-green-400 transition">
//             Contact
//           </Link>
//         </li>

//         {/* Conditional Auth Buttons */}
//         {!isloggedin && isHome && (
//           <li>
//             <button
//               onClick={onLoginClick}
//               className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition"
//             >
//               Login / Signup
//             </button>
//           </li>
//         )}

//         {isloggedin && (
//           <li>
//             <button
//               onClick={LogOutUser}
//               className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition"
//             >
//               Logout
//             </button>
//           </li>
//         )}
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;

import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../store/auth";

function Navbar({ onLoginClick }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { isloggedin, LogOutUser } = useAuth();

  return (
    <nav className="bg-[#2D2D5F] px-6 py-3 shadow-md flex justify-between items-center font-[Montserrat]">
      <h2 className="text-xl font-bold text-white">SCET Nexus</h2>

      <ul className="flex gap-6 text-white font-medium items-center">
        <li>
          <Link
            to="/"
            className="hover:text-green-400 transition duration-200"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="hover:text-green-400 transition duration-200"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="hover:text-green-400 transition duration-200"
          >
            Contact
          </Link>
        </li>

        {!isloggedin && isHome && (
          <li>
            <button
              onClick={onLoginClick}
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition duration-200"
            >
              Login / Signup
            </button>
          </li>
        )}

        {isloggedin && (
          <li>
            <button
              onClick={LogOutUser}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
