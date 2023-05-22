import axios from "axios";

export const gitpoapVerification = async (wallet: string) => {

    try {
        const url = `https://public-api.gitpoap.io/v1/address/${wallet}/gitpoaps`;
        const headers = {
            'accept': 'application/json'
        };

        const response = await axios.get(url, { headers });

        return response.data;
    } catch (error) {
        console.error(error);
    }

}
