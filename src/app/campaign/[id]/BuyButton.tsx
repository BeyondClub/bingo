'use client';

import { purchaseNFT } from '@/libs/unlock';
import { Button, NumberInput } from '@mantine/core';
import { useState } from 'react';
import { toast } from 'sonner';
import { useAccount } from 'wagmi';

const BuyButton = ({
	contract_address,
	limit,
	end_date,
}: {
	contract_address: string;
	limit?: number;
	end_date: Date | null;
}) => {
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
				const purchase = await purchaseNFT({
					lock: contract_address!,
					wallet_address: address,
					mintNFTCount: quantity,
					onTransactionCompleted: async (tx_hash: string) => {
						toast('NFT Minted Successfully!');

						const updateRecords = async () => {
							toast("Waiting for transaction to be mined. It'll take a few minutes.");

							const response = await fetch(
								`/api/bingo_purchase?contract=${contract_address}&tx=${tx_hash}`
							);
							const response_data = await response.json();
							console.log(response_data);

							setTimeout(() => updateRecords(), 10000);
						};
						updateRecords();
					},
				});
			} catch (e: any) {
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
