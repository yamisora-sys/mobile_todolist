import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const Login = createAsyncThunk(
    'user/login',
    async (data, thunkAPI) => {
        const result = await fetch(baseURL + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response) => response.json())
        return result;
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: false,
        message: '',
    },
    reducer: {},
    extraReducers: (bulder) => {
        bulder.addCase(Login.pending, (state) => {
            state.loading = true;
        })
        bulder.addCase(Login.fulfilled, (state, action) => {
            state.loading = false;
            let res = action.payload;
            state.message = res.message;
            if (res.status == "success") {
                state.user = res.data;
            } else {
                state.error = true;
            }
        })
        bulder.addCase(Login.rejected, (state) => {
            state.error = true;
            state.loading = false;
        })
    },
})

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;