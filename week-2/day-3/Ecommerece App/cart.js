import { getProductById } from "./product.js";

let cartItems = [];

function findCartItem(productId) {
  const id = Number(productId);
  return cartItems.find((item) => item.productId === id) ?? null;
}

export function addToCart(productId, quantity) {
  const id = Number(productId);
  const qty = Number(quantity);

  if (!Number.isInteger(id) || id <= 0) return "Invalid product id";
  if (!Number.isInteger(qty) || qty <= 0) return "Invalid quantity";

  const product = getProductById(id);
  if (!product) return "Product not found";

  const existing = findCartItem(id);
  const nextQuantity = (existing?.quantity ?? 0) + qty;
  if (product.stock < nextQuantity) {
    return `Not enough stock for ${product.name}. Available: ${product.stock}`;
  }

  if (existing) {
    existing.quantity = nextQuantity;
    return `Updated ${product.name} quantity to ${existing.quantity}`;
  }

  cartItems.push({ productId: id, quantity: qty });
  return `Added ${qty} x ${product.name} to cart`;
}

export function removeFromCart(productId) {
  const id = Number(productId);
  const index = cartItems.findIndex((item) => item.productId === id);
  if (index === -1) return "Item not found in cart";
  cartItems.splice(index, 1);
  return "Item removed from cart";
}

export function updateQuantity(productId, newQuantity) {
  const id = Number(productId);
  const qty = Number(newQuantity);

  if (!Number.isInteger(id) || id <= 0) return "Invalid product id";
  if (!Number.isInteger(qty)) return "Invalid quantity";

  const product = getProductById(id);
  if (!product) return "Product not found";

  const item = findCartItem(id);
  if (!item) return "Item not found in cart";

  if (qty <= 0) {
    return removeFromCart(id);
  }

  if (product.stock < qty) {
    return `Not enough stock for ${product.name}. Available: ${product.stock}`;
  }

  item.quantity = qty;
  return `Updated ${product.name} quantity to ${item.quantity}`;
}

export function getCartItems() {
  return cartItems.map(({ productId, quantity }) => {
    const product = getProductById(productId);
    const unitPrice = product?.price ?? 0;

    return {
      product: product
        ? {
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
          }
        : null,
      quantity,
      lineTotal: unitPrice * quantity,
    };
  });
}

export function getCartTotal() {
  return getCartItems().reduce((sum, item) => sum + item.lineTotal, 0);
}

export function clearCart() {
  cartItems = [];
  return "Cart cleared";
}
