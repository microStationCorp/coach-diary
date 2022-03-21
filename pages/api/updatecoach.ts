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
  const _id = data._id;
  delete data._id;
  const method = req.method;
  switch (method) {
    case "POST":
      {
        try {
          const newCoach = await Coach.findOneAndUpdate({ _id: _id }, data, {
            new: true,
          });
          res.status(200).json({ success: true, newCoach });
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
