import { getCartItems, getCartTotal, clearCart } from "./cart.js";
import { applyDiscount } from "./discount.js";
import { reduceStock } from "./product.js";

// Generate order ID
function generateOrderId() {
  return "ORD" + Date.now();
}

// Validate payment method
export function validatePaymentMethod(method) {
  return ["card", "upi", "cod"].includes(method);
}

// Process payment
export function processPayment(paymentMethod, couponCode = null) {
  const method = String(paymentMethod ?? "").trim().toLowerCase();
  const items = getCartItems();
  const subtotal = getCartTotal();

  if (items.length === 0) {
    return { status: "failed", message: "Cart is empty" };
  }

  if (!validatePaymentMethod(method)) {
    return { status: "failed", message: "Invalid payment method" };
  }

  const shouldApplyCoupon = String(couponCode ?? "").trim().length > 0;
  const discountData = shouldApplyCoupon
    ? applyDiscount(subtotal, couponCode, items)
    : {
        originalTotal: subtotal,
        discount: 0,
        finalTotal: subtotal,
        message: "No coupon applied",
      };

  // Reduce stock
  for (let item of items) {
    if (item.product?.id) {
      reduceStock(item.product.id, item.quantity);
    }
  }

  clearCart();

  return {
    orderId: generateOrderId(),
    items,
    subtotal,
    discount: discountData.discount,
    total: discountData.finalTotal,
    paymentMethod: method,
    status: "success",
    message: discountData.message
  };
}
