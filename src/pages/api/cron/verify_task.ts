import { db } from "@/libs/db";
import { makeApiRequest } from "@/libs/helpers";
import { farcasterVerification } from "@/libs/verification/farcasterVerification";
import { gitpoapVerification } from "@/libs/verification/gitpoapVerification";
import { poapVerification } from "@/libs/verification/poapVerification";
import { NextApiRequest, NextApiResponse } from "next";





export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const tasks = await db.bingo_tasks.findMany({
        where: {
            task_status: false
        },
        orderBy: {
            last_processed: "desc"
        },
        take: 3
    })


    for (const task of tasks) {


        const task_config = await db.campaigns_tasks.findFirst({
            where: {
                campaign_task_id: task.campaign_task_id
            }
        })

        const campaign = await db.campaigns.findFirst({
            where: {
                campaign_id: task_config?.campaign_id
            }
        })

        const bingo = await db.bingo.findFirst({
            where: {
                bingo_id: task.bingo_id
            }
        })


        if (task_config && bingo) {

            const taskCompleted = async () => {
                // 1. update the task status to completed

                await db.bingo_tasks.update({
                    where: {
                        bingo_task_id: task.bingo_task_id,
                    },
                    data: {
                        task_status: true,
                        last_processed: new Date()
                    }
                })

                // 2. check for the grid points & credit the grid points to the user
                await db.bingo.update({
                    where: {
                        bingo_id: task.bingo_id
                    },
                    data: {
                        score: {
                            increment: campaign?.each_completion
                        },
                        redraw: true
                    }
                });

                // 3. check if the any bingo . and credit the score based on the bingo


                //  ! how can we check if the user has any bingo ????
            }


            const req_body = task_config.req_body ? JSON.parse(task_config.req_body) : null


            // Make sure the task validation is preconfigured

            const preconfigured = ['poap', 'gitpoap', 'farcaster'];

            if (preconfigured.includes(task_config.task_type)) {

                if (task_config.task_type === "poap") {
                    const response = await poapVerification(bingo.wallet_address);
                    if (response.length >= Number(task_config.response_value)) {
                        await taskCompleted()
                    }
                }


                if (task_config.task_type === "gitpoap") {
                    const response = await gitpoapVerification(bingo.wallet_address);
                    if (response.length >= Number(task_config.response_value)) {
                        await taskCompleted()
                    }
                }

                if (task_config.task_type === "farcaster") {
                    const response = await farcasterVerification(bingo.wallet_address);
                    if (response.length >= Number(task_config.response_value)) {
                        await taskCompleted()
                    }
                }

            }
            else {
                if (!task_config.api_url?.startsWith('https://') && !task_config.api_url?.startsWith('http://')) {
                    console.log("Invalid URL")
                    return
                }

                const response = await makeApiRequest({
                    url: task_config.api_url!,
                    method: task_config.api_method ?? "POST",
                    headers: task_config.headers,
                    body: req_body
                });


                if (task_config.response_condition == "array_length") {
                    if (task_config.response_variable) {
                        if (response.data[task_config.response_variable].length >= Number(task_config.response_value)) {
                            console.log("TASK COMPLETED!!!")
                            await taskCompleted()
                        }
                    }
                }


            }


        }
    }

    return res.status(200).json({ ok: '' });

}
