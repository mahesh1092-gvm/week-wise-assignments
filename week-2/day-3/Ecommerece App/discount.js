const coupons = {
  WELCOME10: { type: "percentage", value: 10, minAmount: 1000 },
  FLAT500: { type: "flat", value: 500, minAmount: 5000 },
  ELECTRONICS20: {
    type: "percentage",
    value: 20,
    minAmount: 10000,
    category: "electronics",
  },
};

export function validateCoupon(code, cartTotal, cartItems = []) {
  const couponCode = String(code ?? "").trim();
  const coupon = coupons[couponCode];

  if (!coupon) return { valid: false, message: "Invalid coupon" };
  if (cartTotal < coupon.minAmount) {
    return { valid: false, message: "Minimum amount not met" };
  }

  if (coupon.category) {
    const hasEligibleItem = cartItems.some(
      (item) => item.product?.category === coupon.category,
    );
    if (!hasEligibleItem) {
      return {
        valid: false,
        message: `Coupon requires at least one ${coupon.category} item`,
      };
    }
  }

  return { valid: true, coupon, message: "Coupon applied" };
}

export function calculateDiscount(coupon, cartTotal, cartItems = []) {
  if (!coupon) return 0;

  let baseTotal = cartTotal;
  if (coupon.category) {
    baseTotal = cartItems.reduce((sum, item) => {
      if (item.product?.category !== coupon.category) return sum;
      return sum + item.lineTotal;
    }, 0);
  }

  let discount = 0;
  if (coupon.type === "percentage") discount = (coupon.value / 100) * baseTotal;
  if (coupon.type === "flat") discount = coupon.value;

  if (!Number.isFinite(discount) || discount < 0) discount = 0;
  return Math.min(discount, cartTotal);
}

export function applyDiscount(cartTotal, couponCode, cartItems = []) {
  const result = validateCoupon(couponCode, cartTotal, cartItems);

  if (!result.valid) {
    return {
      originalTotal: cartTotal,
      discount: 0,
      finalTotal: cartTotal,
      message: result.message,
    };
  }

  const discount = calculateDiscount(result.coupon, cartTotal, cartItems);
  return {
    originalTotal: cartTotal,
    discount,
    finalTotal: cartTotal - discount,
    message: result.message,
  };
}
