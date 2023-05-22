import axios from "axios";

export const farcasterVerification = async (wallet: string) => {

    try {
        const url = `https://searchcaster.xyz/api/profiles?connected_address=${wallet}`;
        const headers = {
            'accept': 'application/json'
        };

        const response = await axios.get(url, { headers });

        return response.data;
    } catch (error) {
        console.error(error);
    }

}
