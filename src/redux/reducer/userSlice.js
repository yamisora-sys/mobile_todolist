import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { Login, Register, Update } from '@api/userAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const USER_DATA = 'user';

export const storeData = async (key, value) => {
    try{
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    }
    catch(e){
        console.log(e);
    }
}

export const getData = async (key) => {
    try{
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    }
    catch(e){
        console.log(e);
    }

}

export const UserLogin = createAsyncThunk(
    'user/login',
    async (data, thunkAPI) => {
        const auth = await getData(USER_DATA).then((res) => res);
        if(auth != null){
            return {
                data: auth
            }
        }
        else{
            const result = await Login(data.username, data.password).then((res) => res);
            storeData(USER_DATA, result.data);
            return result;
        }
    }
)

export const UserRegister = createAsyncThunk(
    'user/register',
    async (data, thunkAPI) => {
        console.log(data);
        const result = await Register(data).then((res) => res);
        await storeData(USER_DATA, result.data);
        return result;
    }
)

export const UserUpdate = createAsyncThunk(
    'user/update',
    async (data, thunkAPI) => {
        console.log(data);
        const result = await Update(data).then((res) => res);
        await storeData(USER_DATA, result.data);
        return result;
    }
)

const initialState = {
    user: null,
    loading: false,
    error: null,
    message: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        Logout: (state) => {
            state.user = null;
            storeData(USER_DATA, null);
        },
        ClearError: (state) => {
            state.error = null;
        },
        ClearMessage: (state) => {
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(UserLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(UserLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.message = action.payload.message;
            })
            .addCase(UserLogin.rejected, (state, action) => {
                state.error = action.error;
                state.loading = false;
            });
        builder.addCase(UserRegister.pending, (state) => {
                state.loading = true;
            })
            .addCase(UserRegister.fulfilled, (state, action) => {
                state.message = action.payload.message;
                state.user = action.payload.data;
            })
            .addCase(UserRegister.rejected, (state, action) => {
                state.error = action.error;
                state.loading = false;
            })
        builder.addCase(UserUpdate.pending, (state) => {
                state.loading = true;
            })
            .addCase(UserUpdate.fulfilled, (state, action) => {
                state.message = action.payload.message;
                state.user = action.payload.data;
            })
            .addCase(UserUpdate.rejected, (state, action) => {
                state.error = action.error;
                state.loading = false;
            })
    },
})

export const {Logout, ClearError, ClearMessage} = userSlice.actions;
export default userSlice.reducer;