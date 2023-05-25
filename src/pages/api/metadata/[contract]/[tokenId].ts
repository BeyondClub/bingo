import { db } from '@/libs/db'
import { NextApiRequest, NextApiResponse } from 'next'

const MetadataHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { contract, tokenId } = req.query


    const getCampaign = await db.campaigns.findFirst({
        where: {
            contract_address: (contract as string).toLocaleLowerCase()
        }
    })


    const getBingo = await db.bingo.findFirst({
        where: {
            campaign_id: getCampaign?.campaign_id,
            token_id: tokenId as string
        }
    })

    return res.json({
        name: getCampaign?.name,
        description: getCampaign?.description,
        image: `ipfs://${getBingo?.image}`,
        attributes: {
            score: getBingo?.score
        }
        // attributes: [
        //     {
        //         trait_type: 'Score',
        //         value: getBingo?.score
        //     }
        // ]
    });
}

export default MetadataHandler
