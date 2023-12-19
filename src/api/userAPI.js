// get url from .env
import { API_URL } from "@env";
const baseURL = API_URL;


export const Login = async (username, password) => {
    const result = await fetch(baseURL + 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    }).then((response) => response.json())
    console.log(result);
    return result;
}

export const Register = async (data) =>{
    console.log(22, data);
    const result = await fetch(baseURL + 'register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((response) => response.json())
    console.log(result);
    return result;
}