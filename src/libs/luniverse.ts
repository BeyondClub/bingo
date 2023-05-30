const axios = require('axios');

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

        const token = response.data.token; // Assuming the response contains a 'token' field
        console.log('Token:', token);
        // Do something with the Token

    } catch (error) {
        console.error('Error:', error);
    }
}

// 8507227663273275260 Bingo Program ID

// Credit points to user

// Withdraw points from the user
