import { ReportCoachData, ReportData } from "@/utils/interface";
import mongoose from "mongoose";
import CoachModel from "./CoachModel";

export interface IReportSchemaData extends ReportData, ReportCoachData {}


const ReportSchema: mongoose.Schema = new mongoose.Schema({
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

export default mongoose.models.Report ||
  mongoose.model<IReportSchemaData>("Report", ReportSchema);
