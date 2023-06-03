import { db } from "@/libs/db";
import { mintNFT } from "@/libs/infuraNFT";
import { campaigns_tasks } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { generateImage } from "./generate_image";

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
        const mint = await mintNFT(campaign?.contract_address!, address, `https://www.lfbingo.xyz/api/metadata/0xb374e37f5b003528c5165e427320af51a31c9314/${tokenId}`);


        console.log(mint)
        if (campaign) {

            const bingoExist = await db.bingo.count({
                where: {
                    token_id: tokenId,
                    campaign_id: campaign?.campaign_id
                }
            });


            if (bingoExist === 0) {

                const campaign_tasks: campaigns_tasks[] = await db.$queryRawUnsafe(
                    `SELECT * FROM "campaigns_tasks" WHERE campaign_id = '${campaign?.campaign_id}' ORDER BY RANDOM() LIMIT 24`,
                )


                const bingo = await db.bingo.create({
                    data: {
                        wallet_address: address.toLocaleLowerCase(),
                        token_id: tokenId,
                        score: "0",
                        image: "https://bafybeieq5dbhvehr7fzwfjayhxk4n5u3ubcx4yk6ue34qe5oxwq7qhlssq.ipfs.w3s.link/Bingo-01%203%20(1).png",
                        campaign_id: campaign?.campaign_id,
                        redraw: true
                    }
                });


                const bingoTasks = [];
                for (let index = 0; index < campaign_tasks.length; index++) {
                    const task = campaign_tasks[index];

                    bingoTasks.push({
                        bingo_id: bingo.bingo_id,
                        task_name: '',
                        grid_number: index + 1,
                        campaign_task_id: task.campaign_task_id,
                    })
                }

                await db.bingo_tasks.createMany({
                    data: bingoTasks
                });

                const response = await generateImage({ bingo });


                if (response) {

                    await db.bingo.update({
                        where: {
                            bingo_id: bingo.bingo_id
                        },
                        data: {
                            image: response
                        }
                    });

                }

            }

        }

        return res.status(200).json({
            msg: "NFT Minted Successfully!",
            mint
        });
    }

    return res.status(200).json({
        msg: "Something went wrong!",
    });

}
