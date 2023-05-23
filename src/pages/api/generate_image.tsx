import { gridName } from '@/constants/gridName';
import uploadImage from '@/libs/pinata';
import pool from '@/libs/pool';
import { bingo, bingo_tasks } from '@prisma/client';
import { createCanvas, loadImage, registerFont } from 'canvas';
import { NextApiRequest, NextApiResponse } from 'next';

const baseX = 70;
const baseY = 140;

const xPositions = [baseX, baseX + 85, baseX + 85 * 2 + 10, baseX + 85 * 3 + 15, baseX + 85 * 4 + 20];
const yPositions = [baseY, baseY + 73, baseY + 143, baseY + 220, baseY + 295];

const getImage = async () => {
	//
	const query = 'SELECT * FROM bingo  WHERE redraw = true LIMIT 1';
	const result = await pool.query(query);
	const bingo: bingo | null = result.rows.length > 0 ? result.rows[0] : null;

	if (!bingo) return 'not found';

	const query_s = `SELECT * FROM bingo_tasks WHERE bingo_id = '${bingo.bingo_id}' ORDER by grid_number asc`;
	const result_s = await pool.query(query_s);
	const tasks: bingo_tasks[] = result_s.rows;

	console.log(tasks);

	const taskIds = [];

	for (const task of tasks) {
		taskIds.push(`'${task.campaign_task_id}'`);
	}

	const query_conf = `SELECT task_type,campaign_task_id,response_condition,response_value FROM campaigns_tasks WHERE campaign_task_id IN (${taskIds})`;
	const result_conf = await pool.query(query_conf);
	const task_configs = result_conf.rows;

	const task_config: any = {};

	for (const tsconfig of task_configs) {
		task_config[tsconfig.campaign_task_id] = tsconfig;
	}

	if (bingo) {
		registerFont('./public/assets/fonts/pixel_arial_11/PIXEARG_.TTF', {
			family: 'PixelFont',
		});

		registerFont('./public/assets/fonts/Karmatic Arcade.ttf', {
			family: 'ScoreFont',
		});

		const getName = (index: number) => {
			let name = '';

			// return tasks[index]?.task_name ?? '';
			if (!tasks[index]?.campaign_task_id) {
				console.log(index, tasks[index]);
				return ' ';
			}

			//@ts-ignore

			name = gridName[task_config[`${tasks[index].campaign_task_id}`]?.task_type ?? '']?.replace(
				'[N]',
				task_config[tasks[index].campaign_task_id].response_value
			);

			if (!name) {
				//@ts-ignore
				return gridName[
					task_config[`${tasks[index].campaign_task_id}`]
						? `${task_config[`${tasks[index].campaign_task_id}`]?.task_type}_${
								task_config[`${tasks[index].campaign_task_id}`]?.response_condition
						  }`
						: ''
				]?.replace('[N]', task_config[tasks[index].campaign_task_id].response_value);
			}

			return name;
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

		const canvas = createCanvas(500, 500);
		const ctx = canvas.getContext('2d');
		const image = await loadImage('https://beyondclub-assets.s3.ap-northeast-1.amazonaws.com/bingo/bingo-01_1.png');
		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

		/*
		 *	List out bingo tasks on the image
		 */

		ctx.font = '10px PixelFont';
		ctx.fillStyle = 'black';
		ctx.textAlign = 'center';
		const lineHeight = 15;

		for (const data of imageGridData) {
			let lines = data.text.replace('\\n', '\n').split('\n');

			let y = data.position.y;
			for (let i = 0; i < lines.length; i++) {
				ctx.fillText(lines[i], data.position.x, y);
				y += lineHeight;
			}
		}

		/*
		 *	Show Score on the bingo card
		 */

		ctx.font = 'bold 14px ScoreFont';
		//@ts-ignore
		ctx.fillText(bingo?.score ? String(bingo?.score) : '0', 290, 95);

		/*
		 *	Check mark for the completed tasks
		 */

		const checkMark = await loadImage(
			'https://beyondclub-assets.s3.ap-northeast-1.amazonaws.com/bingo/Bingo+Verified+Badge-01.jpg'
		);

		const verifiedXPositions = [baseX + 21, baseX + 114, baseX + 205, baseX + 295, baseX + 384];
		const verifiedYPositions = [baseY - 30, baseY + 43, baseY + 117, baseY + 192, baseY + 266];

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
			if (tasks[index] && tasks[index].task_status) ctx.drawImage(checkMark, task.x, task.y, 20, 20);
		}

		/*
		 *	Generate Lines - Diagonal, Horizontal, Vertical for the completed tasks
		 */

		const generateLine = ({ moveTo, lineTo, color = 'red ' }: any) => {
			ctx.beginPath();
			ctx.moveTo(moveTo.x, moveTo.y); // Starting point of the line
			ctx.lineTo(lineTo.x, lineTo.y); // Ending point of the line
			ctx.strokeStyle = color; // Set the color of the line to red
			ctx.lineWidth = 5; // Set the width of the line to 5 pixels
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
				moveTo: { x: 50, y: 130 },
				lineTo: { x: 450, y: 460 },
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
				moveTo: { x: 450, y: 130 },
				lineTo: { x: 50, y: 460 },
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
				moveTo: { x: 50, y: 145 },
				lineTo: { x: 460, y: 145 },
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
				moveTo: { x: 50, y: 220 },
				lineTo: { x: 460, y: 220 },
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
				moveTo: { x: 50, y: 290 },
				lineTo: { x: 460, y: 290 },
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
				moveTo: { x: 50, y: 370 },
				lineTo: { x: 460, y: 370 },
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
				moveTo: { x: 50, y: 445 },
				lineTo: { x: 460, y: 445 },
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
				moveTo: { x: 70, y: 125 },
				lineTo: { x: 70, y: 466 },
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
				moveTo: { x: 160, y: 125 },
				lineTo: { x: 160, y: 466 },
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
				moveTo: { x: 250, y: 125 },
				lineTo: { x: 250, y: 466 },
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
				moveTo: { x: 340, y: 125 },
				lineTo: { x: 340, y: 466 },
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
				moveTo: { x: 430, y: 125 },
				lineTo: { x: 430, y: 466 },
			});
		}

		const dataUrl = canvas.toDataURL();
		const base64 = dataUrl.split(',')[1];

		const hash = await uploadImage(`data:image/png;base64,${base64}`);

		const updateQuery = `UPDATE bingo SET image='${hash}', redraw = false WHERE bingo_id = '${bingo.bingo_id}'`;
		await pool.query(updateQuery);

		return hash;
	}

	return null;
};

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const image = await getImage();

	return res.json({
		image,
	});
};

export default Handler;
