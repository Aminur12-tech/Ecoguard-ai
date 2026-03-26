import mongoose from 'mongoose';

const poiSchema = new mongoose.Schema({
  name: String,
  description: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number] // [lng, lat]
  },
  photoUrl: String,
  submitterId: mongoose.Schema.Types.ObjectId,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  votes: { type: Number, default: 0 },
  aiTags: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('POI', poiSchema);