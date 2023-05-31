import { defaultChainId } from '@/constants/chain.config';
import { db } from '@/libs/db';
import GenerateImage from './GenerateImage';
import ListTasks from './ListTasks';

const getBingo = async (params: { contract: string; tokenId: string }) => {
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

	const taskIdList = tasks.map((task) => task.campaign_task_id);

	const campaignTasks = await db.campaigns_tasks.findMany({
		where: {
			campaign_task_id: {
				in: taskIdList,
			},
		},
	});

	const taskNames = {};

	for (const c_task of campaignTasks) {
		// @ts-ignore
		taskNames[c_task.campaign_task_id] = c_task.task_type;
	}

	return { contract, tokenId, bingo, campaign, tasks, taskNames };
};

const page = async ({ params }: any) => {
	const bingo = await getBingo(params);

	return (
		<>
			<link href="https://unpkg.com/nes.css@2.3.0/css/nes.min.css" rel="stylesheet" />
			<div className="grid md:grid-cols-2 gap-5 press_start">
				<div>
					<div className="grid place-items-center">
						<img src={`https://w3s.link/ipfs/${bingo?.bingo?.image}/bingo.png`} className="rounded-md" />

						<div className="flex text-xs justify-center space-x-5">
							<a
								target="_blank"
								className="block mt-5"
								rel="noreferrer noopener"
								href={
									defaultChainId === 80001
										? `https://testnets.opensea.io/assets/mumbai/${bingo.contract}/${bingo.tokenId}`
										: `https://opensea.io/assets/matic/${bingo.contract}/${bingo.tokenId}`
								}
							>
								View On Opensea
							</a>

							<GenerateImage campaign_id={bingo.bingo?.bingo_id} />
						</div>
					</div>
					<div className="mt-5">
						<h1 className="text-3xl font-bold">{bingo?.campaign?.name}</h1>
						{bingo?.bingo?.token_id ? <p>#{Number(bingo?.bingo?.token_id)}</p> : null}
						<p>Score: {Number(bingo?.bingo?.score)}</p>
						<p className="mb-5 text-xs">Owner: {bingo?.bingo?.wallet_address}</p>
					</div>
				</div>

				<div className="text-white">
					<ListTasks tasks={bingo.tasks} taskNames={bingo.taskNames} />
				</div>
			</div>
		</>
	);
};

export default page;
