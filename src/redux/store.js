import {configureStore} from '@reduxjs/toolkit';
import userSlice from './reducer/userSlice';
import todoSlice from './reducer/todoSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        todo: todoSlice,
    },
})