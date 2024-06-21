import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center text-white text-lg font-bold">
          <img
            src="/icons/dragonball.png"
            alt="Dragon Ball Icon"
            className="h-8 w-8 mr-2"
          />
          AniWear
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link className="text-white" to="/">
              Products
            </Link>
          </li>
          <li>
            <Link className="text-white" to="/add-product">
              Add Product
            </Link>
          </li>
          <li>
            <Link className="text-white" to="/cart/1">
              Cart
            </Link>
          </li>
          <li>
            <Link className="text-white" to="/carts">
              All Carts
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
