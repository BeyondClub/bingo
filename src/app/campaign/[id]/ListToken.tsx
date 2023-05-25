const ListToken = ({ token }: { token: { token_id: string; image: string; score: string } }) => {
	return (
		<div>
			<img src={`https://gateway.pinata.cloud/ipfs/${token?.image}`} className="rounded-md h-90 mb-5" />

			<p className="font-medium">ID: #{token.token_id}</p>
			<p className="font-medium">Score: {token.score}</p>
		</div>
	);
};

export default ListToken;
