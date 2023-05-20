const pinataSDK = require('@pinata/sdk');
const { Readable } = require('stream');

const uploadImage = async (base64Image: string) => {

    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);

    const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);
    const options = { pinataMetadata: { name: "yoo" } }; // change the name here.


    const result = await pinata.pinFileToIPFS(readableStream, options);

    return result.IpfsHash;
}

export default uploadImage
