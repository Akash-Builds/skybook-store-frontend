import React from 'react';
import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';
import { Link } from 'react-router-dom';

const ManageBooks = () => {
  const { data: books, refetch } = useFetchAllBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  // Handle deleting a book
  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id).unwrap();
      alert('Book deleted successfully!');
      refetch();
    } catch (error) {
      console.error('Failed to delete book:', error.message);
      alert('Failed to delete book. Please try again.');
    }
  };

  return (
    <section className="py-8 px-4 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">Manage Books</h2>
          <Link
            to="/dashboard/add-book"
            className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-700 transition duration-200"
          >
            Add New Book
          </Link>
        </div>

        <div className="overflow-x-auto mt-6">
          <table className="table-auto w-full text-left text-gray-700">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm uppercase">
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">Book Title</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books && books.length > 0 ? (
                books.map((book, index) => (
                  <tr
                    key={book._id}
                    className="hover:bg-gray-50 border-b border-gray-200 transition duration-200"
                  >
                    <td className="px-6 py-4 text-sm">{index + 1}</td>
                    <td className="px-6 py-4 text-sm font-medium">{book.title}</td>
                    <td className="px-6 py-4 text-sm">{book.category}</td>
                    <td className="px-6 py-4 text-sm font-semibold">${book.newPrice}</td>
                    <td className="px-6 py-4 flex space-x-4">
                      <Link
                        to={`/dashboard/edit-book/${book._id}`}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition duration-200"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteBook(book._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500 text-sm"
                  >
                    No books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ManageBooks;
