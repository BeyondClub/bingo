import { getTotalScore } from "@/libs/loyalty";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    const response = await getTotalScore("0xf1996154c34e3dc77b26437a102231785e9ad7fe")

    return res.status(200).json({
        msg: "Hello World",
        response
    });

}
