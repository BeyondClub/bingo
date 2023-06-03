import { deployContract } from "@/libs/infuraNFT";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    const response = await deployContract();

    return res.status(200).json({
        msg: "Hello World",
        response
    });

}
