import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/gettingUrl";
import { Link } from "react-router-dom";

import {useDispatch} from 'react-redux'
import { addToCart } from "../../redux/features/cart/cartSlice";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }
  return (
    <div className="rounded-lg transition-shadow duration-300 hover:shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
        {/* Book Image */}
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md overflow-hidden">
          <Link to={`/books/${book._id}`}>
            <img
              src={`${getImgUrl(book?.coverImage)}`}
              alt={book?.title}
              className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>

        {/* Book Details */}
        <div>
          <Link to={`/books/${book._id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {book?.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-5">
            {book?.description.length > 80
              ? `${book.description.slice(0, 80)}...`
              : book.description}
          </p>
          <p className="font-medium mb-5">
            ${book?.newPrice}{" "}
            <span className="line-through font-normal ml-2">
              ${book?.oldPrice}
            </span>
          </p>

          {/* Add to Cart Button */}
          <button
          
          onClick={()=>handleAddToCart(book)}
           className="relative px-6 py-2 flex items-center gap-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full hover:from-blue-600 hover:to-blue-700 shadow-lg transition-all duration-300">
            <FiShoppingCart className="text-xl" />
            <span className="font-medium text-lg">Add to Cart</span>
            {/* Decorative Shape */}
            <span className="absolute -left-4 -top-4 w-10 h-10 bg-blue-600 rounded-full blur-xl opacity-50"></span>
            <span className="absolute -right-4 -bottom-4 w-10 h-10 bg-blue-500 rounded-full blur-xl opacity-50"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
