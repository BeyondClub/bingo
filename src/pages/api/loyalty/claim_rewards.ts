import { db } from "@/libs/db";
import { spendPoints } from "@/libs/luniverse";
import { randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

export const getCode = (limit = 5) => {
    var letters = 'abcdefghijklmnopqrstuvwxyz';
    var result = '';

    for (var i = 0; i < limit; i++) {
        var randomIndex = Math.floor(Math.random() * letters.length);
        result += letters.charAt(randomIndex);
    }

    return result;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const address = req.body.address.toLocaleLowerCase();
    const deductPoints = 5;

    const response = await spendPoints({
        description: 'clam',
        amount: deductPoints,
        orderIdentifier: getCode(10),
        userIdentifier: address as string,
    })

    if (response) {

        const findRedeemRecords = await db.perks_redeemed.findFirst({
            where: {
                wallet_address: address
            }
        })

        if (!findRedeemRecords) {
            await db.perks_redeemed.create({
                data: {
                    wallet_address: address,
                    perk_id: randomUUID(),
                    points_redeemed: deductPoints
                }
            })
        }
        else {
            await db.perks_redeemed.update({
                where: {
                    perk_id: findRedeemRecords.perk_id
                },
                data: {
                    points_redeemed: {
                        increment: deductPoints
                    }
                }
            })
        }
    }



    return res.status(200).json({
        response: response,
        address,
        code: getCode(),
        claim_url: ""
    });

}
