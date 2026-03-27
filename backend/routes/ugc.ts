import express from 'express';
import multer from 'multer';
import { uploadImage } from '../utils/cloudinary';  // Fixed import
import POI from '../models/POI';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { name, description, lat, lng, submittedId } = req.body;

    // ✅ Fix 1: Check file exists
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    const result = await uploadImage(req.file.path);

    // ✅ Fix 2: GeoJSON format [lng, lat]
    const poi = new POI({
      name,
      description,
      location: { 
        type: 'Point', 
        coordinates: [parseFloat(lng), parseFloat(lat)]  // [lng, lat]!
      },
      photoUrl: result.secure_url,
      submittedId,
      status: 'pending',
      votes: 0,
      aiTags: []
    });
    
    await poi.save();
    res.status(201).json({
      success: true,
      poiId: poi._id,
      message: 'POI submitted! Awaiting community approval(24hr)',
      previewUrl: result.secure_url
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading image' });
  }
});

export default router;