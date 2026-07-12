import mongoose from "mongoose";

const AnalysisSchema = new mongoose.Schema(
  {
    userId: String,

    title: String,

    description: String,

    isEvent: Boolean,

    eventDate: String,

    eventTime: String,

    endDate: String,

    calendarCreated: Boolean
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Analysis", AnalysisSchema);