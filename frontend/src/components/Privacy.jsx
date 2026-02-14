import React from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-12 min-h-screen bg-gray-50 text-gray-800 px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-emerald-700">Privacy Policy</h1>
        <p className="mb-4">
          Welcome to GoCeylon! Your privacy is important to us. This policy explains how we
          collect, use, and protect your personal information...
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-3">1. Information We Collect</h2>
        <p>We may collect basic data such as your name, email, and travel preferences...</p>
        <h2 className="text-2xl font-semibold mt-8 mb-3">2. How We Use Information</h2>
        <p>Your data helps us improve trip recommendations and enhance user experience...</p>
        <h2 className="text-2xl font-semibold mt-8 mb-3">3. Image and Copyright Notice</h2>
        <p>
          All images are used for educational and non-commercial purposes. Image rights remain with
          their respective owners.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-3">4. Contact Us</h2>
        <p>
          For privacy concerns, contact us at{" "}
          <a href="mailto:privacy@goceylon.com" className="text-emerald-600 underline">
            privacy@goceylon.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
