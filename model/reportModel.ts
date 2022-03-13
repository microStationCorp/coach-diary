import { ReportData } from "@/utils/interface";
import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema<ReportData>({
  date: {
    type: Date,
    default: Date.now,
  },
  reportDetails: {
    type: String,
    required: true,
  },
  action: {
    type: String,
  },
  escortingFitter: {
    type: String,
    required: true,
  },
  maintenanceFitter: {
    type: String,
  },
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coach",
  },
});

export default mongoose.models.Report || mongoose.model("Report", ReportSchema);
