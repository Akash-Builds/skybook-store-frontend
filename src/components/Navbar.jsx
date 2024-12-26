import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBookOpen, FaRegUserCircle, FaRegHeart } from "react-icons/fa";
import { IoSearchCircleOutline } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import avatarImg from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);

 const {currentUser, logout} = useAuth()
 const handleLogOut = () => {
     logout()
 }

  return (
    <header className="max-w-screen-2xl mx-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-md sticky top-0 z-50">
      <nav className="flex justify-between items-center">
        {/* Left Side */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-white font-bold text-lg"
          >
            <FaBookOpen className="text-3xl border-2 border-white rounded-full p-1 hover:bg-white hover:text-indigo-600 transition-all duration-300" />
            <p>SkyBook.co</p>
          </Link>

          {/* Search Input */}
          <div className="relative sm:w-72 w-40">
            <IoSearchCircleOutline className="absolute left-3 text-lg text-white" />
            <input
              type="text"
              placeholder="Search here"
              className="w-full py-2 pl-10 pr-4 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center md:gap-5 gap-3">
          {/* User Section */}
          <div className="relative">
            {currentUser ? (
              <button onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
                <img
                  src={avatarImg}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-pink-400 hover:scale-105 transition-transform duration-300"
                />
              </button>
            ) : (
              <Link to="/login">
                <FaRegUserCircle className="text-2xl hover:text-pink-300 transition-all duration-300" />
              </Link>
            )}

            {/* Dropdown */}
            {isDropDownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-md z-40">
                <ul className="py-2">
                  {navigation.map((item) => (
                    <li
                      key={item.name}
                      onClick={() => setIsDropDownOpen(false)}
                      className="hover:bg-gray-100"
                    >
                      <Link
                        to={item.href}
                        className="block px-4 py-2 text-sm hover:text-indigo-600"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button onClick={handleLogOut} className="block px-4 py-2 text-sm hover:text-indigo-600">Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Favorites */}
          <button className="hidden sm:block">
            <FaRegHeart className="text-2xl hover:text-pink-400 transition-all duration-300" />
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            className="bg-white text-indigo-600 p-2 sm:px-6 py-2 flex items-center rounded-full hover:bg-pink-400 hover:text-white hover:shadow-md transition-all duration-300"
          >
            <MdAddShoppingCart className="text-xl" />
            {cartItems.length > 0 ? (
              <span className="text-sm font-semibold sm:ml-2">
                {cartItems.length}
              </span>
            ) : (
              <span className="text-sm font-semibold sm:ml-2">0</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
