const axios = require('axios');


export const shortenAddress = (address: string, chars = 4) => {
    if (!address) {
        return null;
    }
    const parsed = (address)
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(address.length - chars)}`
}



export const isEmpty = (n: any) => {
    if (n == null) return true;

    return !(!!n
        ? typeof n === 'object'
            ? Array.isArray(n)
                ? !!n.length
                : !!Object.keys(n).length
            : true
        : false);
};



export const makeApiRequest = async ({
    headers, url, method = "GET", body
}: {
    headers?: any,
    url: string,
    method?: string,
    body?: any

}) => {
    try {
        const options = {
            method: method.toUpperCase(),
            url: url,
            headers: headers ?? {},
            data: body ?? null
        };


        const response = await axios(options);
        return response.data;
    } catch (error) {
        // console.log(error)
        console.error(`An error occurred: ${error}`);
        return null;
    }
};
