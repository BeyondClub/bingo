import { getAccountBalance } from "@/libs/luniverse";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { address } = req.query;

    const response = await getAccountBalance(
        (address as string).toLocaleLowerCase(),
    )

    return res.status(200).json(response);

}
