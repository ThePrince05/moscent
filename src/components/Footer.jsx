// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you might add links to the footer later

export default function Footer() {
  return (
    // Changed background to Near Black (#0A0908)
    // Changed text color to Off-White/Light Gray (#F2F4F3)
    <footer className="bg-[#0A0908] text-[#F2F4F3] py-8 text-center mt-auto">
      <div className="max-w-screen-xl mx-auto px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Mo'Scent. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          {/* Example Footer Links (Optional) */}
          {/* Hover state for links now uses the vibrant accent red #D6001A */}
          <Link to="/privacy" className="hover:text-[#D6001A] transition-colors duration-200">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-[#D6001A] transition-colors duration-200">Terms of Service</Link>
          <Link to="/contact" className="hover:text-[#D6001A] transition-colors duration-200">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}