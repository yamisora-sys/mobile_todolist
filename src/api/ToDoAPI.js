import { API_URL } from "@env";
const baseURL = API_URL;

export const getTodo = async (user_id) => {
    const result = fetch(baseURL + `get-todo/${user_id}`)
        .then((response) => response.json())
    return result;
}

export const createTodo = async (data) => {
    const result = fetch(baseURL + 'add-todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(data),
    }).then((response) => response.json())
    return result;
}


export const completeTodo = async (id) => {
    const result = fetch(baseURL + `complete-todo/${id}`)
        .then((response) => response.json())
    return result;
}


export const getRepeatType = async () => {
    const result = fetch(baseURL + 'get-repeat-type')
        .then((response) => response.json())
    return result;
}

export const getTodayTodo = async (user_id) => {
    const result = fetch(baseURL + `get-today-todo/${user_id}`)
        .then((response) => response.json())
    return result;
}

export const getDailyTodo = async (user_id) => {
    const result = fetch(baseURL + `get-daily-todo/${user_id}`)
        .then((response) => response.json())
    return result;
}

export const getTodayProgress = async (user_id) => {
    const result = fetch(baseURL + `calculate-today-progress/${user_id}`)
        .then((response) => response.json())
    return result;
}

export const getUserTodoByDate = async (user_id) => {
    const result = fetch(baseURL + `get-scheduled-todos/${user_id}`)
        .then((response) => response.json())
    return result;
}

export const getCategory = async () => {
    const result = fetch(baseURL + 'get-category')
        .then((response) => response.json())
    return result;
}

export const uncompleteTodo = async (id) => {
    const result = fetch(baseURL + `uncomplete-todo/${id}`)
        .then((response) => response.json())
    return result;
}


export const CalculateCompletedTodoInWeek = async (user_id) => {
    const result = fetch(baseURL + `calculate-week-complete/${user_id}`)
        .then((response) => response.json())
    return result;
}

export const CalculateFrequencyInMonth = async (user_id) => {
    const result = fetch(baseURL + `calculate-frequency-in-month/${user_id}`)
        .then((response) => response.json())
    return result;
}

export const updateTodo = async (data) => {
    const result = fetch(baseURL + 'update-todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(data),
    }).then((response) => response.json())
    return result;
}