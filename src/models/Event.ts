import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    require: true,
  },
  date: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

const Event = mongoose.models.Event || mongoose.model("Event", formSchema);

export default Event;
