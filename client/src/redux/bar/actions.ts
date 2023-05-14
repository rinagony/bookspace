import { createAsyncThunk } from "@reduxjs/toolkit";
import { IBarResrvationUserInfo } from "../../interfaces";

export const getBarAction = createAsyncThunk(
  "bar/getInfo",
  async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/bar`
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

export const addBarReservation = createAsyncThunk(
  "about/addBarReservation",
  async (infoBarReservation: IBarResrvationUserInfo) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/addBarReservation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(infoBarReservation),
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