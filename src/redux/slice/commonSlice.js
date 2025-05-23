import { createSlice } from "@reduxjs/toolkit";
// import { getAllRoles} from "../action/commonAction";




const initialState = {
  loading: false,
  error: null,
  success: false,
  // getAllRoles: null,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
  },

  // extraReducers: (builder) => {
  //   builder
  //     //  getAllRoles
  //     .addCase(getAllRoles.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(getAllRoles.fulfilled, (state, { payload }) => {
  //       state.loading = false;
  //       state.getAllRoles = payload;
     
  //     })
  //     .addCase(getAllRoles.rejected, (state, { payload }) => {
  //       state.loading = false;
  //       state.error = payload;
  //     })
      
  // },
});



export default commonSlice;
