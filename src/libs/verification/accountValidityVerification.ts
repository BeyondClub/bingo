import axios from "axios";



export const accountValidityVerification = async ({ wallet }: {
    wallet: string
}) => {

    try {
        const debankRecord = await axios.get(`https://api.debank.com/user?id=${wallet}`)

        const bornAt = Number(debankRecord.data.data.user.desc.born_at) * 1000
        const providedDate = new Date(bornAt);
        const currentDate = new Date();

        //@ts-ignore
        const timeDiff = currentDate - providedDate;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        return daysDiff;

    } catch (error) {
        console.error(error);
        return []
    }
}
