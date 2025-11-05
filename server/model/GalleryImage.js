// models/GalleryImage.js
const mongoose = require('mongoose');

const GalleryImageSchema = new mongoose.Schema({
  filename: { type: String, required: true }, // stored filename on server
  url: { type: String, required: true },      // public url (eg: /uploads/xxx)
  originalName: { type: String },
  mimetype: { type: String },
  size: { type: Number },
  uploadedBy: { type: String }, // optional: admin id or name
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GalleryImage', GalleryImageSchema);
