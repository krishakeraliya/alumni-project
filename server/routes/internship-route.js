const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getAllInternships,
  getInternshipById,
  getFilterOptions,
} = require("../controller/internship-controller");

router.get("/internships", getAllInternships);
router.get("/internships/:id", getInternshipById);
router.get("/filters", getFilterOptions);


const {
  createInternship,
  getPendingInternships,
  approveInternship,
  getApprovedInternships,
  rejectInternship,
  updateInternship,
  addApprovedSubmission,
  deleteInternship,
  uploadExcelFile,
   getRejectedInternships,
} = require("../controller/internship-controller");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // create an `uploads` folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
// use `upload.single()` or `upload.fields()` based on your form
router.post("/submit", upload.fields([
  { name: "reportFile" },
  { name: "evaluationForm" },
  { name: "feedbackForm" },
  { name: "ppt" },
  { name: "noc" },
  { name: "offerLetter" },
  { name: "completionLetter" },
]), createInternship);

// GET pending submissions
router.get("/pending", getPendingInternships);

// PUT approve submission
router.put("/approve/:id", approveInternship);

// GET approved
router.get("/approved", getApprovedInternships);

//reject
router.patch("/reject/:id",rejectInternship)

//update

router.put(
  "/update/:id",
  upload.fields([
    { name: "reportFile" },
    { name: "evaluationForm" },
    { name: "feedbackForm" },
    { name: "ppt" },
    { name: "noc" },
    { name: "offerLetter" },
    { name: "completionLetter" },
  ]),
  updateInternship
);

//add
router.post("/addsubmission", upload.fields([
  { name: "reportFile" },
  { name: "evaluationForm" },
  { name: "feedbackForm" },
  { name: "ppt" },
  { name: "noc" },
  { name: "offerLetter" },
  { name: "completionLetter" },
]), addApprovedSubmission);

//delete
router.delete("/approved/:id",deleteInternship)

//upload files
router.post("/upload-xlsx", upload.single("file"), uploadExcelFile);

router.get("/rejected", getRejectedInternships);


module.exports = router;