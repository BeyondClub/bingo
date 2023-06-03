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
  const result = await sdk.api.getCollectionsByWallet({
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

  return minted;
}

export const deployContract = async () => {
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
        contractURI: storeMetadata,
      },
    });
    console.log(`Contract address is: ${newContract.contractAddress}`);
  } catch (error) {
    console.log(error);
  }
};
