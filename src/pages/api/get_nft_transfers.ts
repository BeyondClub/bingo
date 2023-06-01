import { listNftTransferByContract } from "@/libs/luniverse";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { address } = req.query;

    const response = await listNftTransferByContract(address as string);

    return res.status(200).json({
        response
    });

}
