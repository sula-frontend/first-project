import axios from "axios";

export const getProfiles = async () => {
    const options = {
        url: "http://anty-api.com/browser_profiles",
        headers: {
            Authorization: `Bearer ${process.env.TOKEN}`
        }
    }

    const res = await axios(options);
    const data = res.data;
    const profilesId = data.data.map((el: any)=>el.id);

    return profilesId;
}