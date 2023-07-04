import { db } from "@/libs/db";
import { NextApiRequest, NextApiResponse } from "next";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { campaign_id, tokens } = req.query


    if (tokens) {

        const token = await db.bingo.findMany({
            select: {
                token_id: true,
                image: true,
                score: true,
            },
            where: {
                campaign_id: campaign_id as string,
                token_id: {
                    in: (tokens as string).split(',')
                },
            }
        })


        return res.json({
            tokens: token
        });

    }

    return res.json({
        campaign_id,
        tokens: []
    });
};

export default Handler;
