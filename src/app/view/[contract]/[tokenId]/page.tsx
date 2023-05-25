import { db } from '@/libs/db';
import ListTasks from './ListTasks';

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

	const tasks = await db.bingo_tasks.findMany({
		where: {
			bingo_id: bingo?.bingo_id,
		},
	});

	return { contract, tokenId, bingo, campaign, tasks };
};

const page = async ({ params }: any) => {
	const bingo = await getBingo(params);

	return (
		<>
			<link href="https://unpkg.com/nes.css@2.3.0/css/nes.min.css" rel="stylesheet" />
			<div className="grid md:grid-cols-2 gap-5 press_start">
				<div>
					<div className="grid place-items-center">
						<img src={`https://w3s.link/ipfs/${bingo?.bingo?.image}`} className="rounded-md" />
					</div>
					<div className="mt-5">
						<h1 className="text-3xl font-bold">{bingo?.campaign?.name}</h1>
						{bingo?.bingo?.token_id ? <p>#{Number(bingo?.bingo?.token_id)}</p> : null}
						<p>Score: {Number(bingo?.bingo?.score)}</p>
						<p className="mb-5 text-xs">Owner: {bingo?.bingo?.wallet_address}</p>
					</div>
				</div>

				<div className="text-white">
					<ListTasks tasks={bingo.tasks} />
				</div>
			</div>
		</>
	);
};

export default page;
