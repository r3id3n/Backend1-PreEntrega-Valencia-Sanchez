import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddToCart from "../AddToCart/AddToCart";

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`/api/products/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
        toast.success("Product deleted successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product.");
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <p>{product.description}</p>
            <p>Code: {product.code}</p>
            <p>Price: ${product.price}</p>
            <p>Status: {product.status ? "Available" : "Unavailable"}</p>
            <p>Stock: {product.stock}</p>
            <p>Category: {product.category}</p>
            {product.thumbnails.length > 0 && (
              <img
                src={product.thumbnails[0]}
                alt={product.title}
                className="w-full h-32 object-cover mt-2"
              />
            )}
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => navigate(`/edit-product/${product.id}`)}
                className="bg-green-500 text-white py-1 px-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white py-1 px-2 rounded"
              >
                Delete
              </button>
              <AddToCart productId={product.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
