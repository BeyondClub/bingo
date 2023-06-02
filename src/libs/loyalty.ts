import { getCode } from "@/pages/api/loyalty/claim_rewards";
import { db } from "./db";
import { getAccountBalance, updateScore } from "./luniverse";

export const getTotalScore = async (wallet_address: string) => {

    const address = wallet_address.toLocaleLowerCase();

    const getBingos = await db.bingo.aggregate({
        where: {
            wallet_address: address
        },
        _sum: {
            score: true
        }
    })

    const redeemed = await db.perks_redeemed.aggregate({
        where: {
            wallet_address: address
        },
        _sum: {
            points_redeemed: true
        }
    });

    const accountBalance = Number(getBingos._sum.score) - Number(redeemed._sum.points_redeemed);

    const getBalance = await getAccountBalance(address);
    const currentBalance = getBalance.balance.balance


    if (currentBalance !== accountBalance && currentBalance < accountBalance) {

        const scoreToUpdate = accountBalance - currentBalance;
        const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;

        await updateScore({
            orderIdentifier: getCode(10),
            userIdentifier: address,
            amount: scoreToUpdate,
            expiresIn: weekInMilliseconds,
            description: "bingo score",
        })

    }

}
