import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import serviceService from "./serviceService";

export const getServices = createAsyncThunk(
  "service/services",

  async (data, thunkAPI) => {
    try {
      // console.log("check",data);
      return await serviceService.getServices(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editServices = createAsyncThunk(
  "service/edit",
  async (data, thunkAPI) => {
    try {
      // console.log(data);
      return await serviceService.editServices(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editDetail = createAsyncThunk(
  "service/editDetail",
  async (data, thunkAPI) => {
    try {
      // console.log(data);
      return await serviceService.editDetail(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addServices = createAsyncThunk(
  "service/addSer",
  async (data, thunkAPI) => {
    try {
      // console.log("check add",data);
      return await serviceService.addServices(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getDetailServices = createAsyncThunk(
  "service/detailSer",
  async (data, thunkAPI) => {
    try {
      // console.log(data);
      return await serviceService.getDetailServices(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addDetail = createAsyncThunk(
  "service/addDetail",
  async (data, thunkAPI) => {
    try {
      // console.log(data);
      return await serviceService.addDetail(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getServicesByGarage = createAsyncThunk(
  "service/servicesByGarage",

  async (data, thunkAPI) => {
    try {
      // console.log("check",data);
      return await serviceService.getServiceByGarage(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateServiceStatus = createAsyncThunk(
  "service/update-status",
  async (data, thunkAPI) => {
    try {
      return await serviceService.updateServiceStatus(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getServicesToAdd = createAsyncThunk(
  "service/serviceToGarageAdd",
  async (data, thunkAPI) => {
    try {
      return await serviceService.getServicesToAdd(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getServicesAdd = createAsyncThunk(
  "service/serviceGarageAdd",
  async (data, thunkAPI) => {
    try {
      return await serviceService.getServicesAdd(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  servicesDetail: [],
  services: [],
  servicesToAdd: [],
  servicesAdd: [],
  serviceInfo: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  isSuccessAdd: false,
  service: {},
  isSuccessAction: false,
  message: "",
  number: 0,
};

export const serviceSlice = createSlice({
  name: "services",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAdd = false;
        state.isSuccess = true;
        state.services = action.payload.list;
        state.number = action.payload.count;
        state.message = "success";
      })
      .addCase(getServices.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isSuccessAdd = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      // Action Service
      .addCase(addServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addServices.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAdd = true;
        state.services.push(action.payload);
        state.message = "";
      })
      .addCase(addServices.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessAdd = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
       // Action Service Detail
       .addCase(addDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDetail.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAdd = true;
        state.services.push(action.payload);
        state.message = "";
      })
      .addCase(addDetail.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessAdd = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
       //Edit
       .addCase(editServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editServices.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAdd = true;
        state.isSuccess = true;
        state.message = "success";
      })
      .addCase(editServices.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isSuccessAdd = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      // Detail Service
      .addCase(getDetailServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDetailServices.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.isSuccessAdd = false;
        state.serviceInfo = action.payload;
        state.servicesDetail = action.payload.serviceDetailServiceDtos;
        state.message = "success";
      })
      .addCase(getDetailServices.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isSuccessAdd = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      //EditDetail
      .addCase(editDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editDetail.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAdd = true;
        state.isSuccess = true;
        state.message = "success";
      })
      .addCase(editDetail.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isSuccessAdd = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(getServicesByGarage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getServicesByGarage.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAdd = false;
        state.isSuccess = true;
        state.services = action.payload.list;
        state.number = action.payload.count;
        state.message = "success";
      })
      .addCase(getServicesByGarage.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isSuccessAdd = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(updateServiceStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateServiceStatus.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAction = true;
        state.service = action.payload;
        state.message = "success";
      })
      .addCase(updateServiceStatus.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessAction = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(getServicesToAdd.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getServicesToAdd.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAction = false;
        state.isSuccessAdd = false;
        state.servicesToAdd = action.payload;
        state.message = "success";
      })  
      .addCase(getServicesToAdd.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessAction = false;
        state.isSuccessAdd = false;
        state.message = action.payload.response.data;
        state.isLoading = false;
      })
      .addCase(getServicesAdd.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessAction = false;
        state.isSuccessAdd = false;
        state.servicesAdd= action.payload;
        state.message = "success";
      })  
      .addCase(resetState, () => initialState)
  },
});

export default serviceSlice.reducer;
