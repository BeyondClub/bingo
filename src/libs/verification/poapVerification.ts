import axios from "axios";

export const poapVerification = async (wallet: string) => {

    try {
        const url = `https://api.poap.tech/actions/scan/${wallet}`;
        const headers = {
            'accept': 'application/json',
            'x-api-key': process.env.POAP_API_KEY
        };

        const response = await axios.get(url, { headers });

        return response.data;
    } catch (error) {
        console.error(error);
    }

}
