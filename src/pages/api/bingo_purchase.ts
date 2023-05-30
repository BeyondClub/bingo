import { db } from "@/libs/db";
import { graphVerification } from "@/libs/verification/graphVerification";
import { campaigns_tasks } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { generateImage } from "./generate_image";

const fetchData = async ({ contract }: { contract: string | string[] }) => {
    try {

        const responseD = await graphVerification({
            wallet: contract as string,
            query: `query($wallet: String) {
		keys(
			where: {
			 lock: $wallet
			}
      orderBy: tokenId
		) {
			tokenId
    	owner
		}
	}`,
            endpoint: 'https://api.thegraph.com/subgraphs/name/unlock-protocol/mumbai-v2'
        });

        console.log(responseD)

        return responseD.keys;

    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { contract } = req.query;

    if (!contract) return res.status(400).json({ message: 'Contract address is required' });

    const keys = await fetchData({ contract });

    if (!keys) return res.status(400).json({ message: 'No keys found' });

    for (const key of keys) {

        // check if the owner changed. and based on that update the task status?

        const campaign = await db.campaigns.findFirst({
            where: {
                contract_address: contract as string
            }
        });

        if (campaign) {

            const bingoExist = await db.bingo.count({
                where: {
                    token_id: key.tokenId,
                    campaign_id: campaign?.campaign_id
                }
            });


            if (bingoExist === 0) {

                const campaign_tasks: campaigns_tasks[] = await db.$queryRawUnsafe(
                    `SELECT * FROM "campaigns_tasks" WHERE campaign_id = '${campaign?.campaign_id}' ORDER BY RANDOM() LIMIT 24`,
                )


                const bingo = await db.bingo.create({
                    data: {
                        wallet_address: key.owner,
                        token_id: key.tokenId,
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
    }


    return res.status(200).json({ message: 'success' });

}
