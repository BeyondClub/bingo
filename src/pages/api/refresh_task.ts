import { db } from "@/libs/db";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { address, campaign_id } = req.body;

    const bingos = await db.bingo.findMany({
        select: {
            bingo_id: true
        },
        where: {
            wallet_address: address,
            campaign_id: campaign_id
        }
    })


    await db.bingo_tasks.updateMany({
        where: {
            bingo_id: {
                in: bingos.map(bingo => bingo.bingo_id)
            }
        },
        data: {
            paused_verification: false,
        }
    })

    return res.status(200).json({ message: 'Your bingo tasks will be updated in 24hrs' });
}
