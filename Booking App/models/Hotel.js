import mongoose from "mongoose";
const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    Max: 5,
  },
  rooms: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  photos: {
    type: { String },
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Hotel", HotelSchema);
