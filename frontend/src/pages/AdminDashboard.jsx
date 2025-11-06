// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import AdminApproved from "./AdminApproved";
// import AddSubmission from "./AddSubmission";
// import AdminUpload from "./AdminUpload";

// function AdminDashboard() {
//   const [pending, setPending] = useState([]);
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [showForm, setShowForm] = useState(false); // toggle form
//   const [updateData, setUpdateData] = useState(null);
//   const [fileInputs, setFileInputs] = useState({});
//   const [approvedData, setApprovedData] = useState([]);

//   const fetchPending = async () => {
//     const res = await axios.get("http://localhost:5000/api/pending");
//     console.log("Fetched Pending After Update:", res.data);
//     setPending(prev => [...res.data]);
//   };
// const fetchApproved = async () => {
//   try {
//     const res = await axios.get("http://localhost:5000/api/approved");
//     setApprovedData(res.data);
//   } catch (err) {
//     console.error("Error fetching approved data:", err);
//   }
// };
//   const approveHandler = async (id) => {
//     await axios.put(`http://localhost:5000/api/approve/${id}`);
//     fetchPending();
//   };

//   const handleReject = async (id) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/reject/${id}`);
//       setPending(prev => prev.filter(item => item._id !== id));
//     } catch (error) {
//       console.error("Error rejecting submission:", error);
//     }
//   };

//   const toggleRow = (id) => {
//     setExpandedRow(expandedRow === id ? null : id);
//   };

//   const openUpdateModal = (item) => {
//     setUpdateData(item);
//     setFileInputs({});
//     setShowUpdateModal(true);
//   };

//   const handleUpdateChange = (field, value) => {
//     setUpdateData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleFileChange = (field, file) => {
//     setFileInputs((prev) => ({ ...prev, [field]: file }));
//   };

//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();

//       // Append text fields
//       Object.entries(updateData).forEach(([key, value]) => {
//         formData.append(key, value);
//       });

//       // Append file fields
//       Object.entries(fileInputs).forEach(([key, file]) => {
//         formData.append(key, file);
//       });

//      await axios.put(
//   `http://localhost:5000/api/update/${updateData._id}`,
//   formData,
//   {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   }
// );

// // Fetch updated list FIRST, then close modal
// await fetchPending();
// setShowUpdateModal(false);
// alert("Updated successfully!");

//     } catch (err) {
//       console.error("Update failed:", err);
//       alert("Update failed");
//     }
//   };

//   useEffect(() => {
//     fetchPending();
//      fetchApproved();
//   }, []);

//   return (
//     <div>
//       <h2>Pending Submissions</h2>
//        <button onClick={() => setShowForm(!showForm)}>
//               {showForm ? "Hide Form" : "Add Details"}
//             </button>
      
//             {/* Show form below if toggled */}
//             {showForm && <AddSubmission />}
//       <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Enrollment</th>
//             <th>Company</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {pending.map((item) => (
//             <React.Fragment key={item._id}>
//               <tr>
//                 <td>{item.name}</td>
//                 <td>{item.enrollment}</td>
//                 <td>{item.company}</td>
//                 <td>
//                   <button onClick={() => approveHandler(item._id)}>Approve</button>
//                   <button className="bg-red-600 text-white" onClick={() => handleReject(item._id)}>Reject</button>
//                   <button onClick={() => openUpdateModal(item)}>Update</button>
//                   <button onClick={() => toggleRow(item._id)}>
//                     {expandedRow === item._id ? "Hide" : "View"}
//                   </button>
//                 </td>
//               </tr>
//               {expandedRow === item._id && (
                
//                 <tr>
//                   <td colSpan="4">
//                     <div style={{ textAlign: "left", padding: "10px" }}>
                     
