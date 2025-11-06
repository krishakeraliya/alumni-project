

// import { Link, useLocation,useNavigate } from "react-router-dom";
// import { useAuth } from "../store/auth";

// function Navbar({ onLoginClick }) {
//   const location = useLocation();
//   const isHome = location.pathname === "/";
//   const { isloggedin, LogOutUser } = useAuth();

//   return (
//     <nav className="bg-[#2D2D5F] px-6 py-3 shadow-md flex justify-between items-center font-[Montserrat]">
//       <h2 className="text-xl font-bold text-white">SCET Nexus</h2>

//       <ul className="flex gap-6 text-white font-medium items-center">
//         <li>
//           <Link
//             to="/"
//             className="hover:text-green-400 transition duration-200"
//           >
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/about"
//             className="hover:text-green-400 transition duration-200"
//           >
//             About
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/contact"
//             className="hover:text-green-400 transition duration-200"
//           >
//             Contact
//           </Link>
//         </li>

//         {!isloggedin && isHome && (
//           <li>
//             <button
//               onClick={onLoginClick}
//               className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition duration-200"
//             >
//               Login / Signup
//             </button>
//           </li>
//         )}

//         {isloggedin && (
//           <li>
//             <button
//               onClick={LogOutUser}
//               className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition duration-200"
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

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

function Navbar({ onLoginClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const { isloggedin, LogOutUser, user } = useAuth();

  return (
    <nav className="bg-[#2D2D5F] px-6 py-3 shadow-md flex justify-between items-center font-[Montserrat]">
      <h2
        className="text-xl font-bold text-white cursor-pointer"
        onClick={() => navigate("/")}
      >
        SCET Nexus
      </h2>

      <ul className="flex gap-6 text-white font-medium items-center">
        <li>
          <Link to="/" className="hover:text-green-400 transition duration-200">
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

        {/* ✅ LOGIN / SIGNUP button for guests only */}
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

        {/* ✅ SHOW DASHBOARD BUTTON IF LOGGED IN */}
        {isloggedin && user && (
          <>
            <li>
              {user.isAdmin ? (
                <button
                  onClick={() => navigate("/admin/dashboard")}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition duration-200"
                >
                  Admin Panel
                </button>
              ) : (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition duration-200"
                >
                  My Dashboard
                </button>
              )}
            </li>

            <li>
              <button
                onClick={() => {
                  LogOutUser();
                  navigate("/");
                }}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

