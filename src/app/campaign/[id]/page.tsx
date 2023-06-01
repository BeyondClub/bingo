import { NETWORK } from '@/constants';
import { CurrencyConfig } from '@/constants/currency.config';
import { db } from '@/libs/db';
import { shortenAddress } from '@/libs/helpers';
import { campaigns } from '@prisma/client';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import BuyButton from './BuyButton';
import ContractAddressCopy from './ContractAddressCopy';
import Explore from './Explore';
import Perks from './Perks';
import YourBingo from './YourBingo';

const CloseCountdown = dynamic(() => import('./CloseCountdown'), {
	ssr: false,
});

const getCampaign = async (id: string) => {
	const campaign = await db.campaigns.findFirst({
		where: {
			campaign_id: id,
		},
	});

	const leaderboard_data = await db.bingo.findMany({
		where: {
			campaign_id: id,
		},
		orderBy: {
			score: 'desc',
		},
		take: 10,
	});

	const leaderboard = [];

	for (const l_data of leaderboard_data) {
		leaderboard.push({
			address: shortenAddress(l_data.wallet_address),
			score: String(l_data.score),
		});
	}

	return {
		campaign: campaign ? JSON.stringify(campaign) : null,
		scoreboard: leaderboard,
	};
};

const ShowDetails = ({ label, children }: { label: string; children: React.ReactNode }) => {
	return (
		<div className="flex justify-between my-2">
			<h6 className="">{label}</h6>
			<div className="text-gray-400">{children}</div>
		</div>
	);
};

const CampaignPage = async ({ params }: { params: { id: string } }) => {
	const data = await getCampaign(params.id);

	if (!data.campaign) return null;

	const campaign = JSON.parse(data.campaign) as campaigns;
	const leaderboard = data.scoreboard;

	return (
		<div>
			<section className="grid grid-cols-1 md:grid-cols-12 gap-5 my-10">
				<div className="col-span-6">
					<h2 className="font-medium text-3xl">{campaign.name}</h2>
					{/* <p className="my-2">test.eth</p> */}
					<p className="my-4 text-gray-300">{campaign.description}</p>

					<h5 className="font-medium text-xl">Open Edition (Randomly-generated)</h5>

					<div className="grid grid-cols-2 gap-5 mt-5">
						<div>
							<h6 className="text-sm text-gray-400">Price</h6>
							<p className="my-2">
								{campaign.price ? Number(campaign.price) : 'FREE'}{' '}
								{campaign.currency
									? CurrencyConfig[campaign.currency as keyof typeof CurrencyConfig]
									: null}
							</p>
						</div>
						<div>
							<h6 className="text-sm text-gray-400">Total Minted</h6>
							<p className="my-2">1000</p>
						</div>
					</div>

					{campaign.end_at ? (
						<div>
							<h6 className="text-sm text-gray-400">Closes In</h6>
							<div>
								{campaign.end_at ? <CloseCountdown layout="lite" date={campaign.end_at} /> : null}
							</div>
						</div>
					) : null}

					<BuyButton
						contract_address={campaign.contract_address!}
						limit={Number(campaign.mint_limit)}
						end_date={campaign.end_at}
					/>

					<div className="md:w-3/4">
						<h5 className="font-medium text-2xl my-2 mt-5">Bingo Detail</h5>
						<ShowDetails label="1 Bingo">{Number(campaign.each_completion)} points</ShowDetails>
						<ShowDetails label="1 Grid completion">{Number(campaign.each_completion)} points</ShowDetails>

						<h5 className="font-medium text-2xl my-2 mt-5">Contract Detail</h5>
						{/* @ts-ignore */}
						<ShowDetails label="Network">{NETWORK[campaign.network].name}</ShowDetails>
						<ShowDetails label="Contract Address">
							<ContractAddressCopy contract_address={campaign.contract_address!} />
						</ShowDetails>
						<ShowDetails label="Mint limit per address">{Number(campaign.mint_limit)}</ShowDetails>
						{/* <ShowDetails label="Secondary Royalty">10%</ShowDetails> */}
						<ShowDetails label="Campaign Duration">
							{dayjs(campaign.start_at).format('YYYY/MM/DD')} -{' '}
							{dayjs(campaign.end_at).format('YYYY/MM/DD')}
						</ShowDetails>
					</div>
				</div>
				<div className="col-span-6 grid place-items-center">
					<img src="/assets/demo.png" className="rounded-lg" style={{ maxHeight: '500px' }} alt="" />
				</div>
			</section>

			{campaign?.contract_address ? (
				<YourBingo campaign_id={campaign?.campaign_id} contract_address={campaign?.contract_address} />
			) : null}

			<Perks />

			{leaderboard.length > 0 ? (
				<div className="grid place-content-center text-center mb-20">
					<h2 className="font-medium text-3xl my-10">Leaderboard</h2>

					<table className="border-collapse table-auto w-full text-sm md:w-96">
						<thead>
							<tr>
								<th className="dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left ">
									Rank
								</th>
								<th className="dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
									Wallet Address
								</th>
								<th className="dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-right">
									Score
								</th>
							</tr>
						</thead>
						<tbody>
							{leaderboard.map((score, index) => (
								<tr key={score.address} className="hover:text-gray-100 text-slate-500">
									<td className=" border-slate-100 dark:border-slate-700 p-2 pl-8   text-left">
										#{index + 1}
									</td>
									<td className=" border-slate-100 dark:border-slate-700 p-2 pl-8   text-left">
										{score.address}
									</td>
									<td className=" border-slate-100 dark:border-slate-700 p-2 pl-8   text-right">
										{score.score}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : null}

			<Explore address={campaign.contract_address as string} />
		</div>
	);
};

export default CampaignPage;
