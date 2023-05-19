const baseX = 70;
const baseY = 140;

const xPositions = [baseX, baseX + 85, baseX + 85 * 2 + 10, baseX + 85 * 3 + 15, baseX + 85 * 4 + 20];
const yPositions = [baseY, baseY + 73, baseY + 143, baseY + 220, baseY + 295];

const getImage = async () => {
	// registerFont('./public/assets/fonts/pixel_arial_11/PIXEARG_.TTF', {
	// 	family: 'PixelFont',
	// });

	// registerFont('./public/assets/fonts/Karmatic Arcade.ttf', {
	// 	family: 'ScoreFont',
	// });

	// const bingo = await db.bingo.findFirst({
	// 	where: {
	// 		bingo_id: '44317054-0d63-45d4-ae5f-e1bd55962638',
	// 	},
	// });

	// const tasks = await db.bingo_tasks.findMany({
	// 	where: {
	// 		bingo_id: '44317054-0d63-45d4-ae5f-e1bd55962638',
	// 	},
	// 	orderBy: {
	// 		grid_number: 'asc',
	// 	},
	// });

	// const imageGridData = [
	// 	// First Row
	// 	{
	// 		text: tasks[0]?.task_name ?? '',
	// 		position: {
	// 			x: xPositions[0],
	// 			y: yPositions[0],
	// 		},
	// 	},
	// 	{
	// 		text: tasks[1]?.task_name ?? '',
	// 		position: {
	// 			x: xPositions[1],
	// 			y: yPositions[0],
	// 		},
	// 	},
	// 	{
	// 		text: 'Stake with \n Lido',
	// 		position: {
	// 			x: xPositions[2],
	// 			y: yPositions[0],
	// 		},
	// 	},
	// 	{
	// 		text: 'Run 1 \n Superfluid \n Stream',
	// 		position: {
	// 			x: xPositions[3],
	// 			y: yPositions[0],
	// 		},
	// 	},
	// 	{
	// 		text: 'Hold \n ENS',
	// 		position: {
	// 			x: xPositions[4],
	// 			y: yPositions[0],
	// 		},
	// 	},
	// 	// Second Row
	// 	{
	// 		text: 'Lend \n 0.1 ETH \n  on Aave',
	// 		position: {
	// 			x: xPositions[0],
	// 			y: yPositions[1],
	// 		},
	// 	},
	// 	{
	// 		text: 'Donate on \n Gitcoin',
	// 		position: {
	// 			x: xPositions[1],
	// 			y: yPositions[1],
	// 		},
	// 	},
	// 	{
	// 		text: 'Buy 1 NFT \n on OpenSea',
	// 		position: {
	// 			x: xPositions[2],
	// 			y: yPositions[1],
	// 		},
	// 	},
	// 	{
	// 		text: '3 Vote \n on Snapshot',
	// 		position: {
	// 			x: xPositions[3],
	// 			y: yPositions[1],
	// 		},
	// 	},
	// 	{
	// 		text: 'Buy 1 music \n NFT on  \n Sound',
	// 		position: {
	// 			x: xPositions[4],
	// 			y: yPositions[1],
	// 		},
	// 	},
	// 	// Third Row
	// 	{
	// 		text: 'Lend \n 0.1 ETH \n  on Aave',
	// 		position: {
	// 			x: xPositions[0],
	// 			y: yPositions[2],
	// 		},
	// 	},
	// 	{
	// 		text: 'Donate on \n Gitcoin',
	// 		position: {
	// 			x: xPositions[1],
	// 			y: yPositions[2],
	// 		},
	// 	},
	// 	{
	// 		text: '',
	// 		position: {
	// 			x: xPositions[2],
	// 			y: yPositions[2],
	// 		},
	// 	},
	// 	{
	// 		text: '3 Vote \n on Snapshot',
	// 		position: {
	// 			x: xPositions[3],
	// 			y: yPositions[2],
	// 		},
	// 	},
	// 	{
	// 		text: 'Buy 1 music \n NFT on  \n Sound',
	// 		position: {
	// 			x: xPositions[4],
	// 			y: yPositions[2],
	// 		},
	// 	},
	// 	// Fourth Row
	// 	{
	// 		text: 'Lend \n 0.1 ETH \n  on Aave',
	// 		position: {
	// 			x: xPositions[0],
	// 			y: yPositions[3],
	// 		},
	// 	},
	// 	{
	// 		text: 'Donate on \n Gitcoin',
	// 		position: {
	// 			x: xPositions[1],
	// 			y: yPositions[3],
	// 		},
	// 	},
	// 	{
	// 		text: '1tx \n on Polygon',
	// 		position: {
	// 			x: xPositions[2],
	// 			y: yPositions[3],
	// 		},
	// 	},
	// 	{
	// 		text: '3 Vote \n on Snapshot',
	// 		position: {
	// 			x: xPositions[3],
	// 			y: yPositions[3],
	// 		},
	// 	},
	// 	{
	// 		text: 'Buy 1 music \n NFT on  \n Sound',
	// 		position: {
	// 			x: xPositions[4],
	// 			y: yPositions[3],
	// 		},
	// 	},
	// 	// Fourth Row
	// 	{
	// 		text: 'Lend \n 0.1 ETH \n  on Aave',
	// 		position: {
	// 			x: xPositions[0],
	// 			y: yPositions[4],
	// 		},
	// 	},
	// 	{
	// 		text: 'Donate on \n Gitcoin',
	// 		position: {
	// 			x: xPositions[1],
	// 			y: yPositions[4],
	// 		},
	// 	},
	// 	{
	// 		text: '1tx \n on Polygon',
	// 		position: {
	// 			x: xPositions[2],
	// 			y: yPositions[4],
	// 		},
	// 	},
	// 	{
	// 		text: '3 Vote \n on Snapshot',
	// 		position: {
	// 			x: xPositions[3],
	// 			y: yPositions[4],
	// 		},
	// 	},
	// 	{
	// 		text: 'Buy 1 music \n NFT on  \n Sound',
	// 		position: {
	// 			x: xPositions[4],
	// 			y: yPositions[4],
	// 		},
	// 	},
	// ];

	// const canvas = createCanvas(500, 500);
	// const ctx = canvas.getContext('2d');
	// const image = await loadImage('https://beyondclub-assets.s3.ap-northeast-1.amazonaws.com/bingo/bingo-01_1.png');
	// ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

	// /*
	//  *	List out bingo tasks on the image
	//  */

	// ctx.font = '10px PixelFont';
	// ctx.fillStyle = 'black';
	// ctx.textAlign = 'center';
	// const lineHeight = 15;

	// for (const data of imageGridData) {
	// 	let lines = data.text.split('\n');
	// 	let y = data.position.y;
	// 	for (let i = 0; i < lines.length; i++) {
	// 		ctx.fillText(lines[i], data.position.x, y);
	// 		y += lineHeight;
	// 	}
	// }

	// /*
	//  *	Show Score on the bingo card
	//  */

	// ctx.font = 'bold 14px ScoreFont';
	// ctx.fillText(bingo?.score ? String(bingo?.score) : '0', 290, 95);

	// /*
	//  *	Check mark for the completed tasks
	//  */

	// const checkMark = await loadImage('https://beyondclub-assets.s3.ap-northeast-1.amazonaws.com/bingo/Group+(3).svg');

	// const verifiedXPositions = [baseX + 21, baseX + 114, baseX + 205, baseX + 295, baseX + 384];
	// const verifiedYPositions = [baseY - 30, baseY + 43, baseY + 117, baseY + 192, baseY + 266];

	// const verifiedTasks = [
	// 	{
	// 		x: verifiedXPositions[0],
	// 		y: verifiedYPositions[0],
	// 	},
	// 	{
	// 		x: verifiedXPositions[1],
	// 		y: verifiedYPositions[0],
	// 	},
	// 	{
	// 		x: verifiedXPositions[2],
	// 		y: verifiedYPositions[0],
	// 	},
	// 	{
	// 		x: verifiedXPositions[3],
	// 		y: verifiedYPositions[0],
	// 	},
	// 	{
	// 		x: verifiedXPositions[4],
	// 		y: verifiedYPositions[0],
	// 	},

	// 	{
	// 		x: verifiedXPositions[0],
	// 		y: verifiedYPositions[1],
	// 	},
	// 	{
	// 		x: verifiedXPositions[1],
	// 		y: verifiedYPositions[1],
	// 	},
	// 	{
	// 		x: verifiedXPositions[2],
	// 		y: verifiedYPositions[1],
	// 	},
	// 	{
	// 		x: verifiedXPositions[3],
	// 		y: verifiedYPositions[1],
	// 	},
	// 	{
	// 		x: verifiedXPositions[4],
	// 		y: verifiedYPositions[1],
	// 	},
	// 	{
	// 		x: verifiedXPositions[0],
	// 		y: verifiedYPositions[2],
	// 	},
	// 	{
	// 		x: verifiedXPositions[1],
	// 		y: verifiedYPositions[2],
	// 	},
	// 	{
	// 		x: verifiedXPositions[2],
	// 		y: verifiedYPositions[2],
	// 	},
	// 	{
	// 		x: verifiedXPositions[3],
	// 		y: verifiedYPositions[2],
	// 	},
	// 	{
	// 		x: verifiedXPositions[4],
	// 		y: verifiedYPositions[2],
	// 	},
	// 	{
	// 		x: verifiedXPositions[0],
	// 		y: verifiedYPositions[3],
	// 	},
	// 	{
	// 		x: verifiedXPositions[1],
	// 		y: verifiedYPositions[3],
	// 	},
	// 	{
	// 		x: verifiedXPositions[2],
	// 		y: verifiedYPositions[3],
	// 	},
	// 	{
	// 		x: verifiedXPositions[3],
	// 		y: verifiedYPositions[3],
	// 	},
	// 	{
	// 		x: verifiedXPositions[4],
	// 		y: verifiedYPositions[3],
	// 	},
	// 	{
	// 		x: verifiedXPositions[0],
	// 		y: verifiedYPositions[4],
	// 	},
	// 	{
	// 		x: verifiedXPositions[1],
	// 		y: verifiedYPositions[4],
	// 	},
	// 	{
	// 		x: verifiedXPositions[2],
	// 		y: verifiedYPositions[4],
	// 	},
	// 	{
	// 		x: verifiedXPositions[3],
	// 		y: verifiedYPositions[4],
	// 	},
	// 	{
	// 		x: verifiedXPositions[4],
	// 		y: verifiedYPositions[4],
	// 	},
	// ];

	// for (const index in verifiedTasks) {
	// 	const task = verifiedTasks[index];
	// 	if (tasks[index] && tasks[index].task_status) ctx.drawImage(checkMark, task.x, task.y, 20, 20);
	// }

	// /*
	//  *	Generate Lines - Diagonal, Horizontal, Vertical for the completed tasks
	//  */

	// const generateLine = ({ moveTo, lineTo, color = 'red ' }: any) => {
	// 	ctx.beginPath();
	// 	ctx.moveTo(moveTo.x, moveTo.y); // Starting point of the line
	// 	ctx.lineTo(lineTo.x, lineTo.y); // Ending point of the line
	// 	ctx.strokeStyle = color; // Set the color of the line to red
	// 	ctx.lineWidth = 5; // Set the width of the line to 5 pixels
	// 	ctx.stroke(); // Draw the line
	// };

	// // Diagonal

	// if (
	// 	tasks[0] &&
	// 	tasks[6] &&
	// 	// tasks[12] &&
	// 	tasks[18] &&
	// 	tasks[24] &&
	// 	tasks[0].task_status &&
	// 	tasks[6].task_status &&
	// 	// tasks[12].task_status &&
	// 	tasks[18].task_status &&
	// 	tasks[24].task_status
	// ) {
	// 	generateLine({
	// 		moveTo: { x: 50, y: 130 },
	// 		lineTo: { x: 450, y: 460 },
	// 	});
	// }

	// if (
	// 	tasks[4] &&
	// 	tasks[8] &&
	// 	// tasks[12] &&
	// 	tasks[16] &&
	// 	tasks[20] &&
	// 	tasks[4].task_status &&
	// 	tasks[8].task_status &&
	// 	// tasks[12].task_status &&
	// 	tasks[16].task_status &&
	// 	tasks[20].task_status
	// ) {
	// 	generateLine({
	// 		moveTo: { x: 450, y: 130 },
	// 		lineTo: { x: 50, y: 460 },
	// 	});
	// }

	// // Horizontal Lines

	// if (
	// 	tasks[0] &&
	// 	tasks[1] &&
	// 	tasks[2] &&
	// 	tasks[3] &&
	// 	tasks[4] &&
	// 	tasks[0].task_status &&
	// 	tasks[1].task_status &&
	// 	tasks[2].task_status &&
	// 	tasks[3].task_status &&
	// 	tasks[4].task_status
	// ) {
	// 	generateLine({
	// 		moveTo: { x: 50, y: 145 },
	// 		lineTo: { x: 460, y: 145 },
	// 	});
	// }

	// if (
	// 	tasks[5] &&
	// 	tasks[6] &&
	// 	tasks[7] &&
	// 	tasks[8] &&
	// 	tasks[9] &&
	// 	tasks[5].task_status &&
	// 	tasks[6].task_status &&
	// 	tasks[7].task_status &&
	// 	tasks[8].task_status &&
	// 	tasks[9].task_status
	// ) {
	// 	generateLine({
	// 		moveTo: { x: 50, y: 220 },
	// 		lineTo: { x: 460, y: 220 },
	// 	});
	// }

	// if (
	// 	tasks[10] &&
	// 	tasks[11] &&
	// 	// tasks[12] &&
	// 	tasks[13] &&
	// 	tasks[14] &&
	// 	tasks[10].task_status &&
	// 	tasks[11].task_status &&
	// 	// tasks[12].task_status &&
	// 	tasks[13].task_status &&
	// 	tasks[14].task_status
	// ) {
	// 	generateLine({
	// 		moveTo: { x: 50, y: 290 },
	// 		lineTo: { x: 460, y: 290 },
	// 	});
	// }

	// if (
	// 	tasks[15] &&
	// 	tasks[16] &&
	// 	tasks[17] &&
	// 	tasks[18] &&
	// 	tasks[19] &&
	// 	tasks[15].task_status &&
	// 	tasks[16].task_status &&
	// 	tasks[17].task_status &&
	// 	tasks[18].task_status &&
	// 	tasks[19].task_status
	// ) {
	// 	generateLine({
	// 		moveTo: { x: 50, y: 370 },
	// 		lineTo: { x: 460, y: 370 },
	// 	});
	// }

	// if (
	// 	tasks[20] &&
	// 	tasks[21] &&
	// 	tasks[22] &&
	// 	tasks[23] &&
	// 	tasks[24] &&
	// 	tasks[20].task_status &&
	// 	tasks[21].task_status &&
	// 	tasks[22].task_status &&
	// 	tasks[23].task_status &&
	// 	tasks[24].task_status
	// ) {
	// 	generateLine({
	// 		moveTo: { x: 50, y: 445 },
	// 		lineTo: { x: 460, y: 445 },
	// 	});
	// }

	// // Vertical Lines

	// if (
	// 	tasks[0] &&
	// 	tasks[5] &&
	// 	tasks[10] &&
	// 	tasks[15] &&
	// 	tasks[20] &&
	// 	tasks[0].task_status &&
	// 	tasks[5].task_status &&
	// 	tasks[10].task_status &&
	// 	tasks[15].task_status &&
	// 	tasks[20].task_status
	// ) {
	// 	generateLine({
	// 		moveTo: { x: 70, y: 125 },
	// 		lineTo: { x: 70, y: 466 },
	// 	});
	// }

	// if (
	// 	tasks[1] &&
	// 	tasks[6] &&
	// 	tasks[11] &&
	// 	tasks[16] &&
	// 	tasks[21] &&
	// 	tasks[1].task_status &&
	// 	tasks[6].task_status &&
	// 	tasks[11].task_status &&
	// 	tasks[16].task_status &&
	// 	tasks[21].task_status
	// ) {
	// 	generateLine({
	// 		moveTo: { x: 160, y: 125 },
	// 		lineTo: { x: 160, y: 466 },
	// 	});
	// }

	// if (
	// 	tasks[2] &&
	// 	tasks[7] &&
	// 	// tasks[12] &&
	// 	tasks[17] &&
	// 	tasks[22] &&
	// 	tasks[2].task_status &&
	// 	tasks[7].task_status &&
	// 	// tasks[12].task_status &&
	// 	tasks[17].task_status &&
	// 	tasks[22].task_status
	// ) {
	// 	generateLine({
	// 		moveTo: { x: 250, y: 125 },
	// 		lineTo: { x: 250, y: 466 },
	// 	});
	// }

	// if (
	// 	tasks[3] &&
	// 	tasks[8] &&
	// 	tasks[13] &&
	// 	tasks[18] &&
	// 	tasks[23] &&
	// 	tasks[3].task_status &&
	// 	tasks[8].task_status &&
	// 	tasks[13].task_status &&
	// 	tasks[18].task_status &&
	// 	tasks[23].task_status
	// ) {
	// 	generateLine({
	// 		moveTo: { x: 340, y: 125 },
	// 		lineTo: { x: 340, y: 466 },
	// 	});
	// }

	// if (
	// 	tasks[4] &&
	// 	tasks[9] &&
	// 	tasks[14] &&
	// 	tasks[19] &&
	// 	tasks[24] &&
	// 	tasks[4].task_status &&
	// 	tasks[9].task_status &&
	// 	tasks[14].task_status &&
	// 	tasks[19].task_status &&
	// 	tasks[24].task_status
	// ) {
	// 	generateLine({
	// 		moveTo: { x: 430, y: 125 },
	// 		lineTo: { x: 430, y: 466 },
	// 	});
	// }

	// const dataUrl = canvas.toDataURL();
	// const base64 = dataUrl.split(',')[1];

	// // res.setHeader('Content-Type', 'image/png');
	// // res.send(Buffer.from(dataUrl.split(',')[1], 'base64'));

	// return `data:image/png;base64,${base64}`;

	return null;
};

const Page = async () => {
	// lets pass some of the details to generate this image!
	const image = await getImage();
	return (
		<div className="grid place-items-center min-h-screen">
			<img src={image} className="rounded-md" />
		</div>
	);
};

export default Page;
