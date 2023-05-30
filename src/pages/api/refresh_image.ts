import pool from "@/libs/pool";
import { bingo } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { generateImage } from "./generate_image";


const getImage = async ({ id }: { id: string | string[] }) => {

    const query = `SELECT * FROM bingo WHERE bingo_id='${id}'  LIMIT 1`;
    const result = await pool.query(query);
    const bingo: bingo | null = result.rows.length > 0 ? result.rows[0] : null;

    if (!bingo) return 'not found';


    const response = await generateImage({ bingo });

    return response;
};


const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({
            error: 'id is required'
        })
    }

    const image = await getImage({ id });

    return res.json({
        image,
    });
};

export default Handler;
