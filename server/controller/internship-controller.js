const Internship = require("../model/internship-model");
const XLSX = require("xlsx");
const fs = require('fs');

const getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find({ approved: true });

    res.status(200).json({ success: true, data: internships });
  } catch (error) {
    console.error("Error fetching internships:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const getInternshipById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Internship.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Internship not found" });
    }

    // ✅ Approved check
    if (!data.approved) {
      return res.status(403).json({ error: "Internship not approved yet" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to load internship" });
  }
};

// const getFilterOptions = async (req, res) => {
//   try {
//     const domains = await Internship.distinct("domain");
//     const companies = await Internship.distinct("company");
//   const yearsRaw = await Internship.distinct("startDate");

//     const uniqueYears = yearsRaw
//       .filter(Boolean)
//       .map((dateStr) => {
//         const [day, month, year] = dateStr.split('/'); // Split "1/9/2023"
//         return parseInt(year); // Get 2023
//       })
//       .filter((v, i, a) => a.indexOf(v) === i && !isNaN(v)); // Unique & valid

//     res.json({ domainOptions: domains, companyOptions: companies, yearOptions: uniqueYears });
//   } catch (err) {
//     res.status(500).json({ error: "Error loading filters" });
//   }
// };
// const getFilterOptions = async (req, res) => {
//   try {
//     // ✅ Only from approved internships
//     const approvedInternships = await Internship.find({ approved: true });

//     const domains = [...new Set(approvedInternships.map((i) => i.domain))];
//     const companies = [...new Set(approvedInternships.map((i) => i.company))];

//     const yearsRaw = approvedInternships.map((i) => i.startDate);
//     const uniqueYears = yearsRaw
//       .filter(Boolean)
//       .map((dateStr) => {
//         const [day, month, year] = dateStr.split('/');
//         return parseInt(year);
//       })
//       .filter((v, i, a) => a.indexOf(v) === i && !isNaN(v));

//     res.json({ domainOptions: domains, companyOptions: companies, yearOptions: uniqueYears });
//   } catch (err) {
//     res.status(500).json({ error: "Error loading filters" });
//   }
// };
const getFilterOptions = async (req, res) => {
  try {
    // ✅ Only approved internships used for filtering
    const approvedInternships = await Internship.find({ approved: true });

    // 🧠 Collect domains & companies
    const domains = [...new Set(approvedInternships.map(i => i.domain?.trim()).filter(Boolean))];
    const companies = [...new Set(approvedInternships.map(i => i.company?.trim()).filter(Boolean))];

    // 🗓️ Extract unique years from DD/MM/YY
    const uniqueYears = approvedInternships
      .map(i => i.startDate)
      .filter(Boolean)
      .map(dateStr => {
        const parts = dateStr.split("/");
        const year = parseInt(parts[2]);
        return !isNaN(year) ? year : null;
      })
      .filter((v, i, a) => v && a.indexOf(v) === i);

    // 🧩 Group types → Internship / Research Project
    const typeGroups = new Set();
    approvedInternships.forEach(i => {
      const t = (i.type || "").toLowerCase().replace(/\s+/g, "-");

      if (t.includes("internship")) typeGroups.add("Internship");
      else if (t.includes("project")) typeGroups.add("Research Project");
    });

    res.json({
      domainOptions: domains,
      companyOptions: companies,
      yearOptions: uniqueYears,
      typeOptions: Array.from(typeGroups),
    });

  } catch (err) {
    console.error("❌ Error in getFilterOptions:", err);
    res.status(500).json({ error: "Error loading filters" });
  }
};

//submit form
const createInternship = async (req, res) => {
  try {
    const files = req.files;

    const newInternship = new Internship({
      ...req.body,
      reportFile: files?.reportFile?.[0]?.path || "",
      evaluationForm: files?.evaluationForm?.[0]?.path || "",
      feedbackForm: files?.feedbackForm?.[0]?.path || "",
      ppt: files?.ppt?.[0]?.path || "",
      noc: files?.noc?.[0]?.path || "",
      offerLetter: files?.offerLetter?.[0]?.path || "",
      completionLetter: files?.completionLetter?.[0]?.path || "",
      approved: false  // ✅ by default
    });

    await newInternship.save();

    res.status(201).json({ message: "Submitted successfully!", data: newInternship });
  } catch (err) {
    console.error("Error while saving internship:", err);
    res.status(500).json({ error: "Submission failed" });
  }
};


// Get all pending
const getPendingInternships = async (req, res) => {
  try {
    const pending = await Internship.find({ approved: false,rejected: false  });
    res.status(200).json(pending);
  } catch (err) {
    res.status(500).json({ error: "Error fetching data" });
  }
};

// Approve internship
const approveInternship = async (req, res) => {
  try {
    const id = req.params.id;
    await Internship.findByIdAndUpdate(id, { approved: true });
    res.status(200).json({ message: "Approved successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Approval failed" });
  }
};

// Get all approved (for frontend card)
const getApprovedInternships = async (req, res) => {
  try {
    const approved = await Internship.find({ approved: true });
    res.status(200).json(approved);
  } catch (err) {
    res.status(500).json({ error: "Error fetching approved data" });
  }
};

const rejectInternship=async(req,res)=>{
  try {
    const rejectedSubmission = await Internship.findByIdAndUpdate(
      req.params.id,
      { rejected: true, approved: false }, // Mark as rejected, unapprove
      { new: true }
    );
    res.json(rejectedSubmission);
  } catch (error) {
    res.status(500).json({error:err.message});
  }
}

//update internship

const updateInternship = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedFields = { ...req.body };

    // Handle uploaded files
    if (req.files) {
      Object.keys(req.files).forEach((key) => {
        updatedFields[key] = req.files[key][0].path;
      });
    }

    const updatedSubmission = await Internship.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedSubmission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.status(200).json({ message: "Internship updated successfully", updatedSubmission });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const addApprovedSubmission=async (req, res) => {
  try {
    const files = req.files;

    const newInternship = new Internship({
      ...req.body,
      reportFile: files?.reportFile?.[0]?.path || "",
      evaluationForm: files?.evaluationForm?.[0]?.path || "",
      feedbackForm: files?.feedbackForm?.[0]?.path || "",
      ppt: files?.ppt?.[0]?.path || "",
      noc: files?.noc?.[0]?.path || "",
      offerLetter: files?.offerLetter?.[0]?.path || "",
      completionLetter: files?.completionLetter?.[0]?.path || "",
      // approved: false  // ✅ by default
    });

    await newInternship.save();

    res.status(201).json({ message: "Submitted successfully!", data: newInternship });
  } catch (err) {
    console.error("Error while saving internship:", err);
    res.status(500).json({ error: "Submission failed" });
  }
};

const deleteInternship=async (req, res) => {
  try {
    await Internship.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Submission deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// ✅ Excel Upload Controller
const uploadExcelFile = async (req, res) => {
  try {
    console.log("Uploaded File: ", req.file);

    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileBuffer = fs.readFileSync(req.file.path);
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    await Internship.insertMany(data); // ✅ Make sure `data` matches schema

    res.status(200).json({ message: "Excel data uploaded successfully!" });
  } catch (error) {
    console.error("Error uploading Excel:", error);
    res.status(500).json({ message: "Excel upload failed" });
  }
};


const getRejectedInternships = async (req, res) => {
  try {
    const rejected = await Internship.find({ rejected: true });
    res.status(200).json(rejected);
  } catch (err) {
    res.status(500).json({ error: "Error fetching rejected data" });
  }
};



module.exports = { getAllInternships,getInternshipById, getFilterOptions,createInternship ,getPendingInternships,approveInternship,getApprovedInternships,rejectInternship,updateInternship,addApprovedSubmission,deleteInternship,uploadExcelFile,getRejectedInternships};