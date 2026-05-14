const order = {
  orderId: "ORD1001",
  customer: {
    name: "Anita",
    address: {
      city: "Hyderabad",
      pincode: 500085,
    },
  },
  items: [{ product: "Laptop", price: 70000 }],
};
let orderCpy=structuredClone(order)//deep copy of order.
orderCpy.customer.address.city="Venkatapur"
orderCpy.items[0].price=75000
console.log(order)
console.log(orderCpy)
