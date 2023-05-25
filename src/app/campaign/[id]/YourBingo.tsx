'use client';

import { useEffect, useState } from 'react';

import { graphVerification } from '@/libs/verification/graphVerification';
import { useAccount } from 'wagmi';
import ListToken from './ListToken';

const YourBingo = ({ contract_address, campaign_id }: { contract_address: string; campaign_id: string }) => {
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
						endpoint: 'https://api.thegraph.com/subgraphs/name/unlock-protocol/mumbai-v2',
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
			<h2 className="font-medium text-center text-3xl my-10">Your Bingo</h2>

			{!loading && tokenDetails.length == 0 && <p>You don{"'"}t have any NFTs</p>}

			{loading && <p>Loading...</p>}

			<div className="grid md:grid-cols-3 gap-10">
				{tokenDetails.map((token) => {
					return <ListToken key={token} token={token} contract_address={contract_address} />;
				})}
			</div>
		</div>
	);
};

export default YourBingo;
