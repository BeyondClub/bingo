const axios = require('axios');

const endpoint = {
  137: 'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-matic',
  80001: 'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai',
  10: 'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-optimism-mainnet',
  42161: 'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-arbitrum-one',
}

const query = `
  query checkStream($sender: String!) {
    streams(where: { sender: $sender }) {
      currentFlowRate
      token {
        symbol
      }
      sender {
        id
      }
      receiver {
        id
      }
    }
  }
`;

export const superfluidStreams = async (wallet: string, network = 137) => {
  const variables = {
    sender: wallet,
  };

  try {
    const response = await axios.post(endpoint[network as keyof typeof endpoint], {
      query,
      variables,
    });

    return (response.data.data.streams);
  } catch (error) {
    console.error(error);
  }
};
