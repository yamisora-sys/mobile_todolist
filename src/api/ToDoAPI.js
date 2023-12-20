import { API_URL } from "@env";
const baseURL = API_URL;

export const getTodo = async (user_id) => {
    const result = await fetch(baseURL + 'get-todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id,
        }),
    }).then((response) => response.json())
    return result;
}

export const createTodo = async (data) => {
    const result = await fetch(baseURL + 'add-todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((response) => response.json())
    return result;
}
