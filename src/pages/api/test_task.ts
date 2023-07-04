import { db } from "@/libs/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const bingo = await db.bingo.findMany({});

    for (const bingos of bingo) {

        const tasks = await db.bingo_tasks.findFirst({
            where: {
                bingo_id: bingos.bingo_id
            },
            orderBy: {
                grid_number: 'desc'
            }
        });

        if (tasks && Number(tasks?.grid_number) == 24) {
            // lets insert the 25 task
            const taskSelect = await db.campaigns_tasks.findFirst({
                where: {
                    campaign_id: bingos.campaign_id,
                }
            });

            if (taskSelect) {

                await db.bingo_tasks.create({
                    data: {
                        bingo_id: bingos.bingo_id,
                        campaign_task_id: taskSelect.campaign_task_id,
                        grid_number: 25,
                        task_status: false,
                        paused_verification: false,
                    }
                })

            }
        }

    }


    return res.status(200).json({ message: 'success' });
}
