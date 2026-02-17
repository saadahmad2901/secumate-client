import axios from 'axios';

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
}
)

export default API;