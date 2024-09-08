import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';


const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const { id, quantity } = action.payload;
            const existingProduct = state.find(item => item.id === id);
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                state.push({ ...action.payload, cartId: uuidv4() });
            }
        },
        deleteFromCart(state, action) {
            return state.filter(item => item.cartId !== action.payload.cartId);
        },
        updateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const existingProduct = state.find(item => item.id === id);
            if (existingProduct) {
                existingProduct.quantity = quantity;
            }
        }
    }
});

export const { addToCart, deleteFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
