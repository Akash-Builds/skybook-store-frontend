import React from "react";
import bannerImg from "../../assets/banner.png";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12 bg-gradient-to-r from-indigo-100 via-white to-pink-100 px-8">
      {/* Image Section */}
      <div className="md:w-1/2 w-full flex items-center justify-center">
        <img
          src={bannerImg}
          alt="Books Banner"
          className="w-full max-w-md rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Text Section */}
      <div className="md:w-1/2 w-full text-center md:text-left">
        <h1 className="md:text-5xl text-3xl font-bold text-indigo-700 mb-7">
          New Released Books Here!
        </h1>
        <p className="mb-10 text-gray-600 leading-relaxed">
          Discover a world of knowledge and imagination with our latest collection of books. From thrilling stories to insightful non-fiction, there's something for everyone.
        </p>

        <button className="bg-indigo-600 text-white px-12 py-3 rounded-full text-lg font-semibold hover:bg-pink-500 hover:shadow-md transition-all duration-300">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Banner;
