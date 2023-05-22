import axios from "axios";

export const nftCountVerification = async (wallet: string) => {

    try {
        const url = `https://api.opensea.io/api/v2/beta/assets?format=json&owner_address=${wallet}`;
        const headers = {
            'accept': 'application/json'
        };

        const response = await axios.get(url, { headers });

        return response.data.results;
    } catch (error) {
        console.error(error);
    }

}
