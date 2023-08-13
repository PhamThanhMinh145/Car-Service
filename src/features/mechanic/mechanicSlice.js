import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import mechanicService from "./mechanicService";

export const getMechanics = createAsyncThunk(
  "mechanic/mechanics",
  async (data, thunkAPI) => {
    try {
      // console.log(data);
      return await mechanicService.getMechanics(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateMechanicStatus = createAsyncThunk(
  "mechanic/update-status",
  async (data, thunkAPI) => {
    try {
      return await mechanicService.updateMechanicStatus(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMechanicsByBookingId = createAsyncThunk(
  "mechanic/mechanic-by-booking",
  async (id, thunkAPI) => {
    try {
      return await mechanicService.getMechanicsByBookingId(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateMechanicByBookingId = createAsyncThunk(
  "mechanic/update-mechanic-booking",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      return await mechanicService.updateMechanicByBookingId(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getMechanicDetail = createAsyncThunk(
  "mechanic/mechanic-detail",
  async (id, thunkAPI) => {
    try {
      return await mechanicService.getMechanicDetail(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  mechanics: [],
  mechanic: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  isSuccessAction: false,
  message: "",
  number: 0,
};

export const mechanicSlice = createSlice({
  name: "mechanic",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMechanics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMechanics.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.mechanics = action.payload.list;
        state.number = action.payload.count;
        state.message = "success";
      })
      .addCase(getMechanics.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(updateMechanicStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMechanicStatus.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAction = true;
        state.mechanic = action.payload;
        state.message = "success";
      })
      .addCase(updateMechanicStatus.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessAction = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(getMechanicsByBookingId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMechanicsByBookingId.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.mechanics = action.payload;
        state.message = "success";
      })
      .addCase(getMechanicsByBookingId.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(updateMechanicByBookingId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMechanicByBookingId.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAction = true;
        state.mechanic = action.payload;
        state.message = "success";
      })
      .addCase(updateMechanicByBookingId.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessAction = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(getMechanicDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMechanicDetail.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.mechanic = action.payload;
        state.message = "success";
      })
      .addCase(getMechanicDetail.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(resetState, () => initialState);
  },
});

export default mechanicSlice.reducer;
