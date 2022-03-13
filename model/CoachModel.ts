import { CoachData, CoachReportData } from "@/utils/interface";
import mongoose from "mongoose";

interface CoachSchemaData extends CoachData, CoachReportData {}

const CoachSchema = new mongoose.Schema<CoachSchemaData>({
  coachNumber: {
    type: String,
    required: true,
  },
  coachType: {
    type: String,
    required: true,
  },
  coachReport: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }],
});

export default mongoose.models.Coach || mongoose.model("Coach", CoachSchema);
