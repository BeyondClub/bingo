import { db } from "@/libs/db";
import { NextApiRequest, NextApiResponse } from "next";

/*
* Set webhook to track the transfer of NFTs
*
* Docs: https://docs.alchemy.com/reference/nft-activity-webhook
* https://dashboard.alchemy.com/notify
*/

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { secret } = req.query;

    const {
        event
    } = req.body;


    if (secret !== process.env.ALCHEMY_WEBHOOK_SECRET) {
        return res.status(401).json({
            status: 'unauthorized'
        });
    }

    for (const transfer of event.activity) {

        const toAddress = transfer[1].toAddress
        const contractAddress = transfer[1].contractAddress

        const campaign = await db.campaigns.findFirst({
            where: {
                contract_address: contractAddress
            }
        })

        for (const token of transfer[1].erc1155Metadata) {
            const tokenId = parseInt(token.value);
            if (campaign) {
                await db.bingo.updateMany({
                    where: {
                        campaign_id: campaign.campaign_id,
                        token_id: tokenId,
                    },
                    data: {
                        wallet_address: toAddress
                    }
                })

                if (campaign.reset_on_transfer) {

                    const bingoEntry = await db.bingo.findFirst({
                        where: {
                            campaign_id: campaign.campaign_id,
                            token_id: tokenId,
                        }
                    });

                    if (bingoEntry) {
                        await db.bingo_tasks.updateMany({
                            where: {
                                bingo_id: bingoEntry.bingo_id,
                            },
                            data: {
                                task_status: false
                            }
                        })
                    }
                }

            }
        }
    }

    return res.status(200).json({
        status: 'completed'
    });

}
