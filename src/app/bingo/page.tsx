import { createCanvas, loadImage } from 'canvas';

const baseX = 70;
const baseY = 140;

const xPositions = [baseX, baseX + 85, baseX + 85 * 2 + 10, baseX + 85 * 3 + 15, baseX + 85 * 4 + 20];
const yPositions = [baseY, baseY + 73, baseY + 143, baseY + 220, baseY + 295];

const imageGridData = [
	// First Row
	{
		text: '3 swap \n on uniswap',
		position: {
			x: xPositions[0],
			y: yPositions[0],
		},
	},
	{
		text: 'Hold \n 10 Poap',
		position: {
			x: xPositions[1],
			y: yPositions[0],
		},
	},
	{
		text: 'Stake with \n Lido',
		position: {
			x: xPositions[2],
			y: yPositions[0],
		},
	},
	{
		text: 'Run 1 \n Superfluid \n Stream',
		position: {
			x: xPositions[3],
			y: yPositions[0],
		},
	},
	{
		text: 'Hold \n ENS',
		position: {
			x: xPositions[4],
			y: yPositions[0],
		},
	},
	// Second Row
	{
		text: 'Lend \n 0.1 ETH \n  on Aave',
		position: {
			x: xPositions[0],
			y: yPositions[1],
		},
	},
	{
		text: 'Donate on \n Gitcoin',
		position: {
			x: xPositions[1],
			y: yPositions[1],
		},
	},
	{
		text: 'Buy 1 NFT \n on OpenSea',
		position: {
			x: xPositions[2],
			y: yPositions[1],
		},
	},
	{
		text: '3 Vote \n on Snapshot',
		position: {
			x: xPositions[3],
			y: yPositions[1],
		},
	},
	{
		text: 'Buy 1 music \n NFT on  \n Sound',
		position: {
			x: xPositions[4],
			y: yPositions[1],
		},
	},
	// Third Row
	{
		text: 'Lend \n 0.1 ETH \n  on Aave',
		position: {
			x: xPositions[0],
			y: yPositions[2],
		},
	},
	{
		text: 'Donate on \n Gitcoin',
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
		text: '3 Vote \n on Snapshot',
		position: {
			x: xPositions[3],
			y: yPositions[2],
		},
	},
	{
		text: 'Buy 1 music \n NFT on  \n Sound',
		position: {
			x: xPositions[4],
			y: yPositions[2],
		},
	},
	// Fourth Row
	{
		text: 'Lend \n 0.1 ETH \n  on Aave',
		position: {
			x: xPositions[0],
			y: yPositions[3],
		},
	},
	{
		text: 'Donate on \n Gitcoin',
		position: {
			x: xPositions[1],
			y: yPositions[3],
		},
	},
	{
		text: '1tx \n on Polygon',
		position: {
			x: xPositions[2],
			y: yPositions[3],
		},
	},
	{
		text: '3 Vote \n on Snapshot',
		position: {
			x: xPositions[3],
			y: yPositions[3],
		},
	},
	{
		text: 'Buy 1 music \n NFT on  \n Sound',
		position: {
			x: xPositions[4],
			y: yPositions[3],
		},
	},
	// Fourth Row
	{
		text: 'Lend \n 0.1 ETH \n  on Aave',
		position: {
			x: xPositions[0],
			y: yPositions[4],
		},
	},
	{
		text: 'Donate on \n Gitcoin',
		position: {
			x: xPositions[1],
			y: yPositions[4],
		},
	},
	{
		text: '1tx \n on Polygon',
		position: {
			x: xPositions[2],
			y: yPositions[4],
		},
	},
	{
		text: '3 Vote \n on Snapshot',
		position: {
			x: xPositions[3],
			y: yPositions[4],
		},
	},
	{
		text: 'Buy 1 music \n NFT on  \n Sound',
		position: {
			x: xPositions[4],
			y: yPositions[4],
		},
	},
];

const getImage = async () => {
	const canvas = createCanvas(500, 500);
	const ctx = canvas.getContext('2d');
	const image = await loadImage(
		'https://beyondclub-assets.s3.ap-northeast-1.amazonaws.com/bingo/Frame+1000002882(1).png'
	);
	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

	/*
	 *	List out bingo tasks on the image
	 */

	ctx.font = ' 14px Arial';
	ctx.fillStyle = 'black';
	ctx.textAlign = 'center';
	const lineHeight = 15;

	for (const data of imageGridData) {
		let lines = data.text.split('\n');
		let y = data.position.y;
		for (let i = 0; i < lines.length; i++) {
			ctx.fillText(lines[i], data.position.x, y);
			y += lineHeight;
		}
	}

	/*
	 *	Show Score on the bingo card
	 */

	ctx.font = 'bold 14px Arial';
	ctx.fillText('2000', 290, 95);

	/*
	 *	Check mark for the completed tasks
	 */

	const checkMark = await loadImage('https://beyondclub-assets.s3.ap-northeast-1.amazonaws.com/bingo/Group+(3).svg');

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

	for (const task of verifiedTasks) {
		ctx.drawImage(checkMark, task.x, task.y, 20, 20);
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

	generateLine({
		moveTo: { x: 50, y: 130 },
		lineTo: { x: 450, y: 460 },
	});

	generateLine({
		moveTo: { x: 450, y: 130 },
		lineTo: { x: 50, y: 460 },
	});

	// Horizontal Lines

	generateLine({
		moveTo: { x: 50, y: 145 },
		lineTo: { x: 460, y: 145 },
	});

	generateLine({
		moveTo: { x: 50, y: 220 },
		lineTo: { x: 460, y: 220 },
	});

	generateLine({
		moveTo: { x: 50, y: 290 },
		lineTo: { x: 460, y: 290 },
	});

	generateLine({
		moveTo: { x: 50, y: 370 },
		lineTo: { x: 460, y: 370 },
	});

	generateLine({
		moveTo: { x: 50, y: 445 },
		lineTo: { x: 460, y: 445 },
	});

	// Vertical Lines

	generateLine({
		moveTo: { x: 70, y: 125 },
		lineTo: { x: 70, y: 466 },
	});

	generateLine({
		moveTo: { x: 160, y: 125 },
		lineTo: { x: 160, y: 466 },
	});

	generateLine({
		moveTo: { x: 250, y: 125 },
		lineTo: { x: 250, y: 466 },
	});

	generateLine({
		moveTo: { x: 250, y: 125 },
		lineTo: { x: 250, y: 466 },
	});

	generateLine({
		moveTo: { x: 340, y: 125 },
		lineTo: { x: 340, y: 466 },
	});

	generateLine({
		moveTo: { x: 430, y: 125 },
		lineTo: { x: 430, y: 466 },
	});

	const dataUrl = canvas.toDataURL();
	const base64 = dataUrl.split(',')[1];

	// res.setHeader('Content-Type', 'image/png');
	// res.send(Buffer.from(dataUrl.split(',')[1], 'base64'));

	return `data:image/png;base64,${base64}`;
};

const Page = async () => {
	const image = await getImage();
	return <img src={image} />;
};

export default Page;
