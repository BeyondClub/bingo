
import { createCanvas, loadImage } from 'canvas';
import { NextResponse } from 'next/server';
export async function GET(request: Request) {
	const canvas = createCanvas(500, 500);
	const ctx = canvas.getContext('2d');
	const image = await loadImage('https://beyondclub-assets.s3.ap-northeast-1.amazonaws.com/bingo/Frame+1000002881.png');
	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

	ctx.font = 'bold 40px Arial';
	ctx.fillStyle = 'white';
	ctx.textAlign = 'center';
	ctx.fillText('Hello, world!', canvas.width / 2, canvas.height / 2);
	const dataUrl = canvas.toDataURL();
	const base64 = dataUrl.split(',')[1];

	// res.setHeader('Content-Type', 'image/png');
	// res.send(Buffer.from(dataUrl.split(',')[1], 'base64'));


	return NextResponse.json({
		image: `data:image/png;base64,${base64}`
	})
	return `data:image/png;base64,${base64}`;
}
