// get url from .env
import { API_URL } from "@env";
const baseURL = API_URL;

console.log(baseURL);

export const Login = async (username, password) => {
    const result = fetch(baseURL + 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    }).then((response) => response.json())
    return result;
}

export const Register = async (data) =>{
    console.log(data);
    const result = fetch(baseURL + 'register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((response) => response.json())
    return result;
}