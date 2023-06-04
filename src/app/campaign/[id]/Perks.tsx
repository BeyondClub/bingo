'use client';

import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'sonner';
import { useAccount } from 'wagmi';

const PerkCard = ({
	title,
	description,
	points,
	loyalty,
}: {
	title: string;
	description: string;
	points: number;
	loyalty?: any;
}) => {
	const [claimResponse, setResponse] = useState<any>(null);
	const { address } = useAccount();
	const [opened, { open, close }] = useDisclosure(false);

	const ClaimReward = async () => {
		open();
		if (loyalty.balance.balance < points) return toast('You do not have enough points to claim this reward');
		else {
			const response = await fetch('/api/loyalty/claim_rewards', {
				method: 'POST',
				body: JSON.stringify({
					address: address,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			setResponse(response);
			console.log(response);
		}
	};

	return (
		<div>
			<Modal opened={opened} onClose={close} title={title}>
				<div>
					{claimResponse === null ? (
						<p>loading...</p>
					) : (
						<>
							<h3 className="text-xl font-medium">Perk claimed!</h3>

							<p className="text-gray-500">You have successfully claimed the perk</p>
							<div className="my-10">
								<CopyToClipboard text={claimResponse.code} onCopy={() => toast('Copied to clipboard')}>
									<span className="border-4 rounded-md text-center border-dotted p-2 my-5">
										Code:
										<span className="font-medium">
											{claimResponse.code ?? 'Polygon APAC Hackathon'}
										</span>
									</span>
								</CopyToClipboard>
							</div>
							<a
								href="https://www.medusa.express/coffee-mug"
								target="_BLANK"
								rel="noreferrer noopener"
								className="bg-gray-900 text-white  text-center rounded-md block py-3 w-full mt-5"
							>
								Go to Store
							</a>
						</>
					)}
				</div>
			</Modal>

			<img src="/assets/home/merch.png" className="rounded-md hover:rotate-2" />
			<div className="bg-[#22252a] rounded-md p-5 relative">
				<h4 className="font-medium">{title}</h4>

				<p className="text-gray-500">{description}</p>

				<p className="px-4 bg-yellow-500 rounded-md w-min font-medium text-gray-900 absolute top-[-30px] right-0">
					<p className="text-2xl m-0 p-0 leading-0 pt-2">{points}</p>

					<span className="text-xs pb-2">points</span>
				</p>

				<button onClick={ClaimReward} className="bg-[#6c8258] rounded-md block py-3 w-full mt-5">
					Redeem
				</button>
			</div>
		</div>
	);
};

const Perks = () => {
	const [data, setData] = useState<any>(null);
	const { address } = useAccount();

	useEffect(() => {
		(async () => {
			const response = await fetch(`/api/loyalty/get_points?address=${address}`);
			const data = await response.json();
			setData(data);
		})();
	}, []);

	return (
		<div className="grid place-content-center text-center mb-20">
			<h2 className="font-medium text-3xl mt-10">Perks</h2>
			{data ? (
				<div className="flex justify-center mt-5">
					<p className="mb-10">Your Points: {data.balance.balance}</p>

					<a
						className="text-gray-500 ml-5"
						href={`https://sidescan.luniverse.io/chains/1552703081928841640/accounts/${data.balance.address}`}
					>
						(view on Explorer)
					</a>
				</div>
			) : null}
			<div className="grid md:grid-cols-3 gap-5">
				<PerkCard title="Exclusive Tee" description="Free shipping Incl." points={5} loyalty={data} />
			</div>
		</div>
	);
};

export default Perks;
