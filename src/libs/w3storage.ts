import { File, Web3Storage } from 'web3.storage';

export const ipfsUpload = async ({
    filename = "bingo.png", payload
}: {
    filename?: string,
    payload: any
}) => {
    const payloadBuffer = Buffer.from(payload, 'base64')
    const payloadFile = new File([payloadBuffer], filename, { type: "image/png" })


    const client = new Web3Storage({ token: `${process.env.WEB3STORAGE_TOKEN}` })
    try {

        var filecoinUpload = await client.put([payloadFile], {
            maxRetries: 3
        })


        return filecoinUpload;
    } catch (e) {
        console.log(e)
        return null;
    }
}
