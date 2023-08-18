import { tokenBalanceVerification } from "@/libs/verification/tokenBalanceVerification";
import { NextApiRequest, NextApiResponse } from "next";


export default async function Handler(req: NextApiRequest, res: NextApiResponse) {

    const response = await tokenBalanceVerification({
        wallet: "0x568b9bfff4a3a7c7351db84ec2f4ad4ca147a1d0",
        network: 8453,
        tokenContractAddress: "0xea2a41c02fa86a4901826615f9796e603c6a4491"
    });



    res.status(200).json({ name: response?.toString() })
}
