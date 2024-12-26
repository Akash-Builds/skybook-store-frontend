import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { getImgUrl } from "../../utils/gettingUrl";
import { useFetchBookByIdQuery } from "../../redux/features/books/booksApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-500">Error loading book information.</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Book Cover */}
        <div className="flex items-center justify-center col-span-1">
          <img
            src={getImgUrl(book.coverImage)}
            alt={book.title}
            className="w-32 h-48 rounded-md object-cover shadow-md"
          />
        </div>

        {/* Book Details */}
        <div className="col-span-2">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 border-b pb-2">{book.title}</h1>

          <div className="mb-6">
            <p className="text-gray-700 mb-2">
              <strong className="font-semibold">Author:</strong> {book.author || "Unknown"}
            </p>
            <p className="text-gray-700 mb-2">
              <strong className="font-semibold">Published:</strong> {new Date(book?.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-2 capitalize">
              <strong className="font-semibold">Category:</strong> {book?.category}
            </p>
            <p className="text-gray-700">
              <strong className="font-semibold">Description:</strong> {book.description}
            </p>
          </div>

          <button
            onClick={() => handleAddToCart(book)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:scale-105 transform transition duration-200"
          >
            <FiShoppingCart size={20} />
            <span className="text-lg font-semibold">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
