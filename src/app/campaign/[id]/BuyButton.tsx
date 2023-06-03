'use client';

import { defaultChainId } from '@/constants/chain.config';
import { Button, NumberInput } from '@mantine/core';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { toast } from 'sonner';
import { useAccount } from 'wagmi';

const BuyButton = ({
	campaign_id,
	contract_address,
	limit,
	end_date,
}: {
	campaign_id: string;
	contract_address: string;
	limit?: number;
	end_date: Date | null;
}) => {
	const [txHash, setTxHash] = useState<string | null>(null);

	const [quantity, setQuantity] = useState(1);
	const [loading, setLoading] = useState(false);
	const { address, isConnecting, isDisconnected } = useAccount();

	const claimNFT = async () => {
		// convert end date to getTime() and compare it with now time to check campaign expired

		if (end_date && new Date().getTime() > new Date(end_date).getTime()) {
			toast.error('Campaign expired');
			return;
		}
		//@ts-ignore
		if (address) {
			setLoading(true);

			try {
				const response = await fetch('/api/mint_nft', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						campaign_id: campaign_id,
						address: address,
						contract_address,
						quantity,
					}),
				});

				const data = await response.json();
				setTxHash(data.mint.events[0].transactionHash);
			} catch (e: any) {
				console.log(e);
				if (e.message.includes('user rejected transaction')) {
					toast.error('Transaction cancelled by user.');
				} else toast.error(e.message);
			}

			setLoading(false);
		} else {
			toast('Please connect your wallet first.');
		}
	};

	return (
		<>
			{limit !== 1 ? (
				<>
					<div className="text-gray-400 mt-5 text-sm">Quantity</div>
					<div className="flex my-5 space-x-5">
						<Button
							onClick={() => {
								if (quantity > 1) setQuantity(quantity - 1);
							}}
							variant="subtle"
						>
							<MinusIcon />
						</Button>
						<NumberInput
							hideControls
							className="text-center quantity_input"
							style={{
								width: '44px',
								textAlign: 'center',
								background: 'transparent !important',
								color: '#fff !important',
								border: '0px',
							}}
							value={quantity}
							onChange={(value) => setQuantity(Number(value))}
							min={1}
							max={50}
						/>
						<Button
							variant="subtle"
							onClick={() => {
								if (quantity < limit!) setQuantity(quantity + 1);
							}}
						>
							<PlusIcon />
						</Button>
					</div>
				</>
			) : null}

			<Button
				fullWidth
				size="md"
				radius={'md'}
				className="text-center my-5 block primary_button"
				loading={loading}
				onClick={claimNFT}
			>
				Mint NFT
			</Button>

			{txHash ? (
				<a
					className="text-center block"
					target="_BLANK"
					rel="noreferrer noopener"
					href={
						defaultChainId === 80001
							? 'https://mumbai.polygonscan.com/tx/' + txHash
							: 'https://polygonscan.com/tx/' + txHash
					}
				>
					View Transaction
				</a>
			) : null}
		</>
	);
};

export default BuyButton;
