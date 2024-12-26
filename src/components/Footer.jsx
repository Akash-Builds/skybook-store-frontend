import React from "react";
import footerLogo from "../assets/footer-logo.png";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-10 px-6">
      {/* Top Section */}
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        {/* Logo and Links */}
        <div className="flex-1">
          <img src={footerLogo} alt="Logo" className="w-40 mb-4" />
          <ul className="flex gap-8 text-sm font-medium">
            <li>
              <a href="#home" className="hover:text-pink-300 transition-all duration-300">
                Home
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-pink-300 transition-all duration-300">
                Services
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-pink-300 transition-all duration-300">
                About Us
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-pink-300 transition-all duration-300">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex-1">
          <p className="mb-4 text-sm">
            Subscribe to our newsletter for the latest updates, news, and offers!
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 text-gray-800 rounded-l-md focus:outline-none"
            />
            <button className="bg-pink-400 px-6 py-2 rounded-r-md text-white hover:bg-pink-500 transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-screen-xl mx-auto mt-8 border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Privacy and Terms */}
        <ul className="flex gap-8 text-sm font-medium">
          <li>
            <a href="#privacy" className="hover:text-pink-300 transition-all duration-300">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#terms" className="hover:text-pink-300 transition-all duration-300">
              Terms of Service
            </a>
          </li>
        </ul>

        {/* Social Media Icons */}
        <div className="flex gap-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-300 transition-all duration-300"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-300 transition-all duration-300"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-300 transition-all duration-300"
          >
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
