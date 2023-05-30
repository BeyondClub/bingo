import { accountValidityVerification } from "@/libs/verification/accountValidityVerification";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const txh = await accountValidityVerification({
        wallet: "0xf1996154c34e3dc77b26437a102231785e9ad7fe"
    })

    return res.status(200).json({
        txh
    });

    // const theGraphConfig = GraphQueryConfig.sushiswap_swap;

    // const response = await graphVerification({
    //     wallet: "0x568b9bFfF4a3a7C7351db84EC2F4Ad4CA147A1D0",
    //     query: theGraphConfig.req_body,
    //     endpoint: theGraphConfig.api_url
    // });


    // return res.status(200).json({
    //     verify: response
    // });

}
