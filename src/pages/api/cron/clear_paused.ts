import { db } from "@/libs/db";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await db.bingo_tasks.updateMany({
        where: {},
        data: {
            paused_verification: false,
        }
    })

    return res.status(200).json({ message: 'success' });
}
