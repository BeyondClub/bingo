'use client';

import { ChainConfig } from '@/constants/chain.config';
import { graphVerification } from '@/libs/verification/graphVerification';
import { useEffect, useState } from 'react';

const TotalMinted = ({ contract_address, network }: { contract_address: string; network: string }) => {
	const [totalMinted, setTotalMinted] = useState<null | string>('-');

	useEffect(() => {
		(async () => {
			const responseD = await graphVerification({
				extra_variables: {
					lock: contract_address,
				},
				wallet: contract_address as string,
				query: `query($wallet: String) {
		locks(
			where: {
 					address: $wallet
			}
		) {
			id
			address
			name
			totalKeys
			symbol
		}
	}`,
				endpoint: ChainConfig[Number(network) as keyof typeof ChainConfig].subgraph,
			});

			setTotalMinted(responseD.locks[0].totalKeys);
		})();
	}, []);

	return (
		<div>
			<h6 className="text-sm text-gray-600">Total Minted</h6>
			<p className="my-2  font-bold">{totalMinted}</p>
		</div>
	);
};

export default TotalMinted;
