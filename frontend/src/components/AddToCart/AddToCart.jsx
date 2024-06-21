import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddToCart({ productId }) {
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    let cartId = localStorage.getItem("cartId");
    if (!cartId) {
      const response = await fetch("/api/carts", { method: "POST" });
      const newCart = await response.json();
      cartId = newCart.id;
      localStorage.setItem("cartId", cartId);
    }

    fetch(`/api/carts/${cartId}/product/${productId}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Producto agregado al carrito:", data);
        toast.success("Product added to cart successfully!");
        navigate(`/cart/${cartId}`);
      })
      .catch((error) => {
        console.error("Error al agregar producto al carrito:", error);
        toast.error("Failed to add product to cart.");
      });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-500 text-white py-2 px-4 rounded"
    >
      Add to Cart
    </button>
  );
}

export default AddToCart;
