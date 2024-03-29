import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";

export const getProducts = createAsyncThunk(
  "product/products",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      return await productService.getProducts(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addProducts = createAsyncThunk(
  "product/add",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      return await productService.addProducts(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editProducts = createAsyncThunk(
  "product/edit",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      return await productService.editProducts(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateProductStatus = createAsyncThunk(
  "product/update-status",
  async (data, thunkAPI) => {
    try {
      return await productService.updateProductStatus(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getProductAvailable = createAsyncThunk(
  "product/product-available",
  async (data, thunkAPI) => {
    try {
      return await productService.getProductAvailable(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



export const resetState = createAction("Reset_all");

const initialState = {
  products: [],
  product: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  isSuccessAdd: false,
  isSuccessAction: false,
  message: "",
  number: 0,
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccessAdd = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload.list;
        state.number = action.payload.count;
        state.message = "success";
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessAdd = false;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      //ADD Product
      .addCase(addProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProducts.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAdd = true;
        state.isSuccess = true;
        state.products.push(action.payload);
        state.message = "success";
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isSuccessAdd = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      //Edit
      .addCase(editProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProducts.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAdd = true;
        state.isSuccess = true;
        state.message = "success";
      })
      .addCase(editProducts.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isSuccessAdd = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(updateProductStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductStatus.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAction = true;
        state.product = action.payload;
        state.message = "success";
      })
      .addCase(updateProductStatus.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessAction = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(getProductAvailable.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductAvailable.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccessAdd = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
        state.message = "success";
      })
      .addCase(getProductAvailable.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessAdd = false;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(resetState, () => initialState);
      
      ;
  },
});

export default productSlice.reducer;
