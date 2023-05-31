import { GraphQueryConfig } from "@/constants/graphQuery.config";
import { graphVerification } from "@/libs/verification/graphVerification";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const config = await GraphQueryConfig.snapshot_vote

    const response = await graphVerification({
        wallet: "0xac6eaBaF34F3eb8e753b65a4fb27D799EA183650",
        query: config.req_body,
        endpoint: config.api_url
    });

    return res.status(200).json({
        msg: "Hello World",
        response
    });

}
