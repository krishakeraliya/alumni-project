// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Logout } from "./pages/Logout";
import ViewDashboard from "./pages/ViewDashboard";
import Navbar from "./components/Navbar"; // Reused for about/contact
import DashboardNavbar from "./components/DashboardNavbar";
import InternshipForm from "./pages/InternshipForm"
import CardDetails from "./pages/CardDetails";
import Error from "./pages/Error";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute"; 
import AdminLayout from "./components/layouts/AdminLayout";
import AddSubmission from "./pages/AddSubmission";
import AdminPending from "./pages/AdminPending";
import AdminApproved from "./pages/AdminApproved";
import AdminUpload from "./pages/AdminUpload";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import ResetPassword from "./pages/ResetPassword";
import FullGallery from "./pages/Fullgallery";
import AdminGallery from "./pages/AdminGallery";







function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Home: special layout with modal, so not wrapped */}
        <Route path="/" element={<Home />} />

        {/* Public pages use shared navbar but no modal */}
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About/>
              
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact/>
              
            </>
          }
        />
        <Route 
        path="/reset-password/:token" 
        element={
           <>
        <ResetPassword />
        </>
        } />

        <Route
          path="/gallery"
          element={
            <>
              {/* <Navbar /> */}
              <FullGallery />
            </>
          }
        />
        

        <Route
  path="/add-details"
  element={
    <>
       <PrivateRoute> <InternshipForm /></PrivateRoute>
     
    </>
  }
/>

  
<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  }
>
  <Route path="dashboard" element={<AdminDashboard />} />
  <Route path="view-dashboard" element={<ViewDashboard />} />
  <Route path="add-user" element={<AddSubmission />} />
  <Route path="pending" element={<AdminPending />} />
  <Route path="approved" element={<AdminApproved />} />
  <Route path="import-users" element={<AdminUpload />} />
  <Route path="gallery" element={<AdminGallery />} />
</Route>

  

        {/* Dashboard - different navbar */}
        <Route
          path="/dashboard"
          element={
            <>
              <PrivateRoute>
                <ViewDashboard/>
              </PrivateRoute>
             
             
            </>
          }
        />
        <Route
          path="/internships/:id"
          element={
            <>
              <PrivateRoute><CardDetails /></PrivateRoute>
              
            </>
          }
        />
          <Route path="*" element={<Error/>}/>
         <Route path="/logout" element={<Logout />} />
        
      </Routes>
    </Router>
  );
}

export default App;
