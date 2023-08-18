'use client';

import { defaultChainId } from '@/constants/chain.config';
import { purchaseNFT } from '@/libs/unlock';
import { Button, NumberInput } from '@mantine/core';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { toast } from 'sonner';
import { useAccount } from 'wagmi';

const Confetti = dynamic(() => import('react-confetti'), {
	ssr: false,
});

const BuyButton = ({
	campaign_id,
	network,
	contract_address,
	limit,
	end_date,
}: {
	campaign_id: string;
	network: string;
	contract_address: string;
	limit?: number;
	end_date: Date | null;
}) => {
	const { openConnectModal } = useConnectModal();
	const [txHash, setTxHash] = useState<string | null>(null);
	const [minted, setMinted] = useState(false);

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
						setTxHash(tx_hash);
						toast('NFT Minted Successfully!');

						toast("Waiting for transaction to be mined. It'll take a few minutes.");

						const updateRecords = async () => {
							const response = await fetch(
								`/api/bingo_purchase?contract=${contract_address}&network=${network}&tx=${tx_hash}`
							);
							const response_data = await response.json();

							setTimeout(() => updateRecords(), 10000);
						};
						updateRecords();
					},
				});

				setMinted(true);
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
			<Confetti
				style={{ pointerEvents: 'none' }}
				numberOfPieces={minted ? 500 : 0}
				recycle={false}
				onConfettiComplete={(confetti) => {
					setMinted(false);
				}}
			/>

			{limit !== 1 ? (
				<>
					<div className="text-gray-600 mt-5 text-sm">Quantity</div>
					<div className="flex my-5 space-x-5">
						<Button
							color="dark"
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
								color: '#000 !important',
								border: '0px',
							}}
							value={quantity}
							onChange={(value) => setQuantity(Number(value))}
							min={1}
							max={limit == -1 ? undefined : limit}
						/>
						<Button
							variant="subtle"
							onClick={() => {
								if (limit === -1) {
									setQuantity(quantity + 1);
									return;
								}
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
				color="dark"
				className="text-center my-5 block  bg-[#000]"
				loading={loading}
				onClick={address ? claimNFT : openConnectModal}
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
