const axios = require('axios');

export const loyaltyProgramId = "5645707254165167475";

const apiKey = process.env.LUNIVERSE_ACCESS_TOKEN;

/*
* Function to generate the access token from access key and secret key on Luniverse
*/

export async function getToken() {
    try {
        const response = await axios.post('https://api.luniverse.io/svc/v2/auth-tokens', {
            accessKey: process.env.LUNIVERSE_ACCESS_KEY,
            secretKey: process.env.LUNIVERSE_SECRET_KEY
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const token = response.data.token;
        console.log('Token:', token);
        return token;

    } catch (error) {
        console.error('Error:', error);
    }
}


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
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
