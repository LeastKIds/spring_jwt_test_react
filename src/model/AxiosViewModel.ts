import axios from "axios";

export const customAxios = () => {
    return axios.create({
        baseURL: 'http://localhost:8080/api',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem("sessionToken")}`
        },
        withCredentials: true
    })
}
