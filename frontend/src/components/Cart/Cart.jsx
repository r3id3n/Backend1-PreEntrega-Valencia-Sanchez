import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Cart() {
  const { cid } = useParams();
  const [cart, setCart] = useState(null);

  useEffect(() => {
    fetch(`/api/carts/${cid}`)
      .then((response) => response.json())
      .then((data) => setCart(data))
      .catch((error) => console.error("Error fetching cart:", error));
  }, [cid]);

  const handleQuantityChange = (productId, newQuantity) => {
    fetch(`/api/carts/${cid}/product/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: newQuantity }),
    })
      .then((response) => response.json())
      .then((updatedCart) => {
        setCart(updatedCart);
        toast.success("Product quantity updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating product quantity:", error);
        toast.error("Failed to update product quantity.");
      });
  };

  const handleRemoveProduct = (productId) => {
    fetch(`/api/carts/${cid}/product/${productId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((updatedCart) => {
        setCart(updatedCart);
        toast.success("Product removed from cart successfully!");
      })
      .catch((error) => {
        console.error("Error removing product from cart:", error);
        toast.error("Failed to remove product from cart.");
      });
  };

  const calculateTotal = () => {
    if (!cart) return { totalQuantity: 0, totalPrice: 0 };
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    return { totalQuantity, totalPrice };
  };

  if (!cart) {
    return <div>Loading...</div>;
  }

  const { totalQuantity, totalPrice } = calculateTotal();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Cart {cid}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cart.map((item) => (
          <div key={item.product} className="border p-4 rounded shadow">
            <h2 className="text-2xl font-bold">Product ID: {item.product}</h2>
            <p>Price: ${item.price}</p>
            <p>
              Quantity:
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.product, parseInt(e.target.value))
                }
                className="ml-2 p-1 border rounded"
                min="1"
              />
            </p>
            <button
              onClick={() => handleRemoveProduct(item.product)}
              className="mt-2 bg-red-500 text-white py-1 px-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 p-4 bg-gray-100 rounded shadow">
        <h2 className="text-2xl font-bold">Cart Summary</h2>
        <p>Total Products: {totalQuantity}</p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Cart;
