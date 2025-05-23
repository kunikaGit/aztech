import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../services/axios'
import { isloginSuccess } from "../slice/authSlice";
import { errorMsg, successMsg } from "../../utils/customFn";

export const login = createAsyncThunk(
  "auth/login",
  async (
    { formData, navigate },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("login", formData, config);
      if (data.status || data.success) {
        localStorage.setItem("auth_token", data?.data.token);

        dispatch(isloginSuccess());
        navigate("/")
        successMsg(data.message)
        return data;
      } else {
        errorMsg(data.message)
        return rejectWithValue(data.message);
      }
    } catch (error) {
      errorMsg(error?.response?.data?.message)
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);