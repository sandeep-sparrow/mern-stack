import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const admin_login = createAsyncThunk(
    'auth/admin_login', // action type
    async(info, {rejectWithValue, fulfillWithValue}) => { // function with return's promise
        try {
            const {data} = await api.post('/admin-login', info,
                {withCredentials: true});
            localStorage.setItem('accessToken', data.token);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    } 
);

export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        userInfo: '',
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(admin_login.pending, (state) => {
            state.loader = true;                
        })
        .addCase(admin_login.rejected, (state, { payload }) => {
            state.loader = false;   
            state.errorMessage = payload.error             
        })
        .addCase(admin_login.fulfilled, (state, { payload }) => {
            state.loader = false;   
            state.successMessage = payload.message;             
        })
        
    }
});

export default authReducer.reducer;
export const {messageClear} = authReducer.actions;