import {baseAPI} from "@config/baseAPI";

export const Login = async (username, password) => {
    const result = await fetch(baseAPI + 'login', {
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

