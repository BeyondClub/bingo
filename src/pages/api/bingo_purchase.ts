import { db } from "@/libs/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {



    // things to do after the purchase is completed?

    // lets call from the graph api req

    // 1. Check if the tx is confirmed.
    // 2. Get the token id minted. make sure the tokenid does not exist on db along with the campaign id
    // 3. From the campaigns generate 24 tasks for user accounts
    // 4. Insert the tasks to the bingo tasks table


    // check if the tokenid exist on the db

    //


    // get the campaign from the contract address ?

    const campaign = await db.campaigns.findFirst({
        where: {
            contract_address: req.body.contract_address
        }
    });
    if (campaign) {

        // take 24 order by random
        const campaign_tasks = await db.$queryRawUnsafe(
            `SELECT * FROM "campaigns_tasks" WHERE campaign_id = '${campaign?.campaign_id}' ORDER BY RANDOM() LIMIT 24`,
        )


        // lets create a bingo record and bingo tasks record

        const bingo = await db.bingo.create({
            data: {
                wallet_address: '23',
                token_id: "1",
                score: "0",
                image: null,
                campaign_id: campaign?.campaign_id,
                redraw: true
            }
        });


        const bingoTasks = [];

        for (const [task, index] of campaign_tasks) {
            bingoTasks.push({
                bingo_id: bingo.bingo_id,
                grid_number: index + 1,
                campaign_task_id: task.campaign_task_id,
            })
        }


        // lets create the bingo tasks
        await db.bingo_tasks.createMany({
            //@ts-ignore
            data: bingoTasks
        });
    }



}
