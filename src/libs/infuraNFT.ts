const { SDK, Auth, TEMPLATES, Metadata } = require('@infura/sdk');
require('dotenv').config()

// Create Auth object
const auth = new Auth({
    projectId: process.env.INFURA_API_KEY,
    secretId: process.env.INFURA_API_KEY_SECRET,
    privateKey: process.env.WALLET_PRIVATE_KEY,
    rpcUrl:process.env.RPC_URL,
    chainId: 80001,
});

// Instantiate SDK
const sdk = new SDK(auth);

// @dev @jijin
// no method to find tokenID by walletAddress and contractAddress in infura sdk.
// either we search in the json returned below or we use the contract abi to call the method

export const getCollectionsByWallet = async (walletAddress: string) => {
    const result = await sdk.api.getCollectionsByWallet({
        walletAddress: walletAddress,
    });
    console.log('collections:', result);
}

export const mint = async (contractAddress: string, walletAddress: string, metadataURI: string) => {
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
    console.log(`Status: ${minted.status}\n NFT minted on ${minted.blockHash} with ${minted.confirmations} confirmation!`);
}

export const deployContract = async() => {
    try {

        const collectionMetadata = Metadata.openSeaCollectionLevelStandard({
        name: 'BINGO',
        description: "beyondClub's dynamic BINGO NFT",
        image: await sdk.storeFile({
          metadata: 'https://bafkreibqx5ny7lcrfxl4gbprwaqsgdllkcj6r2gvpir5agaffzpbra3vt4.ipfs.nftstorage.link/',
        }),
        external_link: 'https://beyondclub.xyz',
      });

      console.log('collectionMetadata ----', collectionMetadata);
      const storeMetadata = await sdk.storeMetadata({ metadata: collectionMetadata });
      console.log('storeMetadata', storeMetadata);

      const newContract = await sdk.deploy({
        template: TEMPLATES.ERC721Mintable,
        params: {
          name: 'BINGO',
          symbol: 'BINGO',
          contractURI:storeMetadata,
        },
      });
      console.log(`Contract address is: ${newContract.contractAddress}`);
    } catch (error) {
      console.log(error);
    }
};