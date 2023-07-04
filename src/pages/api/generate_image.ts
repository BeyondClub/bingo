import { NextApiRequest, NextApiResponse } from 'next';

import { gridName } from '@/constants/gridName';
import { ScoreValidation } from '@/libs/bingo';
import pool from '@/libs/pool';
import { GlobalFonts, createCanvas, loadImage } from '@napi-rs/canvas';
import { bingo, bingo_tasks, campaigns } from '@prisma/client';


import { ipfsUpload } from '@/libs/w3storage';
import path from 'path';

const baseX = 250;
const baseY = 690;

const xPositions = [baseX + 27, baseX + 400, baseX + 400 * 1.9, baseX + 400 * 2.87, baseX + 400 * 3.8];
const yPositions = [baseY, baseY + 380, baseY + 380 * 2, baseY + 273 * 4, baseY + 273 * 5.4];


export const generateImage = async ({ bingo }: { bingo: bingo }) => {

	const query_s = `SELECT * FROM bingo_tasks WHERE bingo_id = '${bingo.bingo_id}' ORDER by grid_number asc`;
	const result_s = await pool.query(query_s);
	const tasks: bingo_tasks[] = result_s.rows;

	const taskIds = [];

	for (const task of tasks) {
		taskIds.push(`'${task.campaign_task_id}'`);
	}

	const query_conf = `SELECT task_type,campaign_task_id,response_condition,response_value FROM campaigns_tasks WHERE campaign_task_id IN (${taskIds})`;
	const result_conf = await pool.query(query_conf);
	const task_configs = result_conf.rows;

	const campaign_query = `SELECT * FROM campaigns WHERE campaign_id = '${bingo?.campaign_id}' LIMIT 1`;
	const campaign_result = await pool.query(campaign_query);
	const campaign: campaigns | null = campaign_result.rows.length > 0 ? campaign_result.rows[0] : null;

	const updatedScore = ScoreValidation({
		eachBingo: Number(campaign?.each_bingo),
		eachCompletion: Number(campaign?.each_completion),
		tasks: tasks,
	});

	const task_config: any = {};

	for (const tsconfig of task_configs) {
		task_config[tsconfig.campaign_task_id] = tsconfig;
	}

	if (bingo) {

		const fontPath = path.join(process.cwd(), 'public/assets/fonts/pixearg_.ttf');
		const pressPath = path.join(process.cwd(), 'public/assets/fonts/PressStart2P-Regular.ttf');
		const ScorefontPath = path.join(process.cwd(), 'public/assets/fonts/Karmatic Arcade.ttf');

		GlobalFonts.registerFromPath(fontPath, 'PixelFont');
		GlobalFonts.registerFromPath(pressPath, 'PixelFont2');
		GlobalFonts.registerFromPath(ScorefontPath, 'ScoreFont');


		const getName = (index: number) => {
			let name = '';

			// return tasks[index]?.task_name ?? '';
			if (!tasks[index]?.campaign_task_id) {
				return ' ';
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
				text: getName(0),
				position: {
					x: xPositions[0],
					y: yPositions[0],
				},
			},
			{
				text: getName(1),
				position: {
					x: xPositions[1],
					y: yPositions[0],
				},
			},
			{
				text: getName(2),
				position: {
					x: xPositions[2],
					y: yPositions[0],
				},
			},
			{
				text: getName(3),
				position: {
					x: xPositions[3],
					y: yPositions[0],
				},
			},
			{
				text: getName(4),
				position: {
					x: xPositions[4],
					y: yPositions[0],
				},
			},
			// Second Row
			{
				text: getName(5),
				position: {
					x: xPositions[0],
					y: yPositions[1],
				},
			},
			{
				text: getName(6),
				position: {
					x: xPositions[1],
					y: yPositions[1],
				},
			},
			{
				text: getName(7),
				position: {
					x: xPositions[2],
					y: yPositions[1],
				},
			},
			{
				text: getName(8),
				position: {
					x: xPositions[3],
					y: yPositions[1],
				},
			},
			{
				text: getName(9),
				position: {
					x: xPositions[4],
					y: yPositions[1],
				},
			},
			// Third Row
			{
				text: getName(10),
				position: {
					x: xPositions[0],
					y: yPositions[2],
				},
			},
			{
				text: getName(11),
				position: {
					x: xPositions[1],
					y: yPositions[2],
				},
			},
			{
				text: '',
				position: {
					x: xPositions[2],
					y: yPositions[2],
				},
			},
			{
				text: getName(13),
				position: {
					x: xPositions[3],
					y: yPositions[2],
				},
			},
			{
				text: getName(14),
				position: {
					x: xPositions[4],
					y: yPositions[2],
				},
			},
			// Fourth Row
			{
				text: getName(15),
				position: {
					x: xPositions[0],
					y: yPositions[3],
				},
			},
			{
				text: getName(16),
				position: {
					x: xPositions[1],
					y: yPositions[3],
				},
			},
			{
				text: getName(17),
				position: {
					x: xPositions[2],
					y: yPositions[3],
				},
			},
			{
				text: getName(18),
				position: {
					x: xPositions[3],
					y: yPositions[3],
				},
			},
			{
				text: getName(19),
				position: {
					x: xPositions[4],
					y: yPositions[3],
				},
			},
			// Fourth Row
			{
				text: getName(20),
				position: {
					x: xPositions[0],
					y: yPositions[4],
				},
			},
			{
				text: getName(21),
				position: {
					x: xPositions[1],
					y: yPositions[4],
				},
			},
			{
				text: getName(22),
				position: {
					x: xPositions[2],
					y: yPositions[4],
				},
			},
			{
				text: getName(23),
				position: {
					x: xPositions[3],
					y: yPositions[4],
				},
			},
			{
				text: getName(24),
				position: {
					x: xPositions[4],
					y: yPositions[4],
				},
			},
		];

		const canvas = createCanvas(2048, 2488);
		const ctx = canvas.getContext('2d');
		const image = await loadImage('https://beyondclub-assets.s3.ap-northeast-1.amazonaws.com/bingo/bingo-01_1.png');
		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

		/*
		 *	List out bingo tasks on the image
		 */

		ctx.font = 'normal 40px PixelFont';
		ctx.fillStyle = 'black';
		ctx.textAlign = 'center';
		const lineHeight = 70;

		for (const data of imageGridData) {
			let lines = data.text.replace('\\n', '\n').split('\n');

			let y = lines.length === 3 ? data.position.y - 25 : data.position.y;

			for (let i = 0; i < lines.length; i++) {
				ctx.fillText(lines[i], data.position.x, y);
				y += lineHeight;
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
			'https://beyondclub-assets.s3.ap-northeast-1.amazonaws.com/bingo/Bingo+Verified+Badge-01.jpg'
		);

		const verifiedXPositions = [
			baseX + 121,
			baseX + 121 * 4.1,
			baseX + 121 * 7.2,
			baseX + 121 * 10.3,
			baseX + 121 * 13.3,
		];
		const verifiedYPositions = [
			baseY - 130,
			baseY + 130 * 1.8,
			baseY + 130 * 4.7,
			baseY + 130 * 7.5,
			baseY + 130 * 11,
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
				x: verifiedXPositions[3],
				y: verifiedYPositions[0],
			},
			{
				x: verifiedXPositions[4],
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
				x: verifiedXPositions[3],
				y: verifiedYPositions[1],
			},
			{
				x: verifiedXPositions[4],
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
			{
				x: verifiedXPositions[3],
				y: verifiedYPositions[2],
			},
			{
				x: verifiedXPositions[4],
				y: verifiedYPositions[2],
			},
			{
				x: verifiedXPositions[0],
				y: verifiedYPositions[3],
			},
			{
				x: verifiedXPositions[1],
				y: verifiedYPositions[3],
			},
			{
				x: verifiedXPositions[2],
				y: verifiedYPositions[3],
			},
			{
				x: verifiedXPositions[3],
				y: verifiedYPositions[3],
			},
			{
				x: verifiedXPositions[4],
				y: verifiedYPositions[3],
			},
			{
				x: verifiedXPositions[0],
				y: verifiedYPositions[4],
			},
			{
				x: verifiedXPositions[1],
				y: verifiedYPositions[4],
			},
			{
				x: verifiedXPositions[2],
				y: verifiedYPositions[4],
			},
			{
				x: verifiedXPositions[3],
				y: verifiedYPositions[4],
			},
			{
				x: verifiedXPositions[4],
				y: verifiedYPositions[4],
			},
		];

		for (const index in verifiedTasks) {
			const task = verifiedTasks[index];
			if (tasks[index] && tasks[index].task_status) ctx.drawImage(checkMark, task.x, task.y, 80, 80);
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
			tasks[6] &&
			// tasks[12] &&
			tasks[18] &&
			tasks[24] &&
			tasks[0].task_status &&
			tasks[6].task_status &&
			// tasks[12].task_status &&
			tasks[18].task_status &&
			tasks[24].task_status
		) {
			generateLine({
				moveTo: { x: 208, y: 657 },
				lineTo: { x: 1852, y: 2295 },
			});
		}

		if (
			tasks[4] &&
			tasks[8] &&
			// tasks[12] &&
			tasks[16] &&
			tasks[20] &&
			tasks[4].task_status &&
			tasks[8].task_status &&
			// tasks[12].task_status &&
			tasks[16].task_status &&
			tasks[20].task_status
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
			tasks[3] &&
			tasks[4] &&
			tasks[0].task_status &&
			tasks[1].task_status &&
			tasks[2].task_status &&
			tasks[3].task_status &&
			tasks[4].task_status
		) {
			generateLine({
				moveTo: { x: 157, y: 728.5 },
				lineTo: { x: 1899, y: 728.5 },
			});
		}

		if (
			tasks[5] &&
			tasks[6] &&
			tasks[7] &&
			tasks[8] &&
			tasks[9] &&
			tasks[5].task_status &&
			tasks[6].task_status &&
			tasks[7].task_status &&
			tasks[8].task_status &&
			tasks[9].task_status
		) {
			generateLine({
				moveTo: { x: 157, y: 1089.5 },
				lineTo: { x: 1899, y: 1089.5 },
			});
		}

		if (
			tasks[10] &&
			tasks[11] &&
			// tasks[12] &&
			tasks[13] &&
			tasks[14] &&
			tasks[10].task_status &&
			tasks[11].task_status &&
			// tasks[12].task_status &&
			tasks[13].task_status &&
			tasks[14].task_status
		) {
			generateLine({
				moveTo: { x: 157, y: 1474 },
				lineTo: { x: 1899, y: 1474 },
			});
		}

		if (
			tasks[15] &&
			tasks[16] &&
			tasks[17] &&
			tasks[18] &&
			tasks[19] &&
			tasks[15].task_status &&
			tasks[16].task_status &&
			tasks[17].task_status &&
			tasks[18].task_status &&
			tasks[19].task_status
		) {
			generateLine({
				moveTo: { x: 157, y: 1844 },
				lineTo: { x: 1899, y: 1844 },
			});
		}

		if (
			tasks[20] &&
			tasks[21] &&
			tasks[22] &&
			tasks[23] &&
			tasks[24] &&
			tasks[20].task_status &&
			tasks[21].task_status &&
			tasks[22].task_status &&
			tasks[23].task_status &&
			tasks[24].task_status
		) {
			generateLine({
				moveTo: { x: 157, y: 2213 },
				lineTo: { x: 1899, y: 2213 },
			});
		}

		// Vertical Lines

		if (
			tasks[0] &&
			tasks[5] &&
			tasks[10] &&
			tasks[15] &&
			tasks[20] &&
			tasks[0].task_status &&
			tasks[5].task_status &&
			tasks[10].task_status &&
			tasks[15].task_status &&
			tasks[20].task_status
		) {
			generateLine({
				moveTo: { x: 270, y: 656 },
				lineTo: { x: 270, y: 2295 },
			});
		}

		if (
			tasks[1] &&
			tasks[6] &&
			tasks[11] &&
			tasks[16] &&
			tasks[21] &&
			tasks[1].task_status &&
			tasks[6].task_status &&
			tasks[11].task_status &&
			tasks[16].task_status &&
			tasks[21].task_status
		) {
			generateLine({
				moveTo: { x: 654, y: 656 },
				lineTo: { x: 654, y: 2295 },
			});
		}

		if (
			tasks[2] &&
			tasks[7] &&
			// tasks[12] &&
			tasks[17] &&
			tasks[22] &&
			tasks[2].task_status &&
			tasks[7].task_status &&
			// tasks[12].task_status &&
			tasks[17].task_status &&
			tasks[22].task_status
		) {
			generateLine({
				moveTo: { x: 1015, y: 656 },
				lineTo: { x: 1015, y: 2295 },
			});
		}

		if (
			tasks[3] &&
			tasks[8] &&
			tasks[13] &&
			tasks[18] &&
			tasks[23] &&
			tasks[3].task_status &&
			tasks[8].task_status &&
			tasks[13].task_status &&
			tasks[18].task_status &&
			tasks[23].task_status
		) {
			generateLine({
				moveTo: { x: 1394, y: 656 },
				lineTo: { x: 1399, y: 2295 },
			});
		}

		if (
			tasks[4] &&
			tasks[9] &&
			tasks[14] &&
			tasks[19] &&
			tasks[24] &&
			tasks[4].task_status &&
			tasks[9].task_status &&
			tasks[14].task_status &&
			tasks[19].task_status &&
			tasks[24].task_status
		) {
			generateLine({
				moveTo: { x: 1769, y: 656 },
				lineTo: { x: 1769, y: 2295 },
			});
		}

		const dataUrl = canvas.toDataURL();
		const base64 = dataUrl.split(',')[1];

		const hash = await ipfsUpload({
			payload: `${base64}`
		})

		const updateQuery = `UPDATE bingo SET image='${hash}' , score = '${updatedScore}', redraw = false WHERE bingo_id = '${bingo.bingo_id}'`;
		await pool.query(updateQuery);


		return hash;
	}
}



const getImage = async () => {
	const query = 'SELECT * FROM bingo WHERE redraw = true LIMIT 1';
	const result = await pool.query(query);
	const bingo: bingo | null = result.rows.length > 0 ? result.rows[0] : null;

	if (!bingo) return 'not found';


	const response = await generateImage({ bingo });

	return response;
};

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const image = await getImage();

	return res.json({
		image,
	});
};

export default Handler;
