import API from "@/utils/api";

export const loginUser  = async (data) => {
    const response = await API.post('user/login', data)
    console.log(response.data);
    return response.data;
}
export const registerUser  = async (data) => {
    const response = await API.post('user/register', data)
    console.log(response.data);
    return response.data;
}