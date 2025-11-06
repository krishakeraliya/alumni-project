
import React, { useState, useEffect } from "react";
import axios from "axios";
import formbg from "../assets/formbg.png";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";


export default function AdminPending() {
    
      const [pending, setPending] = useState([]);
      const [expandedRow, setExpandedRow] = useState(null);
      const [showUpdateModal, setShowUpdateModal] = useState(false);
     
      const [updateData, setUpdateData] = useState(null);
      const [fileInputs, setFileInputs] = useState({});
      const { token } = useAuth();

      const fetchPending = async () => {
        const headers = { Authorization: `Bearer ${token}` };
    const res = await axios.get("http://localhost:5000/api/pending",{ headers });
    setPending(res.data);
  };


       const approveHandler = async (id) => {
        const headers = { Authorization: `Bearer ${token}` };
    await axios.put(`http://localhost:5000/api/approve/${id}`,{},{ headers });
    fetchPending();
  };

  const handleReject = async (id) => {
    try {
       const headers = { Authorization: `Bearer ${token}` };
      await axios.patch(`http://localhost:5000/api/reject/${id}`,{},{ headers });
      setPending((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error rejecting submission:", error);
    }
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const openUpdateModal = (item) => {
    setUpdateData(item);
    setFileInputs({});
    setShowUpdateModal(true);
  };

  const handleUpdateChange = (field, value) => {
    setUpdateData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field, file) => {
    setFileInputs((prev) => ({ ...prev, [field]: file }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };
      const formData = new FormData();
      Object.entries(updateData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      Object.entries(fileInputs).forEach(([key, file]) => {
        formData.append(key, file);
      });

      await axios.put(`http://localhost:5000/api/update/${updateData._id}`, formData, { headers });

      await fetchPending();
      setShowUpdateModal(false);
      toast.success("Updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Update failed");
    }
  };

  
    useEffect(() => {
      if (token) fetchPending();
      
    }, [token]);
  
  return (
    <div>
       {/* Pending Submissions */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Pending Submissions</h2>
               
              </div>
             
      
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded border">
                  <thead className="bg-gray-200 text-left">
                    <tr>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Enrollment</th>
                      <th className="px-4 py-2">Type</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pending.map((item) => (
                      <React.Fragment key={item._id}>
                        <tr className="border-t">
                          <td className="px-4 py-2">{item.name}</td>
                          <td className="px-4 py-2">{item.enrollment}</td>
                          <td className="px-4 py-2">{item.type}</td>
                          <td className="px-4 py-2 space-x-2">
                            <button
                              className="bg-green-600 text-white px-2 py-1 rounded"
                              onClick={() => approveHandler(item._id)}
                            >
                              Approve
                            </button>
                            <button
                              className="bg-red-600 text-white px-2 py-1 rounded"
                              onClick={() => handleReject(item._id)}
                            >
                              Reject
                            </button>
                            <button
                              className="bg-yellow-500 text-white px-2 py-1 rounded"
                              onClick={() => openUpdateModal(item)}
                            >
                              Update
                            </button>
                            <button
                              className="bg-gray-700 text-white px-2 py-1 rounded"
                              onClick={() => toggleRow(item._id)}
                            >
                              {expandedRow === item._id ? "Hide" : "View"}
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
                       <p><strong>Company:</strong> {item.company}</p>
                       <p><strong>Company Address:</strong> {item.companyAddress}</p>
                       <p><strong>Mentor Name:</strong> {item.mentorName}</p>
                       <p><strong>Mentor Designation:</strong> {item.mentorDesignation}</p>
                       <p><strong>Mentor Mobile:</strong> {item.mentorMobile}</p>
                       <p><strong>Mentor Email:</strong> {item.mentorEmail}</p>
                       <p><strong>Stipend Receiving:</strong> {item.stipendReceiving}</p>
                       <p><strong>Stipend Amount:</strong> {item.stipendAmount}</p>
                       <p><strong>Joining Date:</strong> {item.startDate}</p>
                       <p><strong>End Date:</strong> {item.endDate}</p>
                                {["reportFile", "evaluationForm", "feedbackForm", "ppt", "noc", "offerLetter", "completionLetter"].map((field) => (
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


            {/* update model */}
      {showUpdateModal && updateData && (
  <div
    className="fixed inset-0 z-50 flex justify-center items-center bg-cover bg-center"
    style={{ backgroundImage: `url(${formbg})` }}
  >
    {/* Soft frosted glass overlay */}
    <div className="bg-white/30 backdrop-blur-sm w-full h-full absolute inset-0" />

    {/* Modal Box */}
    <div className="relative bg-white rounded-3xl p-8 w-[90%] md:w-[700px] max-h-[85vh] overflow-y-auto shadow-2xl z-10">
      <h3 className="text-2xl font-extrabold mb-6 text-center text-blue-800">
        Update Submission
      </h3>
      <form onSubmit={handleUpdateSubmit} className="flex flex-col gap-5">
        {[
          "name", "enrollment", "company", "mobile", "scetEmail", "division", "domain", "companyAddress",
          "mentorName", "mentorDesignation", "mentorMobile", "mentorEmail",
          "stipendReceiving", "stipendAmount", "joinDate", "endDate"
        ].map((field) => (
          <div key={field}>
            <label className="block mb-1 text-sm font-semibold capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type="text"
              value={updateData[field] || ""}
              onChange={(e) => handleUpdateChange(field, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        ))}

        {/* Custom dropdown for "type" field */}
  <div >
    <label className="block mb-1 text-sm font-semibold">Select Type</label>
    <select
      name="type"
      value={updateData.type}
      onChange={(e) => handleUpdateChange("type", e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      <option value="">-- Select Type --</option>
      <option value="summer-internship">Summer Internship</option>
      <option value="summer-project">Summer Project</option>
      <option value="sem7-project">Semester 7 Project</option>
      <option value="sem8-internship">Semester 8 Internship</option>
      <option value="sem8-project">Semester 8 Project</option>
    </select>
  </div>

       {(() => {
  let fileFields = [];

  if (
    updateData.type === "summer-internship" ||
    updateData.type === "sem8-internship"
  ) {
    fileFields = [
      "reportFile",
      "evaluationForm",
      "feedbackForm",
      "ppt",
      "noc",
      "offerLetter",
      "completionLetter",
    ];
  } else if (
    updateData.type === "summer-project" ||
    updateData.type === "sem7-project" ||
    updateData.type === "sem8-project"
  ) {
    fileFields = ["reportFile", "evaluationForm", "feedbackForm", "ppt"];
  }

  
  return fileFields.map((field) => {
    // ppt ke liye alag accept
    const acceptType =
      field === "ppt" ? ".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation" : "application/pdf";

    return (
      <div key={field}>
        <label className="block mb-1 text-sm font-semibold capitalize">
          {field.replace(/([A-Z])/g, " $1")} (Upload)
        </label>
        <input
          type="file"
          accept={acceptType}
          onChange={(e) => handleFileChange(field, e.target.files[0])}
          className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
    );
  });

})()}

        <div className="flex justify-between gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Update
          </button>
          <button
            type="button"
            className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
            onClick={() => setShowUpdateModal(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      
    </div>
  )
}
