import { getToken } from "@/libs/luniverse";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    const response = await getToken()

    return res.status(200).json({
        msg: "Hello World",
        response
    });

}
