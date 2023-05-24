const axios = require('axios');

const endpoint = 'https://api.lens.dev';

const query = `
  query UserProfile($request: ProfileQueryRequest!) {
    profiles(request: $request) {
      items {
        name
        handle
      }
    }
  }
`;


export const lensVerification = async (wallet: string) => {

  const variables = {
    request: {
      ownedBy: wallet,
    },
  };

  try {
    const response = await axios.post(endpoint, {
      query,
      variables,
    });


    return response.data.data.profiles.items;
  } catch (error) {
    console.error(error);
  }

}
