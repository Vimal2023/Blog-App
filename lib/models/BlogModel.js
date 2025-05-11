import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, default: "" },
  image: { type: String, required: true },
  authorImg: { type: String, default: "" },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);