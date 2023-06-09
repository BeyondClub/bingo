import { ethers } from "ethers";

/*
*  Supported network values: homestead, goerli, sepolia , arbitrum, arbitrum-goerli, matic, maticmum, optimism, optimism-goerli
*  https://docs.ethers.org/v5/api/providers/api-providers/
*/


export const txHistoryVerification = async ({ wallet, network = "mainnet" }: {
    wallet: string,
    network?: string
}) => {

    try {
        const provider = new ethers.providers.InfuraProvider(network);
        const transactionCount = await provider.getTransactionCount(wallet);

        return transactionCount;
    } catch (error) {
        console.error(error);
        return []
    }
}
