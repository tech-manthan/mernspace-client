import { getCartItemHash } from "@/lib/get-cart-item-hash";
import { CartItem, CartItemAdd } from "@/types/cart.types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemAdd>) => {
      const hash = getCartItemHash(action.payload);
      const cartItems = [
        ...state.cartItems,
        { ...action.payload, qty: 1, hash: hash },
      ];
      window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return {
        cartItems: cartItems,
      };
    },
    setInitialCart: (state, action: PayloadAction<CartItem[]>) => {
      return {
        cartItems: action.payload,
      };
    },
    increaseCartItemQuantity: (state, action: PayloadAction<string>) => {
      const cartItems = state.cartItems.map((item) =>
        item.hash === action.payload ? { ...item, qty: item.qty + 1 } : item
      );
      window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return {
        cartItems: cartItems,
      };
    },

    decreaseCartItemQuanity: (state, action: PayloadAction<string>) => {
      const cartItems = state.cartItems
        .map((item) =>
          item.hash === action.payload ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty !== 0);
      window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return {
        cartItems: cartItems,
      };
    },

    removeCartItem: (state, action: PayloadAction<string>) => {
      const cartItems = state.cartItems.filter(
        (item) => item.hash !== action.payload
      );
      window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return {
        cartItems: cartItems,
      };
    },

    clearCart: () => {
      window.localStorage.setItem("cartItems", JSON.stringify([]));
      return {
        cartItems: [],
      };
    },
  },
});

export const {
  addToCart,
  setInitialCart,
  clearCart,
  decreaseCartItemQuanity,
  increaseCartItemQuantity,
  removeCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;
