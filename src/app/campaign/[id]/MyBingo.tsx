'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import ListToken from './ListToken';

const MyBingo = ({ contract_address, campaign_id }: { contract_address: string; campaign_id?: any }) => {
	const [loading, setLoading] = useState(false);
	const [tokens, setTokens] = useState([]);
	const [tokenDetails, setTokenDetails] = useState([]);
	const { address, isConnecting, isDisconnected } = useAccount();

	useEffect(() => {
		(async () => {
			setLoading(true);
			const response = await fetch(`/api/get_nft_transfers?address=${contract_address}`);
			const data = await response.json();

			console.log(data.response.items);
			const tokenIds = data.response.items
				.filter((transfers: any) => transfers.to.toLocaleLowerCase() === address?.toLocaleLowerCase())
				.map((key: { tokenId: string }) => key.tokenId);

			console.log(tokenIds);

			setTokens(tokenIds);

			setLoading(false);
		})();
	}, []);

	useEffect(() => {
		const verifyNFT = async () => {
			const post = await fetch(
				`/api/get_token_details?campaign_id=${campaign_id}&tokens=${tokens.join(',')}&address=${address}`
			);
			const response = await post.json();
			if (response.tokens) setTokenDetails(response.tokens);
		};
		if (tokens.length > 0) verifyNFT();
	}, [tokens]);

	return (
		<div className="my-20">
			<h2 className="font-medium text-center text-3xl my-10">Your BINGOs</h2>

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

export default MyBingo;
