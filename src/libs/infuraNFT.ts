const { SDK, Auth, TEMPLATES, Metadata } = require('@infura/sdk');
require('dotenv').config()

const auth = new Auth({
    projectId: process.env.INFURA_API_KEY,
    secretId: process.env.INFURA_API_KEY_SECRET,
    privateKey: process.env.WALLET_PRIVATE_KEY,
    rpcUrl: process.env.RPC_URL,
    chainId: 80001,
});

const sdk = new SDK(auth);


export const getCollectionsByWallet = async (walletAddress: string) => {
    const result = await sdk.api.getToken({
        walletAddress: walletAddress,
    });
    console.log('collections:', result);
}

export const mintNFT = async (contractAddress: string, walletAddress: string, metadataURI: string) => {
    const contract = await sdk.loadContract({
        template: TEMPLATES.ERC721Mintable,
        contractAddress: contractAddress,
    });

    const _mint = await contract.mint({
        publicAddress: walletAddress,
        tokenURI: metadataURI,
    }
    );
    const minted = await _mint.wait();
}
