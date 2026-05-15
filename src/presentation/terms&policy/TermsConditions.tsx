"use client";

import React from "react";

const TermsConditions = () => {
  const sections = [
    {
      id: "1",
      title: "Acceptance of Terms",
      content:
        "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.",
    },
    {
      id: "2",
      title: "Use of Service",
      content:
        "You agree to use our service only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website.",
    },
    {
      id: "3",
      title: "Account Registration",
      content:
        "To access certain features, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.",
    },
    {
      id: "4",
      title: "Orders and Payment",
      content:
        "All orders are subject to availability and confirmation of the order price. We reserve the right to refuse any order. Payment must be made in full before shipment of goods.",
    },
    {
      id: "4",
      title: "Modifications to Terms",
      content:
        "We reserve the right to modify these terms at any time. Your continued use of the website after changes constitutes acceptance of the modified terms.",
    },
    {
      id: "5",
      title: "Contact Information",
      content:
        "For any questions regarding these terms and conditions, please contact us at support@bookstore.com",
    },
  ];

  return (
    <div className="w-full bg-white font-sans">
      {/* Header Section */}
      <div className="py-10 text-center border-b border-gray-100 bg-[#FAFAFA]">
        <h1 className="text-4xl font-serif text-gray-900 mb-2">Terms & Conditions</h1>
        <p className="text-gray-600 text-lg">See all Terms & Conditions</p>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-[#F9FAFB] rounded p-8 md:p-12">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index}>
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

export default TermsConditions;