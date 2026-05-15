"use client";

import React from "react";

const PrivacyPolicy = () => {
  const sections = [
    {
      id: "1",
      title: "Information We Collect",
      content:
        "We collect information that you provide directly to us, including your name, email address, phone number, shipping address, and payment information when you create an account or place an order.",
    },
    {
      id: "2",
      title: "How We Use Your Information",
      content:
        "We use the information we collect to process your orders, communicate with you about your purchases, send you marketing communications (with your consent), and improve our services.",
    },
    {
      id: "3",
      title: "Information Sharing",
      content:
        "We do not sell or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business.",
    },
    {
      id: "4",
      title: "Data Security",
      content:
        "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.",
    },
    {
      id: "5",
      title: "Your Rights",
      content:
        "You have the right to access, update, or delete your personal information at any time. You can manage your account settings or contact us directly for assistance.",
    },
    {
      id: "6",
      title: "Contact Us",
      content:
        "If you have any questions about this Privacy Policy, please contact us at privacy@bookstore.com",
    },
  ];

  return (
    <div className="w-full bg-white font-sans">
      {/* Header Section */}
      <div className="py-10 text-center border-b border-gray-100 bg-[#FAFAFA]">
        <h1 className="text-4xl font-serif text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-600 text-lg">See all Privacy Policy</p>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-[#F9FAFB] rounded p-8 md:p-12 shadow">
          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.id}>
                <h3 className="text-xl font-bold text-gray-800 mb-3 font-serif">
                  {section.id}. {section.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-base">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer info */}
        <p className="mt-8 text-gray-400 text-base">
          Last updated: May 9, 2026
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;