import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  pages: Number,
  review: { type: String, unique: true },
  genre: String,
  rating: { type: Number, required: true },
  isInStock: { type: Boolean, default: true, required: true },
});

export const Book = mongoose.model("Book", bookSchema);
