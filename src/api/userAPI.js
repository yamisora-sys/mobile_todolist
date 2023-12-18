// get url from .env
const baseURL = process.env.baseURL;

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
    return result;
}

export const Register = async (data) =>{
    const result = await fetch(baseURL + 'register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((response) => response.json())
    return result;
}