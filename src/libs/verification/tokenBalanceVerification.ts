import { ChainConfig } from "@/constants/chain.config";
import { ethers } from "ethers";


const contractAddressDecimalMapping = {
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": 6,
    "0x6b175474e89094c44da98b954eedeac495271d0f": 18,
    "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85": 0, // ens
    "0xc36442b4a4522e871399cd717abdd847ab11fe88": 0, // uniswap liquidity
}


export const tokenBalanceVerification = async ({ wallet, network = 137, tokenContractAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", decimalPlaces = 6 }: {
    wallet: string,
    network?: number
    tokenContractAddress?: string
    decimalPlaces?: number
}) => {

    try {
        const provider = new ethers.providers.JsonRpcProvider(ChainConfig[network as keyof typeof ChainConfig].provider);

        const abi = ['function balanceOf(address) view returns (uint256)'];
        const tokenContract = new ethers.Contract(tokenContractAddress, abi, provider);
        const userAddressChecksum = ethers.utils.getAddress(wallet);
        const balance = await tokenContract.balanceOf(userAddressChecksum);

        //@ts-ignore
        const formattedBalance = ethers.utils.formatUnits(balance, contractAddressDecimalMapping[tokenContractAddress.toLocaleLowerCase()] ?? decimalPlaces);
        return Number(formattedBalance);
    } catch (error) {
        console.error(error);
        return null;
    }
}
