// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "utils/dbConnect";
import reportModel, { IReportSchemaData } from "@/model/reportModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const data: IReportSchemaData = req.body;
  const _id = data.report_id;
  delete data._id;
  const method = req.method;
  switch (method) {
    case "POST":
      {
        try {
          const newReport = await reportModel.findOneAndUpdate(
            { _id: _id },
            data,
            {
              new: true,
            }
          );
          res.status(200).json({ success: true, newReport });
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
