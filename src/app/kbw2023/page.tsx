import BuyButton from '@/components/CampaignDetails/BuyButton';
import ContractAddressCopy from '@/components/CampaignDetails/ContractAddressCopy';
import TotalMinted from '@/components/CampaignDetails/TotalMinted';
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

const CloseCountdown = dynamic(() => import('@/components/CampaignDetails/CloseCountdown'), {
	ssr: false,
});

const YourBingo = dynamic(() => import('@/components/CampaignDetails/YourBingo'), {
	ssr: false,
});

export const metadata: Metadata = {
	title: 'Korea Blockchain Week Side Event BINGO | LFBingo',
	description: 'Korea Blockchain Week Side Event BINGO',
	icons: {
		icon: '/assets/favicon_kbw.png',
	},
	twitter: {
		card: 'summary_large_image',
		site: '@beyondclub_xyz',
		title: 'Korea Blockchain Week Side Event BINGO | LFBingo',
		description: 'Korea Blockchain Week Side Event BINGO',
		images: [
			{
				url: 'https://www.lfbingo.xyz/assets/kbw/og.png',
				width: 800,
				height: 600,
			},
			{
				url: 'https://www.lfbingo.xyz/assets/kbw/og.png',
				width: 1800,
				height: 1600,
				alt: 'LFBingo',
			},
		],
	},
	openGraph: {
		url: 'https://www.lfbingo.xyz/onchain-summer',
		type: 'website',
		title: 'Korea Blockchain Week Side Event BINGO | LFBingo',
		description: 'Korea Blockchain Week Side Event BINGO',
		images: [
			{
				url: 'https://www.lfbingo.xyz/assets/kbw/og.png',
				width: 800,
				height: 600,
			},
			{
				url: 'https://www.lfbingo.xyz/assets/kbw/og.png',
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
			<div className="text-gray-400  font-bold">{children}</div>
		</div>
	);
};

const CampaignPage = async ({ params }: { params: { id: string } }) => {
	const data = await getCampaign('875580ea-de51-424f-b041-7443b7c60b37');

	if (!data.campaign) return null;

	const campaign = JSON.parse(data.campaign) as campaigns;
	const leaderboard = data.scoreboard;

	return (
		<div className="bg-[#090042] text-gray-100 rounded-2xl pt-20">
			<Head>
				<link rel="icon" href="/assets/favicon_kbw.png" />
			</Head>

			<main className="mx-auto container px-5 sm:px-6 md:px-5  space-y-5 pb-10 min-h-screen ">
				<section className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-10 md:px-5 md:pb-5">
					<div className="col-span-6">
						<h2 className="font-extrabold text-4xl">{campaign.name}</h2>
						{/* <p className="my-2">test.eth</p> */}
						<p className="my-4 text-gray-300 whitespace-pre-wrap description">
							<DescriptionLink text={campaign?.description} />
						</p>

						{campaign.random_grid ? (
							<h5 className="font-medium text-xl"> Open Edition (Randomly-generated)</h5>
						) : null}

						<div className="grid grid-cols-2 gap-5 my-5">
							<div>
								<h6 className="text-sm text-gray-300">Price</h6>
								<p className="my-2 font-bold">
									{campaign.price && Number(campaign.price) != 0 ? Number(campaign.price) : 'FREE'}{' '}
									{campaign.currency
										? CurrencyConfig[campaign.currency as keyof typeof CurrencyConfig]
										: null}
								</p>
							</div>
							<TotalMinted
								network={Number(campaign.network)}
								contract_address={campaign.contract_address!}
								className="text-gray-300"
							/>
						</div>

						{campaign.end_at ? (
							<div>
								<h6 className="text-sm text-gray-300">Closes In</h6>
								<div>
									{campaign.end_at ? <CloseCountdown layout="lite" date={campaign.end_at} /> : null}
								</div>
							</div>
						) : null}

						<BuyButton
							className="kbw_btn"
							network={String(campaign.network)}
							contract_address={campaign.contract_address!}
							limit={Number(campaign.mint_limit)}
							end_date={campaign.end_at}
							campaign_name={campaign.name}
							campaign_image={'https://lfbingo.xyz/assets/kbw/favicon.png'}
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
							src="/assets/kbw/favicon.png"
							className="rounded-lg z-50 relative"
							style={{ maxHeight: '500px' }}
							alt=""
						/>
					</div>
				</section>
			</main>

			<div>
				{campaign?.contract_address ? (
					<>
						<div className="h-12 "></div>
						<main className="mx-auto container px-5 sm:px-6 md:px-5  space-y-5 pb-10">
							<YourBingo
								campaign_id={campaign?.campaign_id}
								network={String(campaign?.network)}
								contract_address={campaign?.contract_address}
							/>
						</main>
					</>
				) : null}

				<main className="mx-auto container px-5 sm:px-6 md:px-5  space-y-5 pb-10">
					<section className="my-14">
						<div className="text-center mb-5">Quest with</div>

						<div className="grid place-items-center md:grid-cols-5 gap-5">
							<img className="h-10" src="/assets/quest/ens.png" alt="" />
							<img className="h-10" src="/assets/quest/superfluid.png" alt="" />
							<img className="" src="/assets/quest/optimism.png" alt="" />
							<img className="h-10" src="/assets/quest/polygon.png" alt="" />
							<img className="h-10" src="/assets/quest/thegraph.png" alt="" />
						</div>
					</section>

					<section>
						<h2 className="font-medium text-4xl text-center mb-2 mt-20">How it works</h2>

						<p className="text-center mb-20">Korea Blockchain Week Side Event BINGO</p>

						<div className="grid md:grid-cols-3 gap-10 mb-24">
							<div>
								<div className="grid place-items-center">
									<img src="/assets/kbw/1.png" alt="" className="rounded-md" />
								</div>
								<h2 className="text-2xl font-medium mb-2 mt-5">1. Mint BINGO NFT </h2>
								<p>Onchain activities of each grid will be randomly generated after you mint an NFT</p>
							</div>
							<div>
								<div className="grid place-items-center">
									<img src="/assets/kbw/2.png" alt="" className="rounded-md" />
								</div>
								<h2 className="text-2xl font-medium mb-2 mt-5">2. Collect side event POAP </h2>
								<p>Join each side event and collect POAPs You can refresh your bingo status anytime</p>
							</div>
							<div>
								<div className="grid place-items-center">
									<div style={{ height: '470px' }} className="grid place-items-center">
										<img src="/assets/kbw/3.png" alt="" className="" />
									</div>
								</div>
								<h2 className="text-2xl font-medium mb-2 mt-5">3. Win 100 USDC</h2>
								<p>Higher scores increase your chance to win $100 USDC! 3 winners chosen at random</p>
							</div>
						</div>
					</section>
				</main>

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
