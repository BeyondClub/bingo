const axios = require('axios');


export const graphVerification = async ({ wallet, query, endpoint }: {
    wallet: string,
    query: string,
    endpoint: string
}) => {

    const variables = {
        wallet: wallet.toLocaleLowerCase(),
    };

    try {

        console.log({
            endpoint
        });
        console.log({
            query,
            variables: query.includes('wallet') ? variables : null,
        })


        const response = await axios.post(endpoint, {
            query,
            variables: query.includes('wallet') ? variables : null,
        });

        console.log(response.data);

        return response.data.data;
    } catch (error) {
        console.error(error);
    }

}
