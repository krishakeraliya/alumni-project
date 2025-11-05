// controllers/galleryController.js
const path = require('path');
const fs = require('fs');
const GalleryImage = require('../model/GalleryImage');

const uploadDir = process.env.UPLOAD_DIR || 'uploads';

exports.uploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const saved = await Promise.all(req.files.map(async file => {
      const url = `/uploads/${file.filename}`; // served statically by express
      const doc = new GalleryImage({
        filename: file.filename,
        url,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        uploadedBy: req.body.uploadedBy || 'admin'
      });
      return await doc.save();
    }));

    res.json({ message: 'Images uploaded', images: saved });
  } catch (err) {
    next(err);
  }
};

exports.getAllImages = async (req, res, next) => {
  try {
    // return newest first
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    res.json({ images });
  } catch (err) {
    next(err);
  }
};

exports.deleteImage = async (req, res, next) => {
  try {
    const id = req.params.id;
    const img = await GalleryImage.findById(id);

    if (!img) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // safely delete file from disk
    const filePath = path.join(process.cwd(), uploadDir, img.filename);
    try {
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
        console.log('File deleted:', filePath);
      } else {
        console.warn('File not found, skipping delete:', filePath);
      }
    } catch (fileErr) {
      console.error('Failed to delete file:', fileErr);
      // do NOT throw, proceed to DB deletion
    }

    // delete DB record using deleteOne
    await img.deleteOne(); // <<< updated from remove()
    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    console.error('Delete route error:', err);
    res.status(500).json({ message: 'Internal server error', extraDetails: err.message });
  }
};