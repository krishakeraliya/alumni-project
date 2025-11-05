import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

function ApprovedSubmissions() {
  const [approved, setApproved] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/approved").then((res) => {
      setApproved(res.data);
      
    });
  }, []);

  return (
    <div className="card-container">
      {approved.map((item) => (
       <Card key={item._id} card={item} />
      ))}
    </div>
  );
}

export default ApprovedSubmissions;
