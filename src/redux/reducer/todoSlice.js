import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getTodo, createTodo, completeTodo, getRepeatType, getTodayTodo, getTodayProgress, getUserTodoByDate, getCategory, uncompleteTodo } from '@api/ToDoAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getTodoData = createAsyncThunk(
    'todo/get',
    async (data, thunkAPI) => {
        const result = await getTodo(data).then((res) => res);
        thunkAPI.dispatch(getRepeatTypeData());
        return result;
    }
)

export const createTodoData = createAsyncThunk(
    'todo/create',
    async (data, thunkAPI) => {
        const result = await createTodo(data).then((res) => res);
        return result;
    }
)

export const completeTodoData = createAsyncThunk(
    'todo/complete',
    async (id, thunkAPI) => {
        const result = await completeTodo(id).then((res) => res);
        return result;
    }
)

export const getRepeatTypeData = createAsyncThunk(
    'todo/repeat-type',
    async (data, thunkAPI) => {
        const result = await getRepeatType().then((res) => res);
        return result;
    }
)

export const getTodayTodoData = createAsyncThunk(
    'todo/today',
    async (data, thunkAPI) => {
        const result = await getTodayTodo(data).then((res) => res);
        return result;
    })

export const getDailyTodoData = createAsyncThunk(
    'todo/daily',
    async (data, thunkAPI) => {
        const result = await getDailyTodoData(data).then((res) => res);
        return result;
    })

export const getTodayProgressData = createAsyncThunk(
    'todo/today-progress',
    async (user_id, thunkAPI) => {
        const result = await getTodayProgress(user_id).then((res) => res);
        return result;
    })

export const getUserTodoByDateData = createAsyncThunk(
    'todo/todo-by-date',
    async (user_id, thunkAPI) => {
        const result = await getUserTodoByDate(user_id).then((res) => res);
        return result;
})

export const getCategoryData = createAsyncThunk(
    'todo/category',
    async (data, thunkAPI) => {
        const result = await getCategory().then((res) => res);
        return result;
    })

export const uncompleteTodoData = createAsyncThunk(
    'todo/uncomplete',
    async (id, thunkAPI) => {
        const result = await uncompleteTodo(id).then((res) => res);
        return result;
    }
)

const initialState = {
    todoData: [],
    repeatType: [],
    dailyData: [],
    todayData: [],
    loading: false,
    todayProgress: {
        labels: [],
        data: [],
    },
    error: null,
    message: '',
    todoDataByDate: [],
    category: [],
}

const todoSlice = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {
        calculateTodayProgress: (state) => {}
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
        .addCase(completeTodoData.pending, (state) => {
            state.loading = true;
        })
        .addCase(completeTodoData.fulfilled, (state, action) => {
            state.message = action.payload.message;
            // let id = action.payload.data.id;
            // let index = state.todoData.findIndex((item) => item.id == id);
            // state.todoData[index].completed = true;
            // let index2 = state.todayData.findIndex((item) => item.id == id);
            // state.todayData[index2].completed = true;
        })
        .addCase(completeTodoData.rejected, (state, action) => {
            state.message = action.error.message;
            state.loading = false;
        })
        .addCase(getRepeatTypeData.pending, (state) => {
            state.loading = true;
        })
        .addCase(getRepeatTypeData.fulfilled, (state, action) => {
            state.loading = false;
            state.repeatType = action.payload.data;
        })
        .addCase(getRepeatTypeData.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
        .addCase(getTodayTodoData.pending, (state) => {
            state.loading = true;
        })
        .addCase(getTodayTodoData.fulfilled, (state, action) => {
            state.loading = false;
            state.todayData = action.payload.data;
        })
        .addCase(getTodayTodoData.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
        .addCase(getDailyTodoData.pending, (state) => {
            state.loading = true;
        })
        .addCase(getDailyTodoData.fulfilled, (state, action) => {
            state.loading = false;
            state.dailyData = action.payload.data;
        })
        .addCase(getDailyTodoData.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
        .addCase(getTodayProgressData.pending, (state) => {
            state.loading = true;
        })
        .addCase(getTodayProgressData.fulfilled, (state, action) => {
            state.loading = false;
            state.todayProgress = action.payload.data;
        })
        .addCase(getTodayProgressData.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
        .addCase(getUserTodoByDateData.pending, (state) => {
            state.loading = true;
        })
        .addCase(getUserTodoByDateData.fulfilled, (state, action) => {
            state.loading = false;
            state.todoDataByDate = action.payload.data;
        })
        .addCase(getUserTodoByDateData.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
        .addCase(getCategoryData.pending, (state) => {
            state.loading = true;
        })
        .addCase(getCategoryData.fulfilled, (state, action) => {
            state.loading = false;
            state.category = action.payload.data;
        })
        .addCase(getCategoryData.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
    }
})

export const {calculateTodayProgress} = todoSlice.actions;

export default todoSlice.reducer;