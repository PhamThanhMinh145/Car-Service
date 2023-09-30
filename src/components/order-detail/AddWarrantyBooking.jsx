import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import dayjs from "dayjs";
import Button from "../filter/Button";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateTime from "../filter/DateTime";
import {
  GetTimeBooking,
  
} from "../../features/book/bookingSlide";

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 20;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      //   width: 250,
    },
  },
};

const useDetail = () => {
  const detail = useSelector((state) => state.booking.detail);
  
  const newServices = useMemo(() => {
    return detail.map((item) =>
      item?.serviceBookingDetailDto.serviceWarranty !== "" &&
      item?.isNew === true && item?.bookingDetailStatus === "Done"
        ? {
            serviceId: item?.serviceDetailId,
            serviceDuration: item?.serviceBookingDetailDto?.serviceDuration,
            serviceName: item?.serviceBookingDetailDto?.serviceName,
            productName: item?.productBookingDetailDto?.productName,
          }
        : ""
    );
  }, [detail]);
  return newServices;
};
const AddWarrantyBooking = ({ addWarrantyBooking }) => {
  const dispatch = useDispatch();
  const garageId = useSelector((state) => state.booking?.garage?.garageId);
  const times = useSelector((state) => state.booking?.durations);
  const data = useDetail();
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [service, setService] = useState([]);
  const [date, setDate] = useState(dayjs());

  //   Gọi Api lấy time trong ngày
  useEffect(() => {
    const data = {
      dateSelected: date?.format("MM/DD/YYYY"),
      totalEstimatedTimeServicesTake: service.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.serviceDuration,
        0
      ),
      garageId: garageId,
    };
    
    dispatch(GetTimeBooking(data));
  }, [date, service, dispatch, garageId]);

  const handleSubmit = (e) => {
    const data = {
      reason: reason,
      warrantyDay: date?.format("MM/DD/YYYY"),
      warrantyTime: time,
      serviceList: service.map((item) => item.serviceId),
    };

    addWarrantyBooking(data, resetForm);
    // console.log(data);
  };
  const resetForm = () => {
    setReason("");
    setService([]);
    setDate(dayjs());
    setTime("");
  };
  // render reason sau 1s

  //   console.log(newService);
  //   console.log("Service: ", service);

  //   console.log("garage:",  garageId);
  //   console.log("detail:", detail);
  // console.log("date", date?.format());

  //   console.log("service", service);
  // console.log("time", time);
  // console.log(reason);

  return (
    <form className="flex flex-col justify-center gap-6">
      <FormControl sx={{ width: 1 }}>
        <InputLabel id="demo-multiple-chip-label">Dịch vụ</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={service}
          onChange={(e) => {
            const selectedValues = e.target.value;
            setService(selectedValues);
          }}
          input={<OutlinedInput id="select-multiple-chip" label="Dịch vụ" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value?.serviceId} label={value?.serviceName} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data.map((service) => (
            <MenuItem key={service?.serviceId} value={service}>
              {service?.serviceName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <DateTime
        label="Ngày booking"
        defaultValue={date}
        value={date}
        onChange={(newDate) => {
          setDate(newDate);
        }}
      />
      <Stack direction="row" spacing={1}>
        {times.map((item) => (
          <Chip
            key={item?.hour}
            label={item?.hour}
            value={time}
            variant="variant"
            disabled={item?.isAvailable === false ? true : false}
            color={
              item?.isAvailable === false
                ? "error"
                : item?.hour === time
                ? "success"
                : "default"
            }
            onClick={() => {
              setTime(item?.hour);
            }}
          />
        ))}
      </Stack>
      <TextareaAutosize
        style={{
          borderRadius: "4px",
          border: "1px solid #bdbdbd",
          padding: "0.5rem",
        }}
        minRows={3}
        placeholder="Lí do "
        size="lg"
        variant="solid"
        onChange={(e) => {
          setReason(e.target.value);
        }}
        value={reason}
      />
      <div className="flex flex-row justify-end ml-10 warrancy-btn">
        <Button
          className="add-button"
          onClick={handleSubmit}
          size="medium"
          text="Lưu"
        />
        <Button
          variant="outlined"
          className="export-button ml-2"
          size="small"
          onClick={resetForm}
          text="Reset"
        />
      </div>
    </form>
  );
};

export default AddWarrantyBooking;
