import { createSlice } from "@reduxjs/toolkit";
import { login } from "../action/authAction";
var isAuthenticated = localStorage.getItem("auth_token") ? true : false;

// let user =   JSON.parse( localStorage.getItem("logged_in_user"))

const initialState = {
  loading: false,
  error: null,
  success: false,
  customerDetails: null,
  settingData: null,
  settingloading: null,
  isAuthenticated: isAuthenticated,
  auth_token: localStorage.getItem("auth_token") || null,  // 👈 new line
  vrfyOtpEmail: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isloginSuccess(state) {
      const token = localStorage.getItem("auth_token");
      if (token) {
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          auth_token: token,  // 👈 store token in state
          error: null,
        };
      }
    },    
    logout(state) {
      state.isAuthenticated = false;
      state.customerDetails = null;
      state.auth_token = null; // clear token from redux
      localStorage.clear();
    },    
  },

  extraReducers: (builder) => {
    builder
      //  Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        // state.user =  payload.user;
        state.isAuthenticated= true;
        state.error= null;
        // successMsg("Login successful");
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        // errorMsg(payload || "Login failed");
      });
      
  },
});

export const { logout, isloginSuccess } = authSlice.actions;

export default authSlice;
