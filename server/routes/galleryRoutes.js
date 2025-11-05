// routes/galleryRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const galleryController = require('../controller/galleryController');

const uploadDir = process.env.UPLOAD_DIR || 'uploads';

// ensure upload dir exists
const fs = require('fs');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer storage config (store locally)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // unique filename: timestamp-originalname
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  // allow images only
  if (file.mimetype.startsWith('image/')) cb(null, true);
  else cb(new Error('Only image files are allowed!'), false);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

// GET /api/gallery/   -> get all images
router.get('/', galleryController.getAllImages);

// POST /api/gallery/upload  -> upload one or many images (field name 'images')
router.post('/upload', upload.array('images', 20), galleryController.uploadImages);

// DELETE /api/gallery/:id  -> delete image by id
router.delete('/:id', galleryController.deleteImage);

module.exports = router;
