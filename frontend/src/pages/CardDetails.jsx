import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function CardDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      const res = await fetch(`http://localhost:5000/api/internships/${id}`);
      const data = await res.json();
      setCard(data);
    };
    fetchCard();
  }, [id]);

if (!card) {
  return (
    <div className="min-h-screen flex justify-center items-center text-blue-600 font-semibold text-xl">
      Loading details...
    </div>
  );
}


  return (
   <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">
  <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-8 border border-gray-200">

    <button
      onClick={() => navigate(-1)}
      className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
    >
      ← Back
    </button>

    <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
      {card.name}'s Full Details
    </h2>

    {/* Student Info */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Student Information</h3>
      <p><strong>Enrollment:</strong> {card.enrollment}</p>
      <p><strong>SCET Email Id:</strong> {card.scetEmail}</p>
      {/* <p><strong>Mobile:</strong> {card.mobile}</p> */}
      <p><strong>Personal Email Id:</strong>{card.personalEmail}</p>
      <p><strong>Type:</strong> {card.type}</p>
    </div>

    <hr className="my-4" />

    {/* Internship Info */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Internship Information</h3>
      <p><strong>Domain:</strong> {card.domain}</p>
      <p><strong>Company:</strong> {card.company}</p>
      <p><strong>Company Address:</strong> {card.companyAddress}</p>
      <p><strong>Year:</strong> 
  {card.startDate && !isNaN(new Date(card.startDate).getFullYear()) 
    ? new Date(card.startDate).getFullYear() 
    : "NA"}
</p>

      <p><strong>Start Date:</strong> {card.startDate}</p>
      <p><strong>End Date:</strong> {card.endDate}</p>
      <p><strong>Stipend Received:</strong> {card.stipendReceived}</p>
      <p><strong>Stipend Amount:</strong> {card.stipendAmount}</p>
    </div>

    <hr className="my-4" />

    {/* Mentor Info */}
    <div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Mentor Information</h3>
      <p><strong>Mentor Name:</strong> {card.mentorName}</p>
      <p><strong>Mentor Designation:</strong> {card.mentorDesignation}</p>
      <p><strong>Mentor Email:</strong> {card.mentorEmail}</p>
      <p><strong>Mentor Mobile:</strong> {card.mentorMobile}</p>
    </div>

    <hr className="my-4" />

{/* Submission Components */}
<div>
  <h3 className="text-lg font-semibold text-gray-700 mb-2">Submission Components</h3>

  <p>
    <strong>Internship/Project Report:</strong>{" "}
    {card.reportFile ? (
      <a
        href={`http://localhost:5000/${card.reportFile.replace(/\\/g, "/")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View Report
      </a>
    ) : (
      "Not Uploaded"
    )}
  </p>

  <p>
    <strong>Supervisor Evaluation Form:</strong>{" "}
    {card.evaluationForm ? (
      <a
        href={`http://localhost:5000/${card.evaluationForm.replace(/\\/g, "/")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View Evaluation
      </a>
    ) : (
      "Not Uploaded"
    )}
  </p>

  <p>
    <strong>Student Feedback Form:</strong>{" "}
    {card.feedbackForm ? (
      <a
        href={`http://localhost:5000/${card.feedbackForm.replace(/\\/g, "/")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View Feedback
      </a>
    ) : (
      "Not Uploaded"
    )}
  </p>

  <p>
    <strong>PowerPoint Presentation (PPT):</strong>{" "}
    {card.ppt ? (
      <a
        href={`http://localhost:5000/${card.ppt.replace(/\\/g, "/")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View PPT
      </a>
    ) : (
      "Not Uploaded"
    )}
  </p>

  <p>
    <strong>No Objection Certificate (NoC):</strong>{" "}
    {card.noc ? (
      <a
        href={`http://localhost:5000/${card.noc.replace(/\\/g, "/")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View NoC
      </a>
    ) : (
      "Not Uploaded"
    )}
  </p>

  <p>
    <strong>Offer Letter:</strong>{" "}
    {card.offerLetter ? (
      <a
        href={`http://localhost:5000/${card.offerLetter.replace(/\\/g, "/")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View Offer Letter
      </a>
    ) : (
      "Not Uploaded"
    )}
  </p>

  <p>
    <strong>Completion Certificate:</strong>{" "}
    {card.completionLetter ? (
      <a
        href={`http://localhost:5000/${card.completionLetter.replace(/\\/g, "/")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View Completion Certificate
      </a>
    ) : (
      "Not Uploaded"
    )}
  </p>
</div>

  </div>
</div>

  );
}
