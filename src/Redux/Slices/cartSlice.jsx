import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data: []
  };

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, { payload }) => {
            const itemIndex = state.data.findIndex(item => item.id === payload.id);
            if (itemIndex !== -1) {
                state.data[itemIndex].qty = state.data[itemIndex].qty + payload.qty;
                state.data[itemIndex].total = state.data[itemIndex].qty * parseFloat(payload.price);
            } else {
                state.data.push(payload);
            }
        },
        updateCart: (state, { payload }) => {
            const itemIndex = state.data.findIndex(item => item.id === payload.id);
            if (itemIndex !== -1) {
                state.data[itemIndex].qty = payload.qty;
                state.data[itemIndex].total = parseFloat(payload.total);
            }
        },
        removeCartItem: (state, { payload }) => {
            const new_items = state.data.filter(item => item?.id !== payload);
            state.data = new_items;
        },
        clearCart: (state) => {
            state.data = [];
        }
    }
})

export const { setCart, updateCart, removeCartItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;