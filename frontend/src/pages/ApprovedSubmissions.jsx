import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useAuth } from "../store/auth"; 

function ApprovedSubmissions() {
   const { token } = useAuth();
  const [approved, setApproved] = useState([]);
   useEffect(() => {
    if (token) fetchApproved();
  }, [token]);
const fetchApproved = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` }; // ✅ send token
      const res = await axios.get("http://localhost:5000/api/approved", { headers });
      setApproved(res.data);
    } catch (error) {
      console.error("Error fetching approved submissions:", error);
    }
  };

  

 return (
    <div className="card-container">
      {approved.length > 0 ? (
        approved.map((item) => <Card key={item._id} card={item} />)
      ) : (
        <p className="text-center text-gray-500 mt-10">No approved submissions yet.</p>
      )}
    </div>
  );
}

export default ApprovedSubmissions;
