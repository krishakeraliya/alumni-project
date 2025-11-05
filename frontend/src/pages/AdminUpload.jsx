// import React, { useState } from 'react';

// export default function AdminUpload({ onUploadSuccess }) {
//   const [file, setFile] = useState(null);

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append('file', file);

//     const res = await fetch('http://localhost:5000/api/upload-xlsx', {
//       method: 'POST',
//       body: formData,
//     });

//     const data = await res.json();
//     alert(data.message);

//      if (onUploadSuccess) {
//       onUploadSuccess();
//     }
//   };

//   return (
//     <div className="p-4 border rounded">
//       <h2 className="text-lg font-bold mb-2">Upload Alumni Excel</h2>
//       <input
//         type="file"
//         accept=".xlsx"
//         onChange={(e) => setFile(e.target.files[0])}
//       />
//       <button
//         className="bg-blue-600 text-white px-4 py-2 mt-2"
//         onClick={handleUpload}
//       >
//         Upload
//       </button>
//     </div>
//   );
// }


import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export default function AdminUpload() {
  const [file, setFile] = useState(null);
  const [approvedData, setApprovedData] = useState([]);
  const fileInputRef = useRef(null); // Add this line


  const fetchApproved = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/approved");
      setApprovedData(res.data);
    } catch (err) {
      console.error("Error fetching approved data:", err);
    }
  };

  useEffect(() => {
    fetchApproved();
  }, []);

 const handleUpload = async () => {
  if (!file) {
    toast.warn("Please select a file first.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("http://localhost:5000/api/upload-xlsx", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message || "Upload successful!");
      fetchApproved();
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      toast.error(data.message || "Upload failed.");
    }
  } catch (error) {
    toast.error("Server error. Please try again later.");
    console.error("Upload error:", error);
  }
};


 const handleReset = () => {
  setFile(null);
  if (fileInputRef.current) {
    fileInputRef.current.value = ""; // This clears the visual input
  }
};


  return (
    <div className="bg-white border shadow-md max-w-3xl mx-auto mt-10 rounded p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Import Records</h2>

      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <input
          ref={fileInputRef}

          type="file"
          accept=".xlsx"
          className="flex-1 border px-3 py-2 rounded"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      <div className="text-sm text-gray-700 mt-4 space-y-1">
        <p><strong>Note*1:</strong> File must be an Excel file.</p>
        <p><strong>Note*2:</strong> Exact extension is .xlsx</p>
       
    
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          UPLOAD
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          RESET
        </button>
      </div>

      <div className="mt-6 font-medium">
        Total Approved: <span className="text-blue-700">{approvedData.length}</span>
      </div>
    </div>
  );
}
