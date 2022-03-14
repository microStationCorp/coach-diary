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
  date: Date;
  reportDetails: string;
  action: string;
  escortingFitter: string;
  maintenanceFitter: string;
  coach: CoachData;
}
