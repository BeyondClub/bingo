import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const response = null;

    return res.status(200).json({
        verify: response
    });

}
