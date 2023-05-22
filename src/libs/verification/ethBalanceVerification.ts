import { ethers } from "ethers";

/*
*  Supported network values: homestead, goerli, sepolia , arbitrum, arbitrum-goerli, matic, maticmum, optimism, optimism-goerli
*  https://docs.ethers.org/v5/api/providers/api-providers/
*/


export const ethBalanceVerification = async ({ wallet, network = "mainnet" }: {
    wallet: string,
    network?: string
}) => {

    try {
        const provider = new ethers.providers.InfuraProvider(network);
        const balance = await provider.getBalance(wallet);

        const ethBalance = ethers.utils.formatEther(balance);

        return Number(ethBalance);
    } catch (error) {
        console.error(error);
    }
}
