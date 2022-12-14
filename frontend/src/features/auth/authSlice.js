import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import authService from "./authService"

//Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: user ? user : null,
    isError: null,
    isSuccess: false,
    isLording: false,
    message: ""
}

//Register User
export const Register = createAsyncThunk('auth/register', async(user, thunkAPI)=>{
    try {
       return await authService.register(user)
    } catch (error) {
        const message = (error.response & error.response.data & error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state)=>{
            // state.isLording = false,
            // state.isSuccess = false,
            // state.isError = false,
            // state.message = " "

        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(Register.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(Register.fulfilled, (state, action)=>{
            state.isLoading = false,
            state.isSuccess = true,
            state.user = action.payload
        })
        .addCase(Register.rejected, (state, action)=>{
            state.isLoading = false,
            state.isSuccess = false,
            state.user = null
        })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer