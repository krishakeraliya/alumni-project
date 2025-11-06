const { Schema, model } = require("mongoose");

const internshipSchema = new Schema({
  enrollment: { type: String, required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  scetEmail: {type: String, required:true},
  personalEmail:{type:String,required:true},
  division: {type: String,required:true},
  type: { type: String, enum: [ 
    "summer-internship",
    "summer-project",
    "sem7-project",
    "sem8-internship",
    "sem8-project"], 
    required: true },
  domain: { type: String, required: true },
  company: { type: String },
  companyAddress: { type: String },
  mentorName: { type: String },
  mentorDesignation: { type: String },
  mentorMobile: { type: String },
  mentorEmail: { type: String },
  stipendReceived: { type: String, enum: ["","Yes", "No"], required:false,default:""},
  stipendAmount: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  reportFile: { type: String },
  evaluationForm: { type: String },
  feedbackForm: { type: String },
  ppt: { type: String },
  noc: { type: String },
  offerLetter: { type: String },
  completionLetter: { type: String },

  approved: {
  type: Boolean,
  default: false,
},
 rejected: { type: Boolean, default: false }
});

const Internship = model("Internship", internshipSchema);
module.exports = Internship;
