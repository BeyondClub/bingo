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

        const blockNumber = await provider.getBlockNumber();
        const block = await provider.getBlock(blockNumber);
        const transactions = block.transactions;

        return transactions;
    } catch (error) {
        console.error(error);
        return []
    }
}
