'use client';

import { useEffect, useState } from 'react';

import { ChainConfig } from '@/constants/chain.config';
import { graphVerification } from '@/libs/verification/graphVerification';
import { Button } from '@mantine/core';
import { toast } from 'sonner';
import { useAccount } from 'wagmi';
import ListToken from './ListToken';

const YourBingo = ({
	contract_address,
	campaign_id,
	network,
}: {
	contract_address: string;
	campaign_id: string;
	network: string;
}) => {
	const [refreshLoading, setRefreshLoading] = useState(false);

	const [loading, setLoading] = useState(false);
	const [tokens, setTokens] = useState([]);
	const [tokenDetails, setTokenDetails] = useState([]);
	const { address, isConnecting, isDisconnected } = useAccount();

	useEffect(() => {
		const verifyNFT = async () => {
			if (address && contract_address) {
				setLoading(true);
				try {
					const responseD = await graphVerification({
						extra_variables: {
							contract: contract_address,
							wallet: address,
						},
						wallet: address as string,
						query: `query($wallet: String,$contract: String) {
		keys(
			where: {
				and: [
          {
            owner: $wallet
          },
 					{ lock: $contract }
				]
			}
      orderBy: tokenId
		) {
			tokenId
    		owner
		}
	}`,
						endpoint: ChainConfig[Number(network) as keyof typeof ChainConfig].subgraph,
					});

					const tokenIds = responseD.keys.map((key: { tokenId: string }) => key.tokenId);

					setTokens(tokenIds);
					setLoading(false);
				} catch (e) {}
			}
		};
		verifyNFT();
	}, [address, contract_address]);

	useEffect(() => {
		const verifyNFT = async () => {
			const post = await fetch(`/api/get_token_details?campaign_id=${campaign_id}&tokens=${tokens.join(',')}`);
			const response = await post.json();
			if (response.tokens) setTokenDetails(response.tokens);
		};
		if (tokens.length > 0) verifyNFT();
	}, [tokens]);

	if (!address) return null;

	return (
		<div className="my-20">
			<h2 className="font-medium text-center text-3xl my-10">Your BINGOs</h2>

			{!loading && tokenDetails.length == 0 && <p>You don{"'"}t have any NFTs</p>}

			{loading && <p>Loading...</p>}

			{!loading && tokenDetails.length != 0 && (
				<>
					<Button
						loading={refreshLoading}
						onClick={async () => {
							setRefreshLoading(true);

							const response = await fetch(`/api/refresh_task`, {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify({
									address: address,
									campaign_id: campaign_id,
								}),
							});

							const data = await response.json();

							toast(data.message);

							setRefreshLoading(false);
						}}
						size="md"
						radius={'md'}
						className="text-center my-5 block primary_button"
						variant="subtle"
					>
						Refresh Bingo Grid
					</Button>
				</>
			)}

			<div className="grid md:grid-cols-3 gap-10">
				{tokenDetails.map((token) => {
					return <ListToken key={token} token={token} contract_address={contract_address} />;
				})}
			</div>
		</div>
	);
};

export default YourBingo;
