import { db } from "@/libs/db";
import { tokenBalanceVerification } from "@/libs/verification/tokenBalanceVerification";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const task_config = await db.campaigns_tasks.findFirst({
        where: {
            campaign_task_id: "29cc1e78-01fc-4129-afda-943ce9ac54ef"
        }
    });

    if (!task_config) {
        return res.status(200).json({ message: 'success' });
    }

    if (String(task_config.response_condition).includes(',')) {
        const tokenAddressList = String(task_config.response_condition).split(',');

        for (const tokenAddress of tokenAddressList) {
            const response = await tokenBalanceVerification({
                wallet: "0xf1996154c34e3dc77b26437a102231785e9ad7fe",
                network: 8453,
                tokenContractAddress: tokenAddress
            });

            if (response && response >= Number(task_config.response_value)) {

                console.log("______________________________________________")
                console.log("completed")
                console.log("______________________________________________")
            }
        }



    }
    return res.status(200).json({ message: 'success' });



}
