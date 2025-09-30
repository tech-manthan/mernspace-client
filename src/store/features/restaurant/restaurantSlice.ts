import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RestaurantState {
  tenantId: number | null;
}

const initialState: RestaurantState = {
  tenantId: null,
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state, { payload }: PayloadAction<number | null>) => {
      window.localStorage.setItem("tenantId", JSON.stringify(payload));
      state.tenantId = payload;
    },
  },
});

export const { setRestaurant } = restaurantSlice.actions;

export default restaurantSlice.reducer;
