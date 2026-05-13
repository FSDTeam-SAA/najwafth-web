import React from "react";
import { ShoppingCart, Star, Plus, Minus } from "lucide-react";
import Link from "next/link";

const CartDetailsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="container mx-auto bg-white border border-gray-100 p-10 shadow-sm">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-gray-800">Add to Cart</h1>
          <p className="text-gray-500 mt-1">Complete your order details</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400"
              className="w-full h-[400px] object-cover rounded-xl shadow-lg"
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
    </div>
  );
};

export default CartDetailsPage;
