import axios from 'axios';

const WEBSITE_URL = 'https://dubaibizbuzz.emqubeweb.com';

export const getToken = async () => {
    try {
        const response = await axios({
            method: 'post',
            url: `${WEBSITE_URL}/wp-json/jwt-auth/v1/token`,
            data: {
                username: 'admin-vat',
                password: 'o5%vaoHMBu0Zai&B$2',
            },
            headers: {
                Accept: 'application/json, text/plain, /',
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data.token;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};