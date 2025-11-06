import React, { useState } from "react";
import axios from "axios";
import formbg from "../assets/formbg.png";
import imgform from "../assets/imgform.png"; // Side background image
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

export default function AddSubmission() {
  const { token } = useAuth();
  const[formdata,setformdata]=useState({
  name:"",
  enrollment: "",
  mobile: "",
  scetEmail:"",
  personalEmail:"",
  division:"",
  type: "",
  domain: "",
  company: "",
  companyAddress: "",
  mentorName: "",
  mentorDesignation: "",
  mentorMobile: "",
  mentorEmail: "",
  stipendReceived: "",
  stipendAmount: "",
  startDate: "",
  endDate: "",
  reportFile: "",
  evaluationForm: "",
  feedbackForm: "",
  ppt: "",
  noc: "",
  offerLetter: "",
  completionLetter: "",

  })
   const handleInput = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value })
  }
  const handleFileUpload = (e) => {
  const file = e.target.files[0];
  setformdata({
    ...formdata,
    [e.target.name]: file
  });
};
//  const isValidSCETEmail = (email) => {
//     const regex = /^([a-z]+\.((it|co|ai)\d{2}(d\d+)?|[a-z]+))@scet\.ac\.in$/i;
//     return regex.test(email);
//   };
//    const isFinalYearStudent = (email) => {
//     const match = email.match(/^[a-z]+\.(it|co|ai)(\d{2}(d\d+)?)@scet\.ac\.in$/i);
//     if (!match) return false;
//     const admissionYear = 2000 + parseInt(match[3], 10);
//     const currentYear = new Date().getFullYear();
//     return currentYear === admissionYear + 3;
//   };
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const { scetEmail } = formdata;
//     if (!isValidSCETEmail(scetEmail)) {
//       toast.warn("Invalid SCET Email format.");
//       return;
//     }
//      if (!isFinalYearStudent(scetEmail)) {
//       toast.warn("Only Final Year (4th year) students can fill this form.");
//       return;
//     }
// SCET email validation (all three formats)
// SCET email validation (3 supported formats)
// ✅ Validate SCET Email
 

// ✅ SCET Email Validation (both formats)
const isValidSCETEmail = (email) => {
  const e = email.trim();

  // Allowed formats:
  // 1. name.branchyy@scet.ac.in
  // 2. name.branchyyd1@scet.ac.in
  // const regex = /^[a-z]+\.(it|co|ai)\d{2}(d[1-9])?@scet\.ac\.in$/;
   const regex = /^[a-z]+\.(it|co|ai)\d{2}(d\d+)?@scet\.ac\.in$/; 

  return regex.test(e);
};

// ✅ Final Year Check
const isFinalYearStudent = (email) => {
  const e = email.trim();

  // Extract admission year only (ignore d1/d2 for year calculation)
  const match = e.match(/^[a-z]+\.(it|co|ai)(\d{2})(d[1-9])?@scet\.ac\.in$/);
  if (!match) return false;

  const admissionYear = 2000 + parseInt(match[2], 10);
  const currentYear = new Date().getFullYear();

  // SCET: 4th year = admissionYear + 3
  return currentYear === admissionYear + 3;
};
 const isValidEnrollment = (enrollment) => {
  const regex = /^ET\d{2}BT(it|co|ai)\d{1,3}$/i;
  return regex.test(enrollment.trim());
};

