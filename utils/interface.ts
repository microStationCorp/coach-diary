export interface CoachData {
  coachType: string;
  coachNumber: string;
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
