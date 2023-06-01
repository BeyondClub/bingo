import { spendPoints } from "@/libs/luniverse";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { address } = req.body

    const response = await spendPoints({
        description: 'clam',
        amount: 5,
        orderIdentifier: '',
        userIdentifier: address as string,
    })

    return res.status(200).json({
        response: response,
        address,
        code: '',
        claim_url: ""
    });

}
