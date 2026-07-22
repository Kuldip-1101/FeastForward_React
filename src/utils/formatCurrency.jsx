/**
 * Formats a single item's price (or single unit multiplied by quantity)
 * depending on the active language.
 */
export const formatLocalizedPrice = (unitInrPrice, quantity = 1, lang = "en") => {
  if (["hi", "gu", "pa"].includes(lang)) {
    return `₹${(unitInrPrice * quantity).toLocaleString()}`;
  }

  // Calculate USD unit price, then multiply by quantity
  const unitUsd = Math.round(unitInrPrice / 85);
  return `$${unitUsd * quantity}`;
};

/**
 * Calculates the total USD or INR price across an array of cart items
 * to guarantee no rounding drift between item rows and cart subtotals.
 */
export const formatTotalCartPrice = (cartItems, totalInrAmount, lang = "en") => {
  if (["hi", "gu", "pa"].includes(lang)) {
    return `₹${totalInrAmount.toLocaleString()}`;
  }

  // Sum of individual unit USD prices * quantity
  const totalUsd = cartItems.reduce(
    (acc, item) => acc + Math.round(item.price / 85) * item.quantity,
    0
  );
  return `$${totalUsd}`;
};