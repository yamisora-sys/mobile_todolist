import { API_URL } from "@env";
const baseURL = API_URL;

export const getToDo = async (user_id) => {
    const result = await fetch(baseURL + 'todos', {
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

export const createToDo = async (data) => {
    const result = await fetch(baseURL + 'add-todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data,
        }),
    }).then((response) => response.json())
    return result;
}