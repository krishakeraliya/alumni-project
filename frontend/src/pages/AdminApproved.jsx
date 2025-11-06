// import React, { useEffect, useState } from "react";
// import axios from "axios";


// function AdminApproved() {
//   const [approved, setApproved] = useState([]);
//   const [expandedRow, setExpandedRow] = useState(null);


//   useEffect(() => {
//     axios.get("http://localhost:5000/api/approved")
//       .then((res) => setApproved(res.data))
//       .catch((err) => console.error("Error loading approved:", err));
//   }, []);

//   const toggleRow = (id) => {
//     setExpandedRow(expandedRow === id ? null : id);
//   };
// const handleDelete = async (id) => {
//   try {
//     const confirm = window.confirm("Are you sure you want to delete this submission?");
//     if (!confirm) return;

//     const response = await fetch(`http://localhost:5000/api/approved/${id}`, {
//       method: "DELETE",
//     });

//     if (response.ok) {
//       setApproved((prev) => prev.filter((item) => item._id !== id));
//       alert("Deleted successfully!");
//     } else {
//       alert("Failed to delete");
//     }
//   } catch (err) {
//     console.error("Delete error:", err);
//     alert("Server error while deleting");
//   }
// };

//   return (
//     <div>
//       <h2>Approved Submissions (Admin View)</h2>

      
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
//           {approved.map((item) => (
//             <React.Fragment key={item._id}>
//               <tr>
//                 <td>{item.name}</td>
//                 <td>{item.enrollment}</td>
//                 <td>{item.company}</td>
//                 <td>
//                   <button onClick={() => toggleRow(item._id)}>
//                     {expandedRow === item._id ? "Hide" : "View"}
//                   </button>
//                   <button onClick={() => handleDelete(item._id)}>Delete</button>
                 
//                 </td>
//               </tr>
//               {expandedRow === item._id && (
//                 <tr>
//                   <td colSpan="4">
//                     <div style={{ textAlign: "left", padding: "10px" }}>
//                       <p><strong>Mobile Number:</strong> {item.mobile}</p>
//                       <p><strong>Scet Email Id:</strong> {item.scetEmail}</p>
//                       <p><strong>Division:</strong> {item.division}</p>
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
//                       {[
//                         "reportFile",
//                         "evaluationForm",
//                         "feedbackForm",
//                         "ppt",
//                         "noc",
//                         "offerLetter",
//                         "completionLetter",
//                       ].map((field) => (
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
//     </div>
//   );
// }

// export default AdminApproved;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";


function AdminApproved() {
  
   const { token } = useAuth();
  const [approved, setApproved] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  

  useEffect(() => {
    // axios
    //   .get("http://localhost:5000/api/approved")
    //   .then((res) => setApproved(res.data))
    //   .catch((err) => console.error("Error loading approved:", err));
      if (token) fetchApproved();
  }, [token]);

   const fetchApproved = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get("http://localhost:5000/api/approved", { headers });
      setApproved(res.data);
    } catch (err) {
      console.error("Error loading approved:", err);
    }
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this submission?");
    if (!confirmDelete) return;

    try {
   
      const response = await fetch(`http://localhost:5000/api/approved/${id}`,{
         method: "DELETE",
         headers: {
    Authorization: `Bearer ${token}`,
  },
      });

      if (response.ok) {
        setApproved((prev) => prev.filter((item) => item._id !== id));
        toast.success("Deleted successfully!");
      } else {
        toast.error("Failed to delete");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Server error while deleting");
    }
  };

  return (
    <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Approved Submissions</h2>
               
              </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow border rounded">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Enrollment</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {approved.map((item) => (
              <React.Fragment key={item._id}>
                <tr className="border-t">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.enrollment}</td>
                  <td className="px-4 py-2">{item.type}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      className="bg-gray-700 text-white px-2 py-1 rounded"
                      onClick={() => toggleRow(item._id)}
                    >
                      {expandedRow === item._id ? "Hide" : "View"}
                    </button>
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {expandedRow === item._id && (
                  <tr className="bg-gray-50">
                    <td colSpan="4" className="px-4 py-4 text-sm">
                      <div className="space-y-2">
                       <p><strong>Mobile Number:</strong> {item.mobile}</p>
                       <p><strong>Scet Email Id:</strong> {item.scetEmail}</p>
                       <p><strong>Personal Email Id:</strong>{item.personalEmail}</p>
                       <p><strong>Division:</strong> {item. division}</p>
                       <p><strong>Domain:</strong> {item.domain}</p>
                       <p><strong>Company</strong> {item.company}</p>
                       <p><strong>Company Address:</strong> {item.companyAddress}</p>
                       <p><strong>Mentor Name:</strong> {item.mentorName}</p>
                       <p><strong>Mentor Designation:</strong> {item.mentorDesignation}</p>
                       <p><strong>Mentor Mobile:</strong> {item.mentorMobile}</p>
                       <p><strong>Mentor Email:</strong> {item.mentorEmail}</p>
                       <p><strong>Stipend Receiving:</strong> {item.stipendReceiving}</p>
                       <p><strong>Stipend Amount:</strong> {item.stipendAmount}</p>
                       <p><strong>Joining Date:</strong> {item.startDate}</p>
                       <p><strong>End Date:</strong> {item.endDate}</p>
                        {[
                          "reportFile", "evaluationForm", "feedbackForm", "ppt", "noc", "offerLetter", "completionLetter"
                        ].map((field) => (
                          <p key={field}>
                            <strong>{field}:</strong>{" "}
                            {item[field] ? (
                              <a
                                className="text-blue-600 underline"
                                href={`http://localhost:5000/${item[field].replace(/\\/g, "/")}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                View
                              </a>
                            ) : "Not Uploaded"}
                          </p>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminApproved;

