import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  suspended: {
    type: Boolean,
    require: false,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", formSchema);

export default Blog;
