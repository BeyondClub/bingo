import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    // things to do after the purchase is completed?

    // lets call from the graph api req

    // 1. Check if the tx is confirmed.
    // 2. Get the token id minted. make sure the tokenid does not exist on db along with the campaign id
    // 3. From the campaigns generate 24 tasks for user accounts
    // 4. Insert the tasks to the bingo tasks table

}
