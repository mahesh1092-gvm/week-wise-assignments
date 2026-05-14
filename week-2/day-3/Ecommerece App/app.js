import { getAllProducts, searchProducts } from "./product.js";
import {
  addToCart,
  getCartItems,
  getCartTotal,
  updateQuantity,
  removeFromCart
} from "./cart.js";
import { processPayment } from "./payment.js";

console.log("=== E-COMMERCE STORE ===");

console.log("\nAll Products:");
console.log(getAllProducts());

console.log("\nSearch:");
console.log(searchProducts("phone"));

console.log("\nAdd Items:");
console.log(addToCart(1, 2));
console.log(addToCart(3, 3));

console.log("\nCart:");
console.log(getCartItems());
console.log("Total:", getCartTotal());

console.log("\nUpdate:");
console.log(updateQuantity(1, 2));

console.log("\nRemove:");
console.log(removeFromCart(3));

console.log("\nCheckout:");
console.log(processPayment("upi", "WELCOME10"));