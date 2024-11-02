import mongoose, { Schema, Document } from "mongoose";

interface IVideo extends Document {
  url: string;
  title: string;
  description: string;
  // Add other fields as necessary
}

const VideoSchema: Schema = new Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  // Add other fields as necessary
});

export default mongoose.models.Video ||
  mongoose.model<IVideo>("Video", VideoSchema);
