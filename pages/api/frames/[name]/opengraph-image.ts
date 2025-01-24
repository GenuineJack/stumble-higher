import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const imagePath = path.join(process.cwd(), "public", "splash.png");
  const image = fs.readFileSync(imagePath);

  res.setHeader("Content-Type", "image/png");
  res.status(200).send(image);
}
