import { db } from "@/libs/db";
import { mintNFT } from "@/libs/infuraNFT";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { campaign_id, address } = req.body;

    const campaign = await db.campaigns.findFirst({
        where: {
            campaign_id: campaign_id
        }
    });

    const bingo = await db.bingo.findFirst({
        where: {
            campaign_id: campaign_id,
        },
        orderBy: {
            token_id: 'desc'
        }

    });

    if (campaign && bingo) {

        const tokenId = Number(bingo?.token_id) + 1;
        const nft = mintNFT(campaign?.contract_address!, address, `https://www.lfbingo.xyz/api/metadata/0xb374e37f5b003528c5165e427320af51a31c9314/${tokenId}`);


        return res.status(200).json({
            msg: "NFT Minted Successfully!",
            nft
        });
    }

    return res.status(200).json({
        msg: "Something went wrong!",
    });

}
