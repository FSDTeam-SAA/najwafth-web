"use client"
import React, { useState } from "react";
import { ShoppingCart, Star, Plus, Minus, X } from "lucide-react";
import Link from "next/link";

const CartDetailsPage = () => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(true); // Set to true to show the button

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="container mx-auto bg-white border border-gray-100 p-10 shadow-sm relative">
        
        {/* Review Button - Only shows if orderCompleted is true */}
        {orderCompleted && (
          <div className="absolute top-10 right-10">
            <button 
              onClick={() => setIsReviewOpen(true)}
              className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-200 transition-colors border border-green-200"
            >
              Write a Review
            </button>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-4xl font-serif text-gray-800">Add to Cart</h1>
          <p className="text-gray-500 mt-1">Complete your order details</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400"
              className="w-full h-100 object-cover rounded-xl shadow-lg"
              alt="book"
            />
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 flex flex-col justify-start">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-serif text-gray-800">
                  The Great Gatsby
                </h2>
                <p className="text-gray-500 mt-1">F. Scott Fitzgerald</p>
                <p className="text-gray-400 text-sm mt-1">
                  📍 123 Library, Book City
                </p>
              </div>
              <div className="flex items-center gap-1 text-yellow-400 font-bold">
                <Star size={20} fill="currentColor" /> 4.8
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-3xl font-bold text-blue-500">$ 12.99</h3>
              <p className="text-blue-300 text-sm">2 items</p>
            </div>

            <div className="flex items-center gap-4 mt-8 w-full">
              <div className="flex-1 flex items-center gap-4 border border-blue-400 rounded-lg px-4 py-3 bg-white justify-between">
                <button className="text-gray-400">
                  <Minus size={18} />
                </button>
                <span className="font-bold">1</span>
                <button className="text-gray-400">
                  <Plus size={18} />
                </button>
              </div>

              <Link href="/checkout" className="flex-1">
                <button className="w-full bg-blue-500 text-white rounded-lg px-6 py-3 font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
                  <ShoppingCart size={18} />
                  Add to Cart - $12.99
                </button>
              </Link>
            </div>

            <div className="mt-8">
              <h4 className="font-serif text-lg text-gray-800 mb-2 underline decoration-blue-500 underline-offset-4">
                Description
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed text-justify">
                A dazzling novel about all the choices that go into a life well
                lived, from the internationally bestselling author of Reasons to
                Stay Alive and How To Stop Time. Somewhere out beyond the edge
                of the universe there is a library that contains an infinite
                number of books, each one the story of another reality...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Review Dialog/Modal - Design based on image_cc5b60.png */}
      {isReviewOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
            {/* Background pattern decoration (optional) */}
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                <svg width="100" height="100" viewBox="0 0 100 100">
                    <path d="M10 10 Q 50 10 50 50 T 90 90" stroke="currentColor" fill="transparent" />
                </svg>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="https://i.pravatar.cc/150?u=madiha" 
                alt="Profile" 
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <span className="font-semibold text-gray-800 text-lg">Madiha Lata</span>
            </div>

            {/* Star Rating */}
            <div className="flex gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={28} className="text-yellow-400 cursor-pointer" />
              ))}
            </div>

            {/* Text Area */}
            <textarea
              className="w-full border border-gray-200 rounded-xl p-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none mb-8"
              rows={4}
              placeholder="Write a short review to help fellow books lovers..."
            ></textarea>

            {/* Actions */}
            <div className="flex gap-4">
              <button 
                onClick={() => setIsReviewOpen(false)}
                className="flex-1 py-3 px-6 border-2 border-blue-400 text-blue-500 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                className="flex-1 py-3 px-6 bg-[#6392b9] text-white rounded-xl font-semibold hover:bg-[#537da1] transition-colors"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDetailsPage;