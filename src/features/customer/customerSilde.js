import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "./customerService";

export const getCustomers = createAsyncThunk(
  "customer/customers",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      return await customerService.getCustomers(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getNumberCustomer = createAsyncThunk(
  "customer/number",
  async (thunkAPI) => {
    try {
      return await customerService.getNumberCustomers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getDetailCustomer = createAsyncThunk(
  "customer/detail",
  async (id, thunkAPI) => {
    try {
      return await customerService.getDetailCustomer(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



const initialState = {
  customers: [],
  customer: {},
  cars: [], 
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  number: 0,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.customers = action.payload;
        state.message = "success";
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(getNumberCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNumberCustomer.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.number = action.payload;
        state.message = "success";
      })
      .addCase(getNumberCustomer.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })

      .addCase(getDetailCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDetailCustomer.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.customer = action.payload;
        state.cars = action.payload.userCustomerDto.customerCarDtos;
        state.message = "success";
      })
      .addCase(getDetailCustomer.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })

      
  },
});

export default customerSlice.reducer;
