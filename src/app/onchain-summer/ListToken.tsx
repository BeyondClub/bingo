import { defaultChainId } from '@/constants/chain.config';

const ListToken = ({
	contract_address,
	token,
}: {
	contract_address: string;
	token: { token_id: string; image: string; score: string };
}) => {
	return (
		<a
			href={
				defaultChainId === 80001
					? `https://testnets.opensea.io/assets/mumbai/${contract_address}/${token.token_id}`
					: `https://opensea.io/assets/matic/${contract_address}/${token.token_id}`
			}
			target="_BLANK"
			rel="noreferrer noopener"
		>
			<img src={`https://w3s.link/ipfs/${token?.image}/bingo.png`} className="rounded-md h-90 mb-5" alt="" />

			<p className="font-medium">ID: #{token.token_id}</p>
			<p className="font-medium">Score: {token.score}</p>
		</a>
	);
};

export default ListToken;
