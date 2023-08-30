'use client';

import { UNIVERSAL_ABI } from '@/constants/abi';
import { ChainConfig, defaultChainId } from '@/constants/chain.config';
import { purchaseNFT } from '@/libs/unlock';
import { graphVerification } from '@/libs/verification/graphVerification';
import { Button, NumberInput } from '@mantine/core';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { Web3Service } from '@unlock-protocol/unlock-js';
import { ethers } from 'ethers';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import MintSuccessModal from './MintSuccessModal';

const Confetti = dynamic(() => import('react-confetti'), {
	ssr: false,
});

const BuyButton = ({
	className,
	campaign_name,
	campaign_image,
	network,
	contract_address,
	limit,
	end_date,
	price,
}: {
	className?: string;
	campaign_name: string;
	campaign_image: string;
	network: string;
	contract_address: string;
	limit?: number;
	end_date: Date | null;
	price: string;
}) => {
	const { openChainModal } = useChainModal();

	const { openConnectModal } = useConnectModal();
	const [txHash, setTxHash] = useState<string | null>(null);
	const [minted, setMinted] = useState(false);

	const [quantity, setQuantity] = useState(1);
	const [nftHolding, setNFTHolding] = useState(0);
	const [loading, setLoading] = useState(false);
	const { address, isConnecting, isDisconnected } = useAccount();
	const { chain, chains } = useNetwork();

	const cost = ethers.BigNumber.from(ethers.utils.parseEther(price));
	const WalletArray = Array.from({ length: quantity }, () => address!);
	console.log('cost');
	console.log(cost);
	const {
		config,
		error: prepareError,
		isError: isPrepareError,
	} = usePrepareContractWrite({
		address: contract_address as `0x${string}`,
		chainId: Number(network),
		abi: UNIVERSAL_ABI,
		functionName: 'purchase',
		args: [[0], WalletArray, WalletArray, WalletArray, WalletArray],
		value: price ? cost._hex : (null as any),
	});
	console.log(config, prepareError, isPrepareError);
	const { data, error, isError, write } = useContractWrite(config);
	console.log(data, error, isError);
	const {
		isLoading,
		isSuccess,
		isError: err,
	} = useWaitForTransaction({
		hash: data?.hash,
	});

	console.log('err');
	console.log(err);

	useEffect(() => {
		if (data?.hash) {
			const updateRecords = async () => {
				const response = await fetch(
					`/api/bingo_purchase?contract=${contract_address}&network=${network}&tx=${data?.hash}`
				);
				const response_data = await response.json();

				setTimeout(() => updateRecords(), 10000);
			};
			updateRecords();
			setTxHash(data?.hash);
		}
	}, [data]);

	useEffect(() => {
		if (isSuccess) {
			toast('NFT Minted Successfully!');
			setMinted(true);
		}
	}, [isSuccess]);

	useEffect(() => {
		(async () => {
			try {
				const ChainId = Number(network) as keyof typeof ChainConfig;

				const web3Service = new Web3Service(ChainConfig);

				const tokenBalance = await web3Service.totalKeys(contract_address, address as string, ChainId);

				setNFTHolding(Number(tokenBalance.toString()));
			} catch (e) {
				console.log(e);
			}
		})();
	}, [address]);

	const claimNFT = async () => {
		if (end_date && new Date().getTime() > new Date(end_date).getTime()) {
			toast.error('Campaign expired');
			return;
		}

		//@ts-ignore
		if (address) {
			setLoading(true);

			if (chain?.id !== Number(network)) {
				toast.error(
					`Please switch to the ${ChainConfig[Number(network) as keyof typeof ChainConfig].name} chain`
				);
				setLoading(false);
				return;
			}

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

	console.log('nftHolding');
	console.log(nftHolding);

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

			<MintSuccessModal
				open={minted}
				onClose={() => setMinted(false)}
				position={totalMinted ? Number(totalMinted) + 1 : null}
				collectible_url={campaign_image}
				campaign_name={campaign_name}
				disableReload={true}
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

			{nftHolding < Number(limit ?? 1) ? (
				<Button
					fullWidth
					size="md"
					radius={'md'}
					// color="dark"
					className={`text-center my-5 block ${className}`}
					loading={loading || isLoading}
					onClick={address ? (chain?.id !== Number(network) ? openChainModal : write) : openConnectModal}
				>
					{address ? (
						<>
							{chain?.id !== Number(network)
								? `Switch Chain to ${
										ChainConfig[Number(network) as keyof typeof ChainConfig].name
								  } Mint NFT`
								: 'Mint NFT'}
						</>
					) : (
						'Connect Wallet'
					)}
				</Button>
			) : (
				<Button
					fullWidth
					size="md"
					radius={'md'}
					// color="dark"
					disabled
					className={`text-center my-5 block ${className}`}
				>
					Claimed
				</Button>
			)}

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
