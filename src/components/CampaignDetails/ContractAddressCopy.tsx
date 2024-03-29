'use client';
import { OpenInNewWindowIcon } from '@radix-ui/react-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'sonner';

import { ChainConfig, defaultChainId } from '@/constants/chain.config';
import { shortenAddress } from '@/libs/helpers';

const ContractAddressCopy = ({
	contract_address,
	network = defaultChainId,
}: {
	contract_address: string;
	network?: number;
}) => {
	return (
		<div className="flex items-center space-x-2">
			<CopyToClipboard text={contract_address} onCopy={() => toast('Copied to clipboard')}>
				<span>{shortenAddress(contract_address!)}</span>
			</CopyToClipboard>

			<a
				href={`${ChainConfig[network as keyof typeof ChainConfig].explorer}/address/${contract_address}`}
				target="_blank"
				rel="noopener noreferrer"
			>
				<OpenInNewWindowIcon />
			</a>
		</div>
	);
};

export default ContractAddressCopy;
