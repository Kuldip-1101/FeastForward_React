import { createSlice } from '@reduxjs/toolkit';

//--------- Helper to load carts from localStorage safely-----------
const loadCartsFromStorage = () => {
  try {
    const saved = localStorage.getItem('userCarts');
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

//--------- Helper to persist carts to localStorage -----------
const saveCartsToStorage = (carts) => {
  try {
    localStorage.setItem('userCarts', JSON.stringify(carts));
  } catch (error) {
    console.error('Failed to save cart to storage:', error);
  }
};

const initialState = {
  carts: loadCartsFromStorage(), //--------- Format: { [userId]: [item1, item2] }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      //--------- action.payload: { userId: string | null, item: object }--------
      const userId = action.payload.userId || 'guest';
      const item = action.payload.item;

      if (!state.carts[userId]) {
        state.carts[userId] = [];
      }

      const existingIndex = state.carts[userId].findIndex((i) => i.id === item.id);

      if (existingIndex > -1) {
        state.carts[userId][existingIndex].quantity += 1;
      } else {
        state.carts[userId].push({ ...item, quantity: 1 });
      }

      saveCartsToStorage(state.carts);
    },

    removeFromCart: (state, action) => {
      //---------- action.payload: { userId: string | null, itemId: string | number }---
      const { userId = 'guest', itemId } = action.payload;

      if (state.carts[userId]) {
        state.carts[userId] = state.carts[userId].filter((i) => i.id !== itemId);
        saveCartsToStorage(state.carts);
      }
    },

    updateQuantity: (state, action) => {
      //--------- action.payload: { userId: string | null, itemId: string | number, quantity: number }
      const { userId = 'guest', itemId, quantity } = action.payload;

      if (state.carts[userId]) {
        const item = state.carts[userId].find((i) => i.id === itemId);
        if (item) {
          item.quantity = Math.max(1, quantity);
          saveCartsToStorage(state.carts);
        }
      }
    },

    clearUserCart: (state, action) => {
      //--------- action.payload: userId
      const userId = action.payload || 'guest';
      state.carts[userId] = [];
      saveCartsToStorage(state.carts);
    },

    //--------- Optional: Merge guest cart into user cart upon login
    mergeGuestCartToUser: (state, action) => {
      const targetUserId = action.payload;
      const guestCart = state.carts['guest'] || [];

      if (!targetUserId || guestCart.length === 0) return;

      if (!state.carts[targetUserId]) {
        state.carts[targetUserId] = [];
      }

      guestCart.forEach((guestItem) => {
        const existing = state.carts[targetUserId].find((i) => i.id === guestItem.id);
        if (existing) {
          existing.quantity += guestItem.quantity;
        } else {
          state.carts[targetUserId].push(guestItem);
        }
      });

      //----------- Clear guest cart after merging-----------
      state.carts['guest'] = [];
      saveCartsToStorage(state.carts);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearUserCart,
  mergeGuestCartToUser,
} = cartSlice.actions;

export default cartSlice.reducer;