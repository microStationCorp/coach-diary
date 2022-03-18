import { CoachData, CoachReportData } from "@/utils/interface";
import reportModel from "model/reportModel";
import mongoose from "mongoose";

export interface ICoachSchemaData extends CoachData, CoachReportData, mongoose.Document {}

const CoachSchema: mongoose.Schema = new mongoose.Schema({
  coachNumber: {
    type: String,
    required: true,
    unique: true,
  },
  coachType: {
    type: String,
    required: true,
  },
  returnDate: String,
  acPlant: String,
  inverter: String,
  pump1: String,
  pump2: String,
  rruPP: String,
  rruNPP: String,
  coachReport: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }],
});

export default mongoose.models.Coach ||
  mongoose.model<ICoachSchemaData>("Coach", CoachSchema);
