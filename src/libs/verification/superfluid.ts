const axios = require('axios');


// endpoint for mumbai testnet
const endpoint = 'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai';

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

const superfluidStreams = async (wallet: string) => {
  const variables = {
    sender: wallet,
  };

  try {
    const response = await axios.post(endpoint, {
      query,
      variables,
    });

    return (response.data.data.streams);
  } catch (error) {
    console.error(error);
  }
};