//                       <p><strong>Mobile Number:</strong> {item.mobile}</p>
//                       <p><strong>Scet Email Id:</strong> {item.scetEmail}</p>
//                       <p><strong>Division:</strong> {item. division}</p>
//                       <p><strong>Internship Or Research Project:</strong> {item.type}</p>
//                       <p><strong>Domain:</strong> {item.domain}</p>
//                       <p><strong>Company Address:</strong> {item.companyAddress}</p>
//                       <p><strong>Mentor Name:</strong> {item.mentorName}</p>
//                       <p><strong>Mentor Designation:</strong> {item.mentorDesignation}</p>
//                       <p><strong>Mentor Mobile:</strong> {item.mentorMobile}</p>
//                       <p><strong>Mentor Email:</strong> {item.mentorEmail}</p>
//                       <p><strong>Stipend Receiving:</strong> {item.stipendReceiving}</p>
//                       <p><strong>Stipend Amount:</strong> {item.stipendAmount}</p>
//                       <p><strong>Joining Date:</strong> {item.startDate}</p>
//                       <p><strong>End Date:</strong> {item.endDate}</p>
//                       {["reportFile", "evaluationForm", "feedbackForm", "ppt", "noc", "offerLetter", "completionLetter"].map((field) => (
//                         <p key={field}>
//                           <strong>{field.replace(/([A-Z])/g, " $1").replace(/^\w/, c => c.toUpperCase())}:</strong>{" "}
//                           {item[field] ? (
//                             <a href={`http://localhost:5000/${item[field].replace(/\\/g, "/")}`} target="_blank" rel="noopener noreferrer">View</a>
//                           ) : "Not Uploaded"}
//                         </p>
//                       ))}
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>

//       {/* Update Modal */}
//       {showUpdateModal && updateData && (
//         <div style={{ background: "#00000088", position: "fixed", top: 0, left: 0, right: 0, bottom: 0, display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999 }}>
//           <div style={{ background: "white", padding: 20, borderRadius: 8, width: "700px", maxHeight: "80vh", overflowY: "auto" }}>
//             <h3>Update Submission</h3>
//             <form onSubmit={handleUpdateSubmit}>
//               {[
//                 "name", "enrollment", "company", "mobile","scetEmail","division", "type", "domain", "companyAddress",
//                 "mentorName", "mentorDesignation", "mentorMobile", "mentorEmail",
//                 "stipendReceiving", "stipendAmount", "joinDate", "endDate"
//               ].map((field) => (
//                 <div key={field}>
//                   <label>{field.replace(/([A-Z])/g, " $1").replace(/^\w/, c => c.toUpperCase())}:</label>
//                   <input
//                     type="text"
//                     value={updateData[field] || ""}
//                     onChange={(e) => handleUpdateChange(field, e.target.value)}
//                     style={{ width: "100%", marginBottom: 10 }}
//                   />
//                 </div>
//               ))}

//               {/* File Inputs */}
//               {[
//                 "reportFile", "evaluationForm", "feedbackForm", "ppt", "noc", "offerLetter", "completionLetter"
//               ].map((field) => (
//                 <div key={field}>
//                   <label>{field.replace(/([A-Z])/g, " $1").replace(/^\w/, c => c.toUpperCase())} (Upload):</label>
//                   <input
//                     type="file"
//                     onChange={(e) => handleFileChange(field, e.target.files[0])}
//                     style={{ width: "100%", marginBottom: 10 }}
//                   />
//                 </div>
//               ))}

//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <button type="submit">Update</button>
//                 <button type="button" onClick={() => setShowUpdateModal(false)}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//        {/* Approved Section */}
//   <hr style={{ margin: "40px 0" }} />
//   <AdminApproved />

//   <AdminUpload onUploadSuccess={fetchApproved}/>
//     </div>



//   );
// }

// export default AdminDashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import {useAuth} from "../store/auth"






export default function AdminDashboard() {
  const {token} =useAuth();
  const [approvedCount, setApprovedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0); // ✅ New state

  useEffect(() => {
    if (token) {
      fetchCounts();
    }
  }, [token]); // ✅ wait until token is available

  const fetchCounts = async () => {
    try {
       const headers = { Authorization: `Bearer ${token}` }; // ✅ attach token
      const [approvedRes, pendingRes, rejectedRes] = await Promise.all([
        axios.get("http://localhost:5000/api/approved",{ headers }),
        axios.get("http://localhost:5000/api/pending",{ headers }),
        axios.get("http://localhost:5000/api/rejected",{ headers }), // ✅ Make sure this endpoint exists
      ]);

      setApprovedCount(approvedRes.data.length || 0);
      setPendingCount(pendingRes.data.length || 0);
      setRejectedCount(rejectedRes.data.length || 0); // ✅ Set rejected count
    } catch (error) {
      console.error("Error fetching dashboard counts:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold">Total Pending</h3>
          <p className="text-blue-600 text-3xl">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold">Total Approved</h3>
          <p className="text-green-600 text-3xl">{approvedCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold">Total Rejected</h3>
          <p className="text-red-600 text-3xl">{rejectedCount}</p>
        </div>
      </div>
    
    </div>
  );
}



