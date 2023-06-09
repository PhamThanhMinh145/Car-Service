import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeService from "./employeeService";

export const getEmployees = createAsyncThunk(
  "employee/employees",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      return await employeeService.getEmployees(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


const initialState = {
    employees: [],
    review: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    number: 0,
  };
  export const employeeSlice = createSlice({
    name: "employee",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getEmployees.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getEmployees.fulfilled, (state, action) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.employees = action.payload;
        //   state.number = action.payload.count;
          state.message = "success";
        })
        .addCase(getEmployees.rejected, (state, action) => {
          state.isError = true;
          state.isSuccess = false;
          state.message = action.payload.response.data;
          state.isLoading = false;
        });
    },
  });

  export default employeeSlice.reducer;