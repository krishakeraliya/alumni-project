import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function Card({ card }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition-all duration-300 border border-gray-200">
      <h3 className="text-xl font-bold text-blue-700 mb-2">{card.name}</h3>

      <div className="space-y-1.5 text-sm text-gray-700">
        <p><span className="font-semibold">Enrollment:</span> {card.enrollment}</p>
        <p><span className="font-semibold">Domain:</span> {card.domain}</p>
        <p><span className="font-semibold">Company:</span> {card.company}</p>
        <p><span className="font-semibold">Year:</span> 
  {card.startDate && !isNaN(new Date(card.startDate).getFullYear()) 
    ? new Date(card.startDate).getFullYear() 
    : "NA"}
</p>

        <p><span className="font-semibold">Type:</span> {card.type}</p>
      </div>

      <Link to={`/internships/${card._id}`}>
  <button className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700 transition">
    Full Details
  </button>
</Link>
    </div>
  );
}
