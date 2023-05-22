import { db } from '@/libs/db';

const getBingo = async (params: any) => {
	const { contract, tokenId } = params;

	const campaign = await db.campaigns.findFirst({
		where: {
			contract_address: contract,
		},
	});

	const bingo = await db.bingo.findFirst({
		where: {
			campaign_id: campaign?.campaign_id,
			token_id: tokenId,
		},
	});

	return { contract, tokenId, bingo };
};

const page = async ({ params }: any) => {
	const bingo = await getBingo(params);

	console.log(bingo);

	return (
		<div>
			<img src={`https://gateway.pinata.cloud/ipfs/${bingo?.bingo?.image}`} />
		</div>
	);
};

export default page;
