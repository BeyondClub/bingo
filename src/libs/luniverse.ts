const axios = require('axios');

export const loyaltyProgramId = "5645707254165167475";

const apiKey = process.env.LUNIVERSE_ACCESS_TOKEN;
const WEB3_ENGINE_API = process.env.LUNIVERSE_WEB3_ENGINE_ACCESS_TOKEN;

/*
* Function to generate the access token from access key and secret key on Luniverse
*/

export async function getToken() {
    try {
        const response = await axios.post('https://api.luniverse.io/svc/v2/auth-tokens', {
            accessKey: process.env.LUNIVERSE_ACCESS_KEY_1,
            secretKey: process.env.LUNIVERSE_SECRET_KEY_1
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response)
        return response.data;


    } catch (error) {
        console.error('Error:', error);
    }
}


export const getWeb3EngineToken = async () => {
    const options = {
        method: 'POST',
        url: 'https://web3.luniverse.io/v1/auth-token',
        headers: {
            accept: 'application/json',
            'X-NODE-ID': process.env.LUNIVERSE_NODE_ID,
            'X-Key-ID': process.env.LUNIVERSE_KEY_ID,
            'X-Key-Secret': process.env.LUNIVERSE_KEY_SECRET
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};



/*
* Update the score of a user
*/

export const updateScore = async ({ orderIdentifier, userIdentifier, amount, expiresIn, description }: {
    orderIdentifier: string,
    userIdentifier: string,
    amount: number,
    expiresIn: number,
    description: string
}) => {
    const url = 'https://api.luniverse.io/svc/v2/mercury/point/save';

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };

    const data = {
        orderIdentifier,
        userIdentifier,
        loyaltyProgramId,
        amount,
        expiresIn,
        description
    };

    try {
        const response = await axios.post(url, data, { headers });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

/*
* Spend points of a user
*/

export const spendPoints = async ({ orderIdentifier, userIdentifier, amount, description }: {
    orderIdentifier: string,
    userIdentifier: string,
    amount: number,
    description: string

}) => {
    const url = 'https://api.luniverse.io/svc/v2/mercury/point/spend';

    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    const data = {
        orderIdentifier,
        userIdentifier,
        loyaltyProgramId,
        amount,
        description
    };

    try {
        const response = await axios.post(url, data, { headers });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);

        return null;
    }
};

/*
* Get the balance of a user
*/

export const getAccountBalance = async (userIdentifier: string) => {
    const url = `https://api.luniverse.io/svc/v2/mercury/point-accounts/${userIdentifier}/balances/LFB`;

    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
    };

    try {
        const response = await axios.get(url, { headers });
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
};


export const listNftTransferByContract = async (contractAddress: string) => {
    const options = {
        method: 'POST',
        url: 'https://web3.luniverse.io/v1/polygon/mumbai/nft/listNftTransferByContract',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${WEB3_ENGINE_API}`
        },
        data: {
            contractAddress,
            disableCount: true,
        }
    };

    try {
        const response = await axios.request(options);
        return response.data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
