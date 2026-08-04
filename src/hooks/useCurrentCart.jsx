import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearUserCart,
} from "../store/cartSlice";

export function useCurrentCart() {
  const dispatch = useDispatch();
  const EMPTY_ARRAY = [];

  //---------- Get active user ID --------
  const user = useSelector((state) => state.auth?.user);
  const userId = user?.id || user?.email;

  //----------- Select the Active User's Cart -------
  const cartItems = useSelector(
    (state) => (userId ? state.cart?.carts?.[userId] : EMPTY_ARRAY) || EMPTY_ARRAY,
  );

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const totalCartAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
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
          updateQuantity({ userId, itemId, quantity: current.quantity - 1 }),
        );
      } else {
        dispatch(removeFromCart({ userId, itemId }));
      }
    },
    resetCart: () => dispatch(clearUserCart(userId)),
  };
}
