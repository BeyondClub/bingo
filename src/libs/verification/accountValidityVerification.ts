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
        try {
            // Get transaction count for the Ethereum address
            const transactionCount = await provider.getTransactionCount(wallet);

            console.log()

            if (transactionCount > 0) {


            } else {
                console.log('No transactions found for the given address.');
            }
        } catch (error) {
            console.error('Error fetching transaction details:', error);
        }


    } catch (error) {
        console.error(error);
        return []
    }
}
