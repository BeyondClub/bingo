import { db } from "@/libs/db";
import { makeApiRequest } from "@/libs/helpers";

export default async function handler(req, res) {

    // lets get the task to verify from bingo tasks

    const tasks = await db.bingo_tasks.findMany({
        orderBy: {
            last_processed: "asc"
        },
        take: 3
    })

    for (const task of tasks) {

        // let get the task config.

        const task_config = await db.campaigns_tasks.findFirst({
            where: {
                campaign_task_id: task.campaign_task_id
            }
        })

        if (task_config) {

            const response = await makeApiRequest({
                url: task_config.api_url!,
                method: task_config.api_method ?? "POST",
                headers: task_config.headers,
                body: task_config.req_body
            });

            console.log(response);

            // if we get array . just check if there is length to validate?

            // if the response is expected then update the task status to completed


        }
    }

    return res.status(200).json({ ok: '' });

}
