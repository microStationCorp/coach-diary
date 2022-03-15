import { Key } from "react";

export interface CoachData {
  coachType: string;
  coachNumber: string;
  returnDate?: string;
  acPlant?: string;
  inverter?: string;
  pump1?: string;
  pump2?: string;
  rruPP?: string;
  rruNPP?: string;
}

export interface CoachReportData {
  coachReport: ReportData[];
}

export interface ReportData {
  _id?: Key | null | undefined | string;
  date?: Date;
  reportDetails: string;
  action?: string;
  escortingFitter: string;
  maintenanceFitter?: string;
}

export interface ReportCoachData {
  coach: CoachData;
}
