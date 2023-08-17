import { gridName } from '@/constants/gridName';
import pool from '@/libs/pool';
import { bingo, bingo_tasks, campaigns } from '@prisma/client';
// import { createCanvas, loadImage, registerFont } from 'canvas';
import { GlobalFonts, createCanvas, loadImage } from '@napi-rs/canvas';

import { CampaignCheckMark } from '@/constants/campaigns/images';
import { ScoreValidation } from '@/libs/bingo';
import { getPoapImage } from '@/libs/verification/poapVerification';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

const baseX = 250;
const baseY = 680;

const xPositions = [baseX + 50, baseX + 630, baseX + 630 * 2,];
const yPositions = [baseY, baseY + 620, baseY + 650 * 1.9];

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const query = `SELECT * FROM bingo  WHERE bingo_id = 'bffb6756-a6f9-41c1-a96c-6022a4340593' LIMIT 1`;
    const result = await pool.query(query);
    const bingo: bingo | null = result.rows.length > 0 ? result.rows[0] : null;


    if (!bingo) return 'not found';

    const fontPath = path.join(__dirname, '../../../../public/assets/fonts/pixel_arial_11/PIXEARG_.ttf');
    const pressPath = path.join(__dirname, '../../../../public/assets/fonts/PressStart2P-Regular.ttf');
    const ScorefontPath = path.join(__dirname, '../../../../public/assets/fonts/Karmatic Arcade.ttf');

    GlobalFonts.registerFromPath(fontPath, 'PixelFont');
    GlobalFonts.registerFromPath(pressPath, 'PixelFont2');
    GlobalFonts.registerFromPath(ScorefontPath, 'ScoreFont');


    const fonts = GlobalFonts.families.filter(i => i.family.includes('PixelFont'))



    const query_s = `SELECT * FROM bingo_tasks WHERE bingo_id = '${bingo.bingo_id}' ORDER by grid_number asc`;
    const result_s = await pool.query(query_s);
    const tasks: bingo_tasks[] = result_s.rows;


    const campaign_query = `SELECT * FROM campaigns  WHERE campaign_id = '${bingo?.campaign_id}' LIMIT 1`;
    const campaign_result = await pool.query(campaign_query);
    const campaign: campaigns | null = campaign_result.rows.length > 0 ? campaign_result.rows[0] : null;

    const updatedScore = ScoreValidation({
        eachBingo: Number(campaign?.each_bingo),
        eachCompletion: Number(campaign?.each_completion),
        tasks: tasks
    })



    const taskIds = [];

    for (const task of tasks) {
        taskIds.push(`'${task.campaign_task_id}'`);
    }

    const query_conf = `SELECT task_type,campaign_task_id,task_image,response_condition,response_value FROM campaigns_tasks WHERE campaign_task_id IN (${taskIds})`;
    const result_conf = await pool.query(query_conf);
    const task_configs = result_conf.rows;

    const task_config: any = {};

    for (const tsconfig of task_configs) {
        task_config[tsconfig.campaign_task_id] = tsconfig;
    }

    console.log(task_config)

    if (bingo) {


        const getName = async (index: number) => {
            let name = '';
            console.log("_____________________________")
            console.log(tasks[index])
            console.log("_____________________________")

            // check if the task_type contains any image url.
            return "https://i.imgur.com/kMe5YrI.png";

            if (task_config[tasks[index]?.campaign_task_id]?.task_image) {
                return task_config[tasks[index].campaign_task_id].task_image
            }

            if (!tasks[index]?.campaign_task_id) {
                return tasks[index]?.task_name ?? ''
            }


            //@ts-ignore
            if (tasks[index].campaign_task_id?.task_type === "poap_verify") {
                // lets get the poap image first

                //@ts-ignore
                const imageUrl = await getPoapImage(tasks[index].campaign_task_id?.response_value)
                console.log(imageUrl)
                return imageUrl;

            }

            //@ts-ignore

            name = gridName[task_config[`${tasks[index].campaign_task_id}`]?.task_type ?? '']?.replace(
                '[N]',
                task_config[tasks[index].campaign_task_id].response_value
            );

            if (!name) {
                //@ts-ignore
                name = gridName[
                    task_config[`${tasks[index].campaign_task_id}`]
                        ? `${task_config[`${tasks[index].campaign_task_id}`]?.task_type}_${task_config[`${tasks[index].campaign_task_id}`]?.response_condition
                        }`
                        : ''
                ]?.replace('[N]', task_config[tasks[index].campaign_task_id].response_value);
            }

            return name ?? '';
        };


        const imageGridData = [
            // First Row
            {
                text: await getName(0),
                position: {
                    x: xPositions[0],
                    y: yPositions[0],
                },
            },
            {
                text: await getName(1),
                position: {
                    x: xPositions[1],
                    y: yPositions[0],
                },
            },
            {
                text: await getName(2),
                position: {
                    x: xPositions[2],
                    y: yPositions[0],
                },
            },
            {
                text: await getName(3),
                position: {
                    x: xPositions[0],
                    y: yPositions[1],
                },
            },
            {
                text: await getName(4),
                position: {
                    x: xPositions[2],
                    y: yPositions[1],
                },
            },
            // Second Row
            {
                text: await getName(5),
                position: {
                    x: xPositions[0],
                    y: yPositions[2],
                },
            },
            {
                text: await getName(6),
                position: {
                    x: xPositions[1],
                    y: yPositions[2],
                },
            },
            {
                text: await getName(7),
                position: {
                    x: xPositions[2],
                    y: yPositions[2],
                },
            },
        ];

        const canvas = createCanvas(2048, 2488);
        const ctx = canvas.getContext('2d');
        // @ts-ignore
        // const image = await loadImage(CampaignImages[bingo.campaign_id] ?? 'https://beyondclub-assets.s3.ap-northeast-1.amazonaws.com/bingo/bingo-01_8.png');
        const image = await loadImage('https://beyondclub-assets.s3.ap-northeast-1.amazonaws.com/bingo/bingo-01_8.png');
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);




        /*
         *	List out bingo tasks on the image
         */




        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.font = 'normal 40px PixelFont';
        const lineHeight = 70;

        for (const data of imageGridData) {
            console.log(data.text)

            if (data.text !== "" && data.text.startsWith("https://")) {
                const sponser = await loadImage(data.text);
                ctx.drawImage(sponser, data.position.x - 140, data.position.y - 90, 550, 550);
            }
            else {


                let lines = data.text.replace('\\n', '\n').split('\n');

                let y = lines.length === 3 ? data.position.y - 25 : data.position.y;
                for (let i = 0; i < lines.length; i++) {
                    ctx.fillText(lines[i], data.position.x, y);
                    y += lineHeight;
                }
            }
        }

        /*
         *	Show Score on the bingo card
         */

        ctx.font = '400 54px ScoreFont';
        //@ts-ignore
        ctx.fillText(updatedScore ? String(updatedScore) : '0', 1120, 470);

        /*
         *	Check mark for the completed tasks
         */


        const checkMark = await loadImage(
            //  @ts-ignore
            CampaignCheckMark[bingo.campaign_id] ??
            'https://beyondclub-assets.s3.ap-northeast-1.amazonaws.com/bingo/Bingo+Verified+Badge-01.jpg'
        );

        const verifiedXPositions = [
            baseX + 340,
            baseX + 360 * 2.6,
            baseX + 340 * 4.6,
        ];
        const verifiedYPositions = [
            baseY - 120,
            baseY + 120 * 4.2,
            baseY + 120 * 9.3,
        ];

        const verifiedTasks = [
            {
                x: verifiedXPositions[0],
                y: verifiedYPositions[0],
            },
            {
                x: verifiedXPositions[1],
                y: verifiedYPositions[0],
            },
            {
                x: verifiedXPositions[2],
                y: verifiedYPositions[0],
            },
            {
                x: verifiedXPositions[0],
                y: verifiedYPositions[1],
            },
            {
                x: verifiedXPositions[1],
                y: verifiedYPositions[1],
            },

            {
                x: verifiedXPositions[2],
                y: verifiedYPositions[1],
            },
            {
                x: verifiedXPositions[0],
                y: verifiedYPositions[2],
            },
            {
                x: verifiedXPositions[1],
                y: verifiedYPositions[2],
            },
            {
                x: verifiedXPositions[2],
                y: verifiedYPositions[2],
            },
        ];

        for (const index in verifiedTasks) {
            const task = verifiedTasks[index];
            if (Number(index) != 4) {

                // if (tasks[index] && tasks[index].task_status)
                ctx.drawImage(checkMark, task.x, task.y, 120, 120);
            }
        }

        /*
         *	Generate Lines - Diagonal, Horizontal, Vertical for the completed tasks
         */

        const generateLine = ({ moveTo, lineTo, color = 'red ' }: any) => {
            ctx.beginPath();
            ctx.moveTo(moveTo.x, moveTo.y); // Starting point of the line
            ctx.lineTo(lineTo.x, lineTo.y); // Ending point of the line
            ctx.strokeStyle = color; // Set the color of the line to red
            ctx.lineWidth = 15; // Set the width of the line to 5 pixels
            ctx.stroke(); // Draw the line
        };

        // Diagonal

        if (
            tasks[0] &&
            tasks[8] &&
            tasks[0].task_status &&
            tasks[8].task_status
        ) {
            generateLine({
                moveTo: { x: 208, y: 657 },
                lineTo: { x: 1852, y: 2295 },
            });
        }



        if (
            tasks[2] &&
            tasks[6] &&
            tasks[2].task_status &&
            tasks[6].task_status
        ) {
            generateLine({
                moveTo: { x: 1865.65, y: 645.64 },
                lineTo: { x: 219.65, y: 2253 },
            });
        }

        // Horizontal Lines



        if (
            tasks[0] &&
            tasks[1] &&
            tasks[2] &&

            tasks[0].task_status &&
            tasks[1].task_status &&
            tasks[2].task_status

        ) {
            generateLine({
                moveTo: { x: 157, y: 850 },
                lineTo: { x: 1899, y: 850 },
            });
        }


        if (
            tasks[3] &&
            tasks[4] &&
            tasks[3].task_status &&
            tasks[5].task_status
        ) {
            generateLine({
                moveTo: { x: 157, y: 1500 },
                lineTo: { x: 1899, y: 1500 },
            });

        }



        if (
            tasks[6] &&
            tasks[7] &&
            tasks[8] &&
            tasks[6].task_status &&
            tasks[7].task_status &&
            tasks[8].task_status
        ) {
            generateLine({
                moveTo: { x: 157, y: 2080 },
                lineTo: { x: 1899, y: 2080 },
            });
        }



        // Vertical Lines



        if (
            tasks[0] &&
            tasks[3] &&
            tasks[6] &&
            tasks[0].task_status &&
            tasks[3].task_status &&
            tasks[6].task_status
        ) {
            generateLine({
                moveTo: { x: 400, y: 656 },
                lineTo: { x: 400, y: 2295 },
            });
        }



        if (
            tasks[1] &&
            tasks[7] &&
            tasks[1].task_status &&
            tasks[7].task_status
        ) {
            generateLine({
                moveTo: { x: 1015, y: 656 },
                lineTo: { x: 1015, y: 2295 },
            });
        }



        if (
            tasks[2] &&
            tasks[5] &&
            tasks[8] &&
            tasks[2].task_status &&
            tasks[5].task_status &&
            tasks[8].task_status
        ) {
            generateLine({
                moveTo: { x: 1645, y: 656 },
                lineTo: { x: 1645, y: 2295 },
            });
        }

        const dataUrl = canvas.toDataURL();
        const base64 = dataUrl.split(',')[1];

        const format = "jpeg";

        res.setHeader("content-type", `image/${format}`);
        res.send(await canvas.encode(format, 80));


    }

    return res.status(200).json({ message: 'no bingo' });
};



export default Handler;
