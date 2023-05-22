import { GraphQueryConfig } from "@/constants/graphQuery.config";
import { graphVerification } from "@/libs/verification/graphVerification";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const theGraphConfig = GraphQueryConfig.sushiswap_swap;

    const response = await graphVerification({
        wallet: "0x568b9bFfF4a3a7C7351db84EC2F4Ad4CA147A1D0",
        query: theGraphConfig.req_body,
        endpoint: theGraphConfig.api_url
    });


    return res.status(200).json({
        verify: response
    });

}
