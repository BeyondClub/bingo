import DescriptionLink from '@/components/DescriptionLink/DescriptionLink';
import { NETWORK } from '@/constants';
import { CurrencyConfig } from '@/constants/currency.config';
import { db } from '@/libs/db';
import { shortenAddress } from '@/libs/helpers';
import { campaigns } from '@prisma/client';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import BuyButton from './BuyButton';
import ContractAddressCopy from './ContractAddressCopy';
import TotalMinted from './TotalMinted';

const CloseCountdown = dynamic(() => import('./CloseCountdown'), {
	ssr: false,
});

const YourBingo = dynamic(() => import('./YourBingo'), {
	ssr: false,
});

export const metadata: Metadata = {
	title: 'Onchain Summer Bingo | LFBingo',
	description:
		'Mint and join your Onchain Summer Bingo and visualize your onchain summer activity on Base! Aim and shill your high score!',
	icons: {
		icon: '/assets/favicon_summer.png',
	},
	twitter: {
		card: 'summary_large_image',
		site: '@beyondclub_xyz',
		title: 'Onchain Summer Bingo | LFBingo',
		description:
			'Mint and join your Onchain Summer Bingo and visualize your onchain summer activity on Base! Aim and shill your high score!',
		images: [
			{
				url: 'https://www.lfbingo.xyz/assets/og_onchain.png',
				width: 800,
				height: 600,
			},
			{
				url: 'https://www.lfbingo.xyz/assets/og_onchain.png',
				width: 1800,
				height: 1600,
				alt: 'LFBingo',
			},
		],
	},
	openGraph: {
		url: 'https://www.lfbingo.xyz/onchain-summer',
		type: 'website',
		title: 'Onchain Summer Bingo | LFBingo',
		description:
			'Mint and join your Onchain Summer Bingo and visualize your onchain summer activity on Base! Aim and shill your high score!',
		images: [
			{
				url: 'https://www.lfbingo.xyz/assets/og_onchain.png',
				width: 800,
				height: 600,
			},
			{
				url: 'https://www.lfbingo.xyz/assets/og_onchain.png',
				width: 1800,
				height: 1600,
				alt: 'LFBingo',
			},
		],
	},
};

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
			<div className="text-gray-600  font-bold">{children}</div>
		</div>
	);
};

const CampaignPage = async ({ params }: { params: { id: string } }) => {
	const data = await getCampaign('c0f7c6d1-d409-42dc-8302-09e8e6f1cfc6');

	if (!data.campaign) return null;

	const campaign = JSON.parse(data.campaign) as campaigns;
	const leaderboard = data.scoreboard;

	return (
		<div className=" text-gray-900 rounded-xl">
			<Head>
				<link rel="icon" href="/assets/favicon_summer.png" />
			</Head>
			<main className="mx-auto container px-5 sm:px-6 md:px-5  space-y-5 pb-10 min-h-screen ">
				<section className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-10 md:px-5 md:pb-5">
					<div className="col-span-6">
						<h2 className="font-extrabold text-4xl">{campaign.name}</h2>
						{/* <p className="my-2">test.eth</p> */}
						<p className="my-4 text-gray-800 whitespace-pre-wrap description">
							<DescriptionLink text={campaign?.description} />
						</p>

						{campaign.random_grid ? (
							<h5 className="font-medium text-xl"> Open Edition (Randomly-generated)</h5>
						) : null}

						<div className="grid grid-cols-2 gap-5 my-5">
							<div>
								<h6 className="text-sm text-gray-600">Price</h6>
								<p className="my-2 font-bold">
									{campaign.price && Number(campaign.price) != 0 ? Number(campaign.price) : 'FREE'}{' '}
									{campaign.currency
										? CurrencyConfig[campaign.currency as keyof typeof CurrencyConfig]
										: null}
								</p>
							</div>
							<TotalMinted
								network={String(campaign.network)}
								contract_address={campaign.contract_address!}
							/>
						</div>

						{campaign.end_at ? (
							<div>
								<h6 className="text-sm text-gray-600">Closes In</h6>
								<div>
									{campaign.end_at ? <CloseCountdown layout="lite" date={campaign.end_at} /> : null}
								</div>
							</div>
						) : null}

						<BuyButton
							network={String(campaign.network)}
							campaign_id={campaign.campaign_id!}
							contract_address={campaign.contract_address!}
							limit={Number(campaign.mint_limit)}
							end_date={campaign.end_at}
							campaign_name={campaign.name}
							campaign_image={'https://lfbingo.xyz/assets/demo_onchain.png'}
						/>

						<div className="md:w-3/4">
							<h5 className="font-medium text-2xl my-2 mt-5">Bingo Detail</h5>
							<ShowDetails label="1 Bingo">{Number(campaign.each_bingo)} points</ShowDetails>
							<ShowDetails label="1 Grid completion">
								{Number(campaign.each_completion)} points
							</ShowDetails>

							<h5 className="font-medium text-2xl my-2 mt-5">Contract Detail</h5>
							{/* @ts-ignore */}
							<ShowDetails label="Network">{NETWORK[campaign.network].name}</ShowDetails>
							<ShowDetails label="Contract Address">
								<ContractAddressCopy
									network={Number(campaign.network)}
									contract_address={campaign.contract_address!}
								/>
							</ShowDetails>
							<ShowDetails label="Mint limit per address">
								{Number(campaign.mint_limit) == -1 ? 'Unlimited' : Number(campaign.mint_limit)}
							</ShowDetails>
							{/* <ShowDetails label="Secondary Royalty">10%</ShowDetails> */}
							<ShowDetails label="Campaign Duration">
								{dayjs(campaign.start_at).format('YYYY/MM/DD')} -{' '}
								{dayjs(campaign.end_at).format('YYYY/MM/DD')}
							</ShowDetails>
						</div>
					</div>
					<div className="col-span-6 items-center mx-auto">
						<img
							src="/assets/demo_onchain.png"
							className="rounded-lg"
							style={{ maxHeight: '500px' }}
							alt=""
						/>
					</div>
				</section>
			</main>

			<div>
				{campaign?.contract_address ? (
					<>
						<div className="h-12 summer_gradient"></div>
						<main className="mx-auto container px-5 sm:px-6 md:px-5  space-y-5 pb-10">
							<YourBingo
								campaign_id={campaign?.campaign_id}
								network={String(campaign?.network)}
								contract_address={campaign?.contract_address}
							/>
						</main>
					</>
				) : null}

				{leaderboard.length > 0 ? (
					<>
						<div className="grid place-content-center text-center mb-20">
							<h2 className="font-medium text-3xl my-10">Leaderboard</h2>

							<table className="border-collapse table-auto w-full text-sm md:w-96">
								<thead>
									<tr>
										<th className="dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-600 dark:text-slate-600 text-left ">
											Rank
										</th>
										<th className="dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-600 dark:text-slate-600 text-left">
											Wallet Address
										</th>
										<th className="dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-600 dark:text-slate-600 text-right">
											Score
										</th>
									</tr>
								</thead>
								<tbody>
									{leaderboard.map((score, index) => (
										<tr key={score.address} className="hover:text-gray-900 text-slate-500">
											<td className=" border-slate-100 font-bold dark:border-slate-700 p-2 pl-8   text-left">
												#{index + 1}
											</td>
											<td className=" border-slate-100 font-bold dark:border-slate-700 p-2 pl-8   text-left">
												{score.address}
											</td>
											<td className=" border-slate-100 font-bold dark:border-slate-700 p-2 pl-8   text-right">
												{score.score}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</>
				) : null}
			</div>
		</div>
	);
};

export default CampaignPage;
