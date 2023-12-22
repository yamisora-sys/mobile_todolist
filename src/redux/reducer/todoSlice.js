import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getTodo, createTodo, completeTodo } from '@api/ToDoAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TODO_DATA = 'todo';

export const getTodoData = createAsyncThunk(
    'todo/get',
    async (data, thunkAPI) => {
        const result = await getTodo(data).then((res) => res);
        return result;
    }
)

export const createTodoData = createAsyncThunk(
    'todo/create',
    async (data, thunkAPI) => {
        const result = await createTodo(data).then((res) => res);
        thunkAPI.dispatch(getTodoData(data.user_id));
        return result;
    }
)

export const completeTodoData = createAsyncThunk(
    'todo/complete',
    async (data, thunkAPI) => {
        const result = await completeTodo(data.id).then((res) => res);
        thunkAPI.dispatch(getTodoData(data.user_id));
        return result;
    }
)

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todoData: [],
        loading: false,
        error: null,
        message: '',
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(getTodoData.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getTodoData.fulfilled, (state, action) => {
            state.loading = false;
            state.todoData = action.payload.data;
            state.message = action.payload.message;
        })
        .addCase(getTodoData.rejected, (state, action) => {
            state.error = action.error.message;
            state.message = action.error.message;
            state.loading = false;
        })
        .addCase(createTodoData.pending, (state) => {
            state.loading = true;
        })
        .addCase(createTodoData.fulfilled, (state, action) => {
            // state.todoData = action.payload.data;
            state.message = action.payload.message;
        })
        .addCase(createTodoData.rejected, (state, action) => {
            state.message = action.error.message;
            state.loading = false;
        })
    }
})

export default todoSlice.reducer;