// ✅ Handle Submit
const handleSubmit = async (e) => {
  e.preventDefault();

  const email = formdata.scetEmail.trim();

  if (!isValidSCETEmail(email)) {
    toast.warn("Invalid SCET Email format.");
    return;
  }

  if (!isFinalYearStudent(email)) {
    toast.warn("Only Final Year (4th year) students can fill this form.");
    return;
  }
   if (!isValidEnrollment(formdata.enrollment)) {
    toast.warn("Invalid Enrollment format");
    return;
  }
   const internshipTypes = ["summer-internship", "sem8-internship"];
      if (internshipTypes.includes(formdata.type)) {
      if (!formdata.company.trim()) {
        toast.warn("Company name is required for Internship.");
        return;
      }
    if (!formdata.companyAddress.trim()) {
    toast.warn("Please provide company address or mention 'Online Internship'.");
    return;
  }
      if (!formdata.mentorName.trim()) {
        toast.warn("Mentor name is required for Internship.");
        return;
      }
      if (!formdata.mentorDesignation.trim()) {
        toast.warn("Mentor designation is required for Internship.");
        return;
      }
      if (!formdata.mentorEmail.trim()) {
        toast.warn("Mentor email is required for Internship.");
        return;
      }
      if (!formdata.startDate.trim()) {
        toast.warn("Start date is required for Internship.");
        return;
      }
      if (!formdata.endDate.trim()) {
        toast.warn("End date is required for Internship.");
        return;
      }
    }

  try {
    const formDataToSend = new FormData();
    for (const key in formdata) {
      formDataToSend.append(key, formdata[key]);
    }

 await axios.post("http://localhost:5000/api/addsubmission", formDataToSend, {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}` ,
  },
});

   toast.success("Submit successfully");

      // reset form
      setformdata({
        name: "",
        enrollment: "",
        mobile: "",
        scetEmail: "",
        personalEmail:"",
        division: "",
        type: "",
        domain: "",
        company: "",
        companyAddress: "",
        mentorName: "",
        mentorDesignation: "",
        mentorMobile: "",
        mentorEmail: "",
        stipendReceived: "",
        stipendAmount: "",
        startDate: "",
        endDate: "",
        reportFile: "",
        evaluationForm: "",
        feedbackForm: "",
        ppt: "",
        noc: "",
        offerLetter: "",
        completionLetter: "",
      });
      
    }
   catch (error) {
    alert("Failed to add submission");
    console.error("Submit error:", error);
  }
};

  return (
    <div className="min-h-screen text-black flex flex-col bg-no-repeat bg-[length:100%_auto] bg-top" style={{ backgroundImage: `url(${formbg})` }}>
      {/* Spacer for Banner Height */}
      <div className="h-[80vh] w-full" />

      {/* White Form Section */}
      <div className="relative flex justify-center items-center">
        <img src={imgform} alt="side design" className="absolute left-0 top-0 h-full object-contain " />
        <img src={imgform} alt="side design" className="absolute right-0 top-0 h-full object-contain " />

        <div className="bg-white flex-1 p-8 rounded-t-3xl z-10 relative shadow-2xl max-w-2xl mx-auto w-[90%]">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-800">
            Internship & Project Details Form          </h2>
          <form   autoComplete="off" onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block mb-1 text-sm font-semibold">
                Full Name (as per academic records)
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formdata.name}
                onChange={handleInput}
                placeholder="Your Full Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold">
                Enrollment Number
              </label>
              <input
                type="text"
                id="enrollment"
                name="enrollment"
                value={formdata.enrollment}
                onChange={handleInput}
                placeholder="Enrollment Number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold">Mobile Number</label>
              <input
                type="number"
                id="mobile"
                name="mobile"
                value={formdata. mobile}
                onChange={handleInput}
                placeholder="Mobile Number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold">
                SCET Email Id
              </label>
              <input
                type="email"
                id="scetEmail"
                name="scetEmail"
                value={formdata.scetEmail}
                onChange={handleInput}
                placeholder="Enter SCET Email ID"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold">Personal Email Id</label>
              <input
                type="email"
                id="personalEmail"
                name="personalEmail"
                value={formdata.personalEmail}
                onChange={handleInput}
                placeholder="Personal Email Id"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold">
                Division (e.g. A|B)
              </label>
              <input
                type="text"
                 id="division"
                name="division"
                value={formdata.division}
                onChange={handleInput}
                placeholder="Division"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
             <div>
            <label className="block mb-1 text-sm  font-semibold">Select Type</label>
<select
  name="type"
  value={formdata.type}
  onChange={handleInput}
  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
  required
>
  <option value="">-- Select Type --</option>
  <option value="summer-internship">Summer Internship</option>
  <option value="summer-project">Summer Project</option>
  <option value="sem7-project">Semester 7 Project</option>
  <option value="sem8-internship">Semester 8 Internship</option>
  <option value="sem8-project">Semester 8 Project</option>
</select>
</div>
            <div>
              <label className="block mb-1 text-sm font-semibold">
                Domain (e.g. AI, Security, Computer Vision)
              </label>
              <input
                type="text"
                 id="domain"
                name="domain"
                value={formdata.domain}
                onChange={handleInput}
                placeholder="Domain"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold">
                Internship Company Name (In case of Research Project, write NA)
              </label>
              <input
                type="text"
                 id="company"
                name="company"
                value={formdata.company}
                onChange={handleInput}
                placeholder="Internship Company Name/NA"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold">
                Internship Company Full Address with Pin code (In case of Research Project, write NA)
              </label>
              <input
                type="text"
                 id="companyAddress"
                name="companyAddress"
                value={formdata.companyAddress}
                onChange={handleInput}
                placeholder="Company Address"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold">
                Name of the Internship Company Mentor/Immediate Supervisor/Contact Person (In case of Research Project, write NA)
              </label>
              <input
                type="text"
                 id="mentorName"
                name="mentorName"
                value={formdata. mentorName}
                onChange={handleInput}
                placeholder="Company Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold">
                Designation of the Internship Company Mentor/Immediate Supervisor/Contact Person (In case of Research Project, write NA)
              </label>
              <input
                type="text"
                 id="mentorDesignation"
                name="mentorDesignation"
                value={formdata.mentorDesignation}
                onChange={handleInput}
                placeholder="Contact Person"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold">
                Mobile number of the Internship Company Mentor/Immediate Supervisor/Contact Person (In case of Research Project, write NA)
              </label>
              <input
                type="number"
                 id="mentorMobile"
                name="mentorMobile"
                value={formdata.mentorMobile}
                onChange={handleInput}
                placeholder="Contact Number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold">
                Email ID of the Internship Company Mentor/Immediate Supervisor/Contact Person (In case of Research Project, write NA)
              </label>
              <input
                type="email"
                 id="mentorEmail"
                name="mentorEmail"
                value={formdata. mentorEmail}
                onChange={handleInput}
                placeholder="Enter Email ID"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold">
                Receiving Stipend (In case of Research Project, select No)
              </label>
              <select
              id="stipendReceived"
  name="stipendReceived"
  value={formdata.stipendReceived}
  onChange={handleInput}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold">
                If receiving Stipend, mention the stipend amount per month else write NA
              </label>
              <input
                type="text"
                 id="stipendAmount"
                name="stipendAmount"
                value={formdata.stipendAmount}
                onChange={handleInput}
                placeholder="Stipend Amount / NA"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold">
                Date of Joining the Company/Starting date of the Internship (DD/MM/YY) (In case of Research Project, write NA)
              </label>
              <input
                type="text"
                 id="startDate"
                name="startDate"
                value={formdata. startDate}
                onChange={handleInput}
                placeholder="DD/MM/YY or NA"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold">
                Date of End of Internship (DD/MM/YY) (In case of Research Project, write NA)
              </label>
              <input
                type="text"
                 id="endDate"
                name="endDate"
                value={formdata.endDate}
                onChange={handleInput}
                placeholder="DD/MM/YY or NA"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
                <label className="block mb-1 text-sm font-semibold">
                  Internship/Project Report Submission (PDF, max 5MB)
                </label>
                <input
                  type="file"
                   id="reportFile"
                name="reportFile"
                
                onChange={ handleFileUpload }
                  accept=".pdf"
                  className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-semibold">
                  SuperVisor Evaluation Form (PDF, max 5MB)
                </label>
                <input
                  type="file"
                   id="evaluationForm"
                name="evaluationForm"
              
                onChange={ handleFileUpload }
                  accept=".pdf"
                  className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
              
              
              <div>
                <label className="block mb-1 text-sm font-semibold">
                  Student Feedback Form (PDF, max 5MB)
                </label>
                <input
                  type="file"
                   id="feedbackForm"
                name="feedbackForm"
               
                onChange={ handleFileUpload }
                  accept=".pdf"
                  className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
              
              <div>
                  <label className="block mb-1 text-sm font-semibold">
                    PowerPoint Presentation (PPT/PPTX, max 10MB)
                  </label>
                  <input
                    type="file"
                     id="ppt"
                name="ppt"
                
                onChange={ handleFileUpload }
                    accept=".ppt,.pptx"
                    className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>
                {(formdata.type === "summer-internship" || formdata.type === "sem8-internship") && (
                <div>
                    <label className="block mb-1 text-sm font-semibold">
                      No Objection Certificate (NoC) from the Institute (PDF, max 5MB)
                    </label>
                    <input
                      type="file"
                       id="noc"
                name="noc"
             
                onChange={ handleFileUpload }
                      accept=".pdf"
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                      required
                    />
                  </div>
                )}
                   {(formdata.type === "summer-internship" || formdata.type === "sem8-internship") && (
                  <div>
                    <label className="block mb-1 text-sm font-semibold">
                      Company Joining Letter / Internship Offer Letter (PDF, max 5MB)
                    </label>
                    <input
                      type="file"
                       id="offerLetter"
                name="offerLetter"
               
                onChange={ handleFileUpload }
                      accept=".pdf"
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                      required
                    />
                  </div>
                   )}
                  {(formdata.type === "summer-internship" || formdata.type === "sem8-internship") && (
                  <div>
                    <label className="block mb-1 text-sm font-semibold">
                      Internship Completion Certificate / Letter from Company (PDF, max 5MB)
                    </label>
                    <input
                      type="file"
                       id="completionLetter"
                name="completionLetter"
               
                onChange={ handleFileUpload }
                      accept=".pdf"
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                      required
                    />
                  </div>
                  )}


            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

