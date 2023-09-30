import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductAvailable,
  resetState,
} from "../../features/product/productSlice";
import authService from "../../features/auth/authService";
import Button from "../filter/Button";
import "../../styles/button.scss";

const EditProduct = ({ editProductBooking , serviceId, record}) => {
  const currentUser = authService.getCurrentUser();
  const dispatch = useDispatch();

  // console.log(editProductBooking);

  useEffect(() => {
   
      dispatch(getProductAvailable(serviceId));
    
  }, [serviceId]);

  const productsAvaliable = useSelector((state) => state.product.products);

  const productOptions = productsAvaliable.map((item) => ({
    productId: item.productId,
    productName: item.productName,
    key: item.productId,
  }));

  // Kiểm tra dữ liệu trước khi sử dụng
  productOptions.forEach((option) => {
    if (typeof option.productName !== "string") {
      console.error("Invalid fullName:", option.productName);
    }
  });
  // console.log(newArray);

  const [value, setValue] = useState(record);
  const [inputValue, setInputValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value?.productId);
    editProductBooking(value?.productId, resetForm)
   
  };

  const resetForm = () => {
    setValue(null);
  };

  return (
    <div>
      <form className="flex flex-row justify-center" autoComplete="off">
        <Autocomplete
          size="small"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={productOptions}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} key={params.key} label="Product" />}
          getOptionLabel={(option) => option?.productName}
          isOptionEqualToValue={(option, value) =>
            option.productId === value.productId
          }
        />

        <div className="card flex-row ml-10">
          <Button
            fullWidth
            className="add-button"
            onClick={handleSubmit}
            size="medium"
            text="Lưu"
          />
          <Button
            fullWidth
            variant="outlined"
            className="export-button ml-2"
            size="small"
            onClick={resetForm}
            text="Reset"
          />
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
