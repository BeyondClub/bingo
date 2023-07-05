'use client';

import { ChainConfig, defaultChainId } from '@/constants/chain.config';
import { Web3Service } from '@unlock-protocol/unlock-js';
import { useEffect, useState } from 'react';

const TotalMinted = ({ contract_address }: { contract_address: string }) => {
	const [totalMinted, setTotalMinted] = useState<null | string>('-');

	useEffect(() => {
		(async () => {
			const web3Service = new Web3Service(ChainConfig);

			const keys = await web3Service.getLock(contract_address, defaultChainId);

			if (keys) {
				setTotalMinted(keys.outstandingKeys);
			}
		})();
	}, []);

	return (
		<div>
			<h6 className="text-sm text-gray-400">Total Minted</h6>
			<p className="my-2">{totalMinted}</p>
		</div>
	);
};

export default TotalMinted;
