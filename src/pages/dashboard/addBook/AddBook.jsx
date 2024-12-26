import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../../redux/features/books/booksApi';
import Swal from 'sweetalert2';

const AddBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [imageFile, setImageFile] = useState(null);
  const [addBook, { isLoading }] = useAddBookMutation();
  const [imageFileName, setImageFileName] = useState('');

  const onSubmit = async (data) => {
    const newBookData = {
      ...data,
      coverImage: imageFileName,
    };
    try {
      await addBook(newBookData).unwrap();
      Swal.fire({
        title: 'Book Added',
        text: 'Your book has been uploaded successfully!',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: "OK",
      });
      reset();
      setImageFileName('');
      setImageFile(null);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to add the book. Please try again.',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: "Retry",
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Add a New Book</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Title */}
        <InputField
          label="Book Title"
          name="title"
          placeholder="Enter the book title"
          register={register}
        />

        {/* Description */}
        <InputField
          label="Description"
          name="description"
          placeholder="Enter the book description"
          type="textarea"
          register={register}
        />

        {/* Category */}
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Select a category' },
            { value: 'business', label: 'Business' },
            { value: 'technology', label: 'Technology' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'horror', label: 'Horror' },
            { value: 'adventure', label: 'Adventure' },
          ]}
          register={register}
        />

        {/* Trending Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register('trending')}
            className="rounded-md border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label className="text-sm font-medium text-gray-600">Trending</label>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InputField
            label="Old Price"
            name="oldPrice"
            type="number"
            placeholder="Enter the old price"
            register={register}
          />

          <InputField
            label="New Price"
            name="newPrice"
            type="number"
            placeholder="Enter the new price"
            register={register}
          />
        </div>

        {/* Cover Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-lg w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {imageFileName && (
            <p className="text-sm text-gray-500 mt-2">Selected: {imageFileName}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default AddBook;

