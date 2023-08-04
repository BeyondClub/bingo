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
        return null;
    }

}


export const getPoapImage = async (event_id: string) => {
    try {
        const url = `https://api.poap.tech/events/id/${event_id}`;
        const headers = {
            'accept': 'application/json',
            'x-api-key': process.env.POAP_API_KEY
        };

        const response = await axios.get(url, { headers });

        return response.data.image_url;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const poapEventVerification = async (address: string, event_id: string) => {
    try {
        const url = `https://api.poap.tech/actions/scan/${address}/${event_id}`;
        const headers = {
            'accept': 'application/json',
            'x-api-key': process.env.POAP_API_KEY
        };

        const response = await axios.get(url, { headers });

        return response.data.event;
    } catch (error) {

        return null;
    }
}
