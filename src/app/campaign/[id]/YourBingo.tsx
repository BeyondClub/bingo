'use client';

import { ChainConfig, defaultChainId } from '@/constants/chain.config';
import { Web3Service } from '@unlock-protocol/unlock-js';
import { useEffect, useState } from 'react';

import { useAccount } from 'wagmi';
import ListToken from './ListToken';

const YourBingo = ({ contract_address, campaign_id }: { contract_address: string; campaign_id: string }) => {
	const [tokens, setTokens] = useState([]);
	const [tokenDetails, setTokenDetails] = useState([]);
	const { address, isConnecting, isDisconnected } = useAccount();

	useEffect(() => {
		const verifyNFT = async () => {
			if (address && contract_address) {
				try {
					const web3Service = new Web3Service(ChainConfig);
					const tokenDetails =
						contract_address == null
							? []
							: await web3Service.getTokenIdForOwner(contract_address!, address!, defaultChainId);

					if (tokenDetails) {
						console.log(tokenDetails);
						//@ts-ignore
						setTokens([tokenDetails]);
					}
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

			{tokenDetails.length == 0 && <p>You don{"'"}t have any NFTs</p>}

			<div className="grid md:grid-cols-3">
				{tokenDetails.map((token) => {
					return <ListToken key={token} token={token} />;
				})}
			</div>
		</div>
	);
};

export default YourBingo;
