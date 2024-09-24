import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api, BASE_URL, setAuthHeader } from "../api/api";

export const login = createAsyncThunk("auth/login", async(userData) => {
    try{
      const {data} = await  axios.post(`${BASE_URL}/auth/signin`, userData);
      localStorage.setItem("jwt", data.jwt);
      console.log("Login success", data);
      return data;
    }catch(error){
        console.log("catch error:",error);
        throw Error(error.response.data.error);
    }
});

export const register = createAsyncThunk("auth/register", async(userData) => {
    try{
      const {data} = await  axios.post(`${BASE_URL}/auth/signup`, userData);
      localStorage.setItem("jwt", data.jwt);
      console.log("register success", data);
      return data;
    }catch(error){
        console.log("catch error:",error);
        throw Error(error.response.data.error);
    }
});

export const logout = createAsyncThunk("auth/logout", async(userData) => {
    try{
      localStorage.clear();
    }catch(error){
        console.log("catch error:",error);
        throw Error(error.response.data.error);
    }
});

export const getUserProfile = createAsyncThunk("auth/getUserProfile", async(jwt) => {
    setAuthHeader(jwt,api)
    try{
      const {data} = await  api.get(`/api/users/profile`);
      console.log("user profile success", data);
      return data;
    }catch(error){
        console.log("catch error:",error);
        throw Error(error.response.data.error);
    }
});

export const getUserList = createAsyncThunk("auth/getUserList", async(jwt) => {
    setAuthHeader(jwt,api)
    try{
      const {data} = await  api.get(`/api/users`);
      console.log("user list success", data);
      return data;
    }catch(error){
        console.log("catch error:",error);
        throw Error(error.response.data.error);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState:{
        user: null,
        loggedIn: false,
        loading: false,
        error: null,
        users: [],
        jwt: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(login.pending, (state) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.loggedIn = true;
            state.jwt = action.payload.jwt;
        })
        .addCase(login.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(register.pending, (state) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.loggedIn = true;
            state.jwt = action.payload.jwt;
        })
        .addCase(register.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(getUserProfile.pending, (state) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.loggedIn = true;
            state.user = action.payload;
        })
        .addCase(getUserProfile.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(getUserList.pending, (state) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getUserList.fulfilled, (state, action) => {
            state.loading = false;
            state.loggedIn = true;
            state.users = action.payload;
        })
        .addCase(getUserList.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(logout.fulfilled, (state, action) =>{
            state.loggedIn = false;
            state.jwt = null;
            state.user = null;
            state.error = null;
            // state.loading = false;
            state.users = [];
        })
    }
})

export default authSlice.reducer;