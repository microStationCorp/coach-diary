import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "utils/dbConnect";
import Report from "model/reportModel";
import Coach from "model/CoachModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const method = req.method;
  const reportdata: {
    _id: string;
    reportDetails: string;
    escortingFitter: string;
  } = req.body;

  switch (method) {
    case "POST":
      {
        try {
          const newReportDATA = new Report({
            reportDetails: reportdata.reportDetails,
            escortingFitter: reportdata.escortingFitter,
            coach: reportdata._id,
          });
          const doc = await newReportDATA.save();

          const rCoach = await Coach.findOne({ _id: reportdata._id });
          rCoach.coachReport.push(newReportDATA);
          await rCoach.save();

          res.status(200).json({ success: true, doc });
        } catch (error) {
          res.status(500).json({ success: false, error });
        }
      }
      break;
    default: {
      res.status(405).json({ success: false, msg: "method is not allowed" });
    }
  }
}
