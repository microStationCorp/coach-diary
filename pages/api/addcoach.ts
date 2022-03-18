// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Coach, { ICoachSchemaData } from "model/CoachModel";
import dbConnect from "utils/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const data: ICoachSchemaData = req.body;
  const method = req.method;
  switch (method) {
    case "POST":
      {
        try {
          const newCoach = new Coach(data);
          const doc = await newCoach.save();
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
