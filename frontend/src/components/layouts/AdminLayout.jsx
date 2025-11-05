// src/components/layouts/AdminLayout.jsx
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaUserPlus, FaUserCheck, FaUsers,
  FaUpload, FaUserClock, FaSignOutAlt,FaImages ,FaHome
} from "react-icons/fa";

const AdminLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-6 text-xl font-bold border-b border-gray-700">
          ADMIN PANEL
        </div>
       
  
        <nav className="p-4 space-y-4 text-sm">

           <Link
  to="/"
  className={`flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
    pathname === "/" ? "bg-gray-700" : ""
  }`}
>
  <FaHome /> Home
</Link>
          <Link to="/admin/dashboard" className={`flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${pathname === "/admin/dashboard" ? "bg-gray-700" : ""}`}>
            <FaUsers /> Dashboard
          </Link>
          <Link
  to="/admin/view-dashboard"
  className={`flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
    pathname === "/admin/view-dashboard" ? "bg-gray-700" : ""
  }`}
>
  <FaUsers /> Main Dashboard
</Link>

          <Link to="/admin/add-user" className={`flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${pathname === "/admin/add-user" ? "bg-gray-700" : ""}`}>
            <FaUserPlus /> Add Record
          </Link>
          <Link to="/admin/pending" className={`flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${pathname === "/admin/pending" ? "bg-gray-700" : ""}`}>
            <FaUserClock /> Pending
          </Link>
          <Link to="/admin/approved" className={`flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${pathname === "/admin/approved" ? "bg-gray-700" : ""}`}>
            <FaUserCheck /> Approved
          </Link>
          <Link to="/admin/import-users" className={`flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${pathname === "/admin/import-users" ? "bg-gray-700" : ""}`}>
            <FaUpload /> Import Records
          </Link>
          <Link to="/admin/gallery" className={`flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${pathname === "/admin/gallery" ? "bg-gray-700" : ""}`}>
            <FaImages  /> Gallery
          </Link>
          <Link to="/logout" className="flex items-center gap-2 p-2 rounded hover:bg-gray-700">
            <FaSignOutAlt /> Logout
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet /> {/* This renders child routes */}
      </main>
    </div>
  );
};

export default AdminLayout;
