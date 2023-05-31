import { GraphQueryConfig } from "@/constants/graphQuery.config";
import { graphVerification } from "@/libs/verification/graphVerification";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    const theGraphConfig = GraphQueryConfig.compound_lend;

    const response = await graphVerification({
        wallet: "0xf1996154c34e3dc77b26437a102231785e9ad7fe",
        query: theGraphConfig.req_body,
        endpoint: theGraphConfig.api_url
    });

    return res.status(200).json({
        msg: "Hello World",
        response
    });

}
