import { createAsyncThunk } from "@reduxjs/toolkit";
import { IReservationInfo } from "../../interfaces";

export const getAboutAction = createAsyncThunk(
  "about/getInfo",
  async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/about`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  }
);

export const addReservation = createAsyncThunk(
  "about/addReservation",
  async (infoReservation: IReservationInfo) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/addReservation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(infoReservation),
        }
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.log("inside try err", typeof err);
      throw err;
    }
  }
);