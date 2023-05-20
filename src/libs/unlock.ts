import { ChainConfig } from "@/constants/chain.config";
import { WalletService } from '@unlock-protocol/unlock-js';
import axios from "axios";
import { ethers } from "ethers";

const defaultChainId = process.env.NEXT_PUBLIC_DEFAULT_CHAIN ? (Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN)) : 80001

export const getGasPrice = async () => {
    if (defaultChainId === 80001) {
        return null;
    }

    try {
        const response = await axios.get('https://gasstation-mainnet.matic.network/v2');

        return {
            maxPriorityFee: Math.round(response.data.safeLow.maxPriorityFee),
            maxFee: Math.round(response.data.safeLow.maxFee)
        };

    } catch (error) {
        return null
    }
}


const getClientProvider = async (web3auth_provider: any) => {
    if (web3auth_provider) {
        const provider = web3auth_provider.provider;
        return provider;
    }

    const provider = new ethers.providers.Web3Provider((window as any).ethereum, 'any')
    return provider

}



export const purchaseNFT = async ({ lock, signature, wallet_address, onTransactionCompleted, mintNFTCount = 1, web3auth_provider }: {
    lock: string,
    signature?: string,
    wallet_address: string,
    mintNFTCount?: number,
    onTransactionCompleted?: (tx_hash: string) => void,
    web3auth_provider?: any
}) => {
    const gasPrice = await getGasPrice();

    const provider = await getClientProvider(web3auth_provider);
    const signer = web3auth_provider ? web3auth_provider : provider.getSigner();
    const walletService = new WalletService(ChainConfig);
    await walletService.connect(provider, signer);


    const signatureData = []
    const walletAddress = []

    for (let i = 0; i < mintNFTCount; i++) {

        if (signature) {
            signatureData.push(signature)
        }

        walletAddress.push(wallet_address)
    }


    const purchase = await walletService.purchaseKeys(
        {
            lockAddress: lock,
            owners: walletAddress,
            data: signature ? signatureData : null,
        },
        {
            ...(gasPrice ? {
                gasLimit: 1000000,
                maxPriorityFeePerGas: ethers.utils.parseUnits(`${Number(gasPrice.maxPriorityFee) + 20}`, "gwei"),
                maxFeePerGas: ethers.utils.parseUnits(`${Number(gasPrice.maxFee) + 20}`, "gwei"),
            } : {
                gasLimit: 1000000,
            })
        },
        (error, hash) => {
            console.log({ hash });

            if (onTransactionCompleted && hash) {
                onTransactionCompleted(hash)
            }
        }
    );

    return purchase

}
