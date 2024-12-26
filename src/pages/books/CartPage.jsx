import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getImgUrl } from "../../utils/gettingUrl";
import { clearCart, removeFromCart } from "../../redux/features/cart/cartSlice";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2);

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 md:px-12 lg:px-24">
      {/* Cart Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Shopping Cart
        </h1>
        <button
          onClick={handleClearCart}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md shadow-sm transition-all"
        >
          Clear Cart
        </button>
      </div>

      {/* Cart Items Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.length > 0 ? (
          cartItems.map((product) => (
            <div
              key={product?._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={getImgUrl(product?.coverImage)}
                alt=""
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-medium text-gray-800 truncate">
                  {product?.title}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  <strong>Category:</strong> {product?.category}
                </p>
                <p className="text-indigo-600 font-semibold text-lg mt-2">
                  ${product?.newPrice}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-500">
                    <strong>Qty:</strong> 1
                  </p>
                  <button
                    onClick={() => handleRemoveFromCart(product)}
                    className="text-red-500 hover:underline text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-gray-600 text-lg text-center">
            No products found in your cart.
          </p>
        )}
      </div>

      {/* Summary Section */}
      <div className="mt-12">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 lg:flex lg:justify-between lg:items-center">
          <div>
            <p className="text-xl font-medium text-gray-800">
              Subtotal:{" "}
              <span className="text-indigo-600 font-semibold">
                ${totalPrice ? totalPrice : 0}
              </span>
            </p>
            <p className="text-gray-500 mt-1 text-sm">
              Shipping and taxes will be calculated at checkout.
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex flex-wrap gap-4">
            <Link
              to="/checkout"
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-md shadow-lg transition-all"
            >
              Checkout
            </Link>
            <Link
              to="/"
              className="text-indigo-600 hover:underline text-sm font-medium"
            >
              Continue Shopping →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
