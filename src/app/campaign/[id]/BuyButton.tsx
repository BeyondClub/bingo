'use client';

import { purchaseNFT } from '@/libs/unlock';
import { Button, NumberInput } from '@mantine/core';
import { useState } from 'react';
import { toast } from 'sonner';
import { useAccount } from 'wagmi';

const BuyButton = ({ contract_address, limit }: { contract_address: string; limit?: number }) => {
	const [quantity, setQuantity] = useState(1);
	const [loading, setLoading] = useState(false);
	const { address, isConnecting, isDisconnected } = useAccount();

	const claimNFT = async () => {
		//@ts-ignore
		if (address) {
			setLoading(true);

			try {
				const purchase = await purchaseNFT({
					lock: contract_address!,
					wallet_address: address,
					mintNFTCount: quantity,
					onTransactionCompleted: async (tx_hash: string) => {
						const updateRecords = async () => {
							toast("Waiting for transaction to be mined. It'll take a few minutes.");
							setTimeout(() => updateRecords(), 10000);
						};
						updateRecords();
					},
				});
			} catch (e: { message: string }) {
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
				<NumberInput
					label="Quantity"
					value={quantity}
					onChange={(value) => setQuantity(Number(value))}
					min={1}
					max={limit}
				/>
			) : null}

			<Button
				fullWidth
				size="md"
				radius={'md'}
				className="text-center my-5 block primary_button"
				loading={loading}
				onClick={claimNFT}
			>
				Buy Now
			</Button>
		</>
	);
};

export default BuyButton;
