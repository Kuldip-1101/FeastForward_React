
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearUserCart,
} from "../store/cartSlice";

export function useCurrentCart() {
  const dispatch = useDispatch();

  //---------- Get active user ID (or default to 'guest')--------
  const user = useSelector((state) => state.auth?.user);
  const userId = user?.id || user?.email || "guest";

  //----------- Select the specific user's cart array-------
  const cartItems = useSelector((state) => state.cart?.carts?.[userId] || []);

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const totalCartAmount = cartItems.reduce(
    (acc, i) => acc + i.price * i.quantity,
    0
  );

  return {
    cartItems,
    totalCartCount,
    totalCartAmount,
    addItem: (item) => dispatch(addToCart({ userId, item })),
    removeItem: (itemId) => dispatch(removeFromCart({ userId, itemId })),
    decrementItem: (itemId) => {
      const current = cartItems.find((i) => i.id === itemId);
      if (current && current.quantity > 1) {
        dispatch(
          updateQuantity({ userId, itemId, quantity: current.quantity - 1 })
        );
      } else {
        dispatch(removeFromCart({ userId, itemId }));
      }
    },
    resetCart: () => dispatch(clearUserCart(userId)),
  };
}