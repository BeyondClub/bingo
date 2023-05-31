import { GraphQueryConfig } from "@/constants/graphQuery.config";
import { db } from "@/libs/db";
import { makeApiRequest } from "@/libs/helpers";
import { accountValidityVerification } from "@/libs/verification/accountValidityVerification";
import { ethBalanceVerification } from "@/libs/verification/ethBalanceVerification";
import { farcasterVerification } from "@/libs/verification/farcasterVerification";
import { gitpoapVerification } from "@/libs/verification/gitpoapVerification";
import { graphVerification } from "@/libs/verification/graphVerification";
import { lensVerification } from "@/libs/verification/lensVerification";
import { nftCountVerification } from "@/libs/verification/nftcountVerification";
import { poapVerification } from "@/libs/verification/poapVerification";
import { superfluidStreams } from "@/libs/verification/superfluid";
import { tokenBalanceVerification } from "@/libs/verification/tokenBalanceVerification";
import { txHistoryVerification } from "@/libs/verification/txHistoryVerification";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const tasks = await db.bingo_tasks.findMany({
        where: {
            task_status: false,
            paused_verification: false
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
            let completed = false;
            const taskCompleted = async () => {
                // 1. update the task status to completed

                completed = true;

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

            const preconfigured = ['poap', 'gitpoap', 'nft_count', 'farcaster', 'lens', 'eth_balance', 'token_balance', 'tx_history', 'ens', 'uniswap_liquidity', 'account_created'];

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


                if (task_config.task_type === "account_created") {
                    const response = await accountValidityVerification({
                        wallet: bingo.wallet_address
                    });
                    if (Number(response) >= Number(task_config.response_value)) {
                        await taskCompleted()
                    }
                }

                if (task_config.task_type === "superfluid_stream") {
                    const response = await superfluidStreams(bingo.wallet_address, task_config.response_condition ? Number(task_config.response_condition) : 137);
                    if (response.length >= Number(task_config.response_value)) {
                        await taskCompleted()
                    }
                }


                if (task_config.task_type === "ens") {
                    const response = await tokenBalanceVerification({
                        wallet: bingo.wallet_address,
                        tokenContractAddress: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85"
                    });

                    if (response && response >= Number(task_config.response_value)) {
                        await taskCompleted()
                    }
                }


                if (task_config.task_type === "tx_history") {
                    const response = await txHistoryVerification({
                        wallet: bingo.wallet_address,
                        network: task_config.response_condition ?? "mainnet"
                    });
                    if (Number(response) >= Number(task_config.response_value)) {
                        await taskCompleted()
                    }
                }

                if (task_config.task_type === "nft_count") {
                    const response = await nftCountVerification(bingo.wallet_address);
                    if (response.length >= Number(task_config.response_value)) {
                        await taskCompleted()
                    }
                }

                if (task_config.task_type === "lens") {
                    const response = await lensVerification(bingo.wallet_address);
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

                if (task_config.task_type === "eth_balance") {
                    const response = await ethBalanceVerification({
                        wallet: bingo.wallet_address,
                        network: task_config.response_condition ?? "mainnet"
                    });

                    if (response && response >= Number(task_config.response_value)) {
                        await taskCompleted()
                    }
                }


                if (task_config.task_type === "token_balance") {
                    const response = await tokenBalanceVerification({
                        wallet: bingo.wallet_address,
                        tokenContractAddress: task_config.response_condition ?? "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
                    });

                    if (response && response >= Number(task_config.response_value)) {
                        await taskCompleted()
                    }
                }


                if (task_config.task_type === "uniswap_liquidity") {
                    const response = await tokenBalanceVerification({
                        wallet: bingo.wallet_address,
                        tokenContractAddress: "0xc36442b4a4522e871399cd717abdd847ab11fe88"
                    });

                    if (response && response >= Number(task_config.response_value)) {
                        await taskCompleted()
                    }
                }

            }
            else {

                // Let's check if the graph is preconfigured.

                if (Object.entries(GraphQueryConfig).map(([key, value]) => key).includes(task_config.task_type)) {

                    const theGraphConfig = GraphQueryConfig[task_config.task_type as keyof typeof GraphQueryConfig];

                    const response = await graphVerification({
                        wallet: bingo.wallet_address,
                        query: theGraphConfig.req_body,
                        endpoint: theGraphConfig.api_url
                    });

                    if (response && theGraphConfig.response_condition === "array_length" && response[theGraphConfig.response_variable].length >= Number(task_config.response_value)) {
                        await taskCompleted()
                    }

                }
                else {



                    if (!task_config.api_url?.startsWith('https://') && !task_config.api_url?.startsWith('http://')) {
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
                                await taskCompleted()
                            }
                        }
                    }

                }

            }

            if (completed === false) {

                const retryNextDay = [
                    'account_created',
                    ...Object.entries(GraphQueryConfig).map(([key, value]) => key)
                ]

                await db.bingo_tasks.update({
                    where: {
                        bingo_task_id: task.bingo_task_id,
                    },
                    data: {
                        last_processed: new Date(),
                        paused_verification: retryNextDay.includes(task_config.task_type) ? true : null
                    }
                })
            }
        }
    }

    return res.status(200).json({ status: 'completed' });

}
