const axios = require('axios');


export const graphVerification = async ({ wallet, query, endpoint, extra_variables = {} }: {
    wallet: string,
    query: string,
    endpoint: string,
    extra_variables?: any
}) => {

    const variables = {
        wallet: wallet.toLocaleLowerCase(),
        ...extra_variables
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
