import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
    user: {},
    isError : false,
    isLoading : false, 
    isSuccess: false, 
    message: {},
}


export const login = createAsyncThunk(
    "auth/login" ,  
    async (userData, thunkAPI) => {
        try {        
            // console.log(userData);
            return await authService.login(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const resetStateAuth = createAction("Reset_all_auth");

export const authSlice = createSlice ({
    name: "auth", 
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading= false;
            state.isSuccess = true;
            state.user = authService.getCurrentUser();
            state.message = "success"
        })
        .addCase(login.rejected,  (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload.response.data;
            state.isLoading = false;
        })  

        .addCase(resetStateAuth, () => initialState);
        
    }
 })




 export default authSlice.reducer;