import axios from 'axios';

export const request = async (url, method, payload) => {

    const token = localStorage.getItem('token');
    try {
        const res = await axios({
            url: `${process.env.REACT_APP_BASE_URL}${url}&apiKey=${process.env.REACT_APP_API_KEY}`,
            headers: {
                ...(token && {Authorization: `Bearer ${token}`})
            },
            method,
            data: payload
        });
        if (res.data && res.data.accessToken) {
            localStorage.setItem('token', res.data.accessToken)
        }
        return res.data;
    } catch (error) {
        if (error.response.status === 401) {
            localStorage.removeItem('token');
        }
        throw error;
    }

}


export async function getShipments() {
    const res = await fetchAPI(`/shipments.json`)
    return res.data
}

export const loadLibrary = async () => {
    const res = await getShipments()
    localStorage.setItem('shipments', JSON.stringify(res))
    return res
}




