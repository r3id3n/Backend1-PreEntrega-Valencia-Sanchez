import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CartList() {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    fetch("/api/carts")
      .then((response) => response.json())
      .then((data) => setCarts(data))
      .catch((error) => console.error("Error fetching carts:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Carts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {carts.map((cart) => (
          <div key={cart.id} className="border p-4 rounded shadow">
            <h2 className="text-2xl font-bold">Cart ID: {cart.id}</h2>
            <Link to={`/cart/${cart.id}`} className="text-blue-500 underline">
              View Cart
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartList;
