import React from "react";
import {
  User,
  MapPin,
  Phone,
  ClipboardList,
  Wallet,
  ShoppingCart,
} from "lucide-react";

const CheckoutPage = () => {
  return (
    <div className="bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-xl p-10 shadow-sm">
        <div className="mb-10">
          <h1 className="text-4xl font-serif text-gray-800">Checkout</h1>
          <p className="text-gray-500 mt-1">Complete your order details</p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-gray-700 font-bold">
              <User size={18} className="text-blue-500" /> Name
            </label>
            <input
              type="text"
              placeholder="Tanjila Hafsa Lata"
              className="w-full bg-gray-100 border-none rounded-lg p-3 text-sm text-gray-500"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-gray-700 font-bold">
              <MapPin size={18} className="text-blue-500" /> Address
            </label>
            <input
              type="text"
              placeholder="Dhaka, Bangladesh"
              className="w-full bg-gray-100 border-none rounded-lg p-3 text-sm text-gray-500"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-gray-700 font-bold">
              <Phone size={18} className="text-blue-500" /> Phone number
            </label>
            <input
              type="text"
              placeholder="01810641003"
              className="w-full bg-gray-100 border-none rounded-lg p-3 text-sm text-gray-500"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-10">
          <h3 className="flex items-center gap-2 text-gray-700 font-bold mb-4 underline decoration-blue-500 underline-offset-8">
            <ClipboardList size={18} className="text-blue-500" /> Order Summary
          </h3>
          <div className="space-y-2 py-4 border-b border-gray-100">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>$12.99</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Delivery Fee</span>
              <span>$2.00</span>
            </div>
          </div>
          <div className="flex justify-between py-4 text-xl font-bold">
            <span className="text-gray-800">Total</span>
            <span className="text-blue-500">$14.99</span>
          </div>
        </div>

        {/* Payment */}
        <div className="mb-10">
          <h3 className="flex items-center gap-2 text-gray-700 font-bold mb-6">
            <Wallet size={18} className="text-blue-500" /> Payment
          </h3>
          <div className="bg-gray-50 rounded-xl p-8 flex justify-center items-center">
            <h2 className="text-blue-600 font-black text-4xl italic tracking-tighter">
              stripe
            </h2>
          </div>
        </div>

        <button className="w-full bg-blue-500 text-white rounded-lg py-4 font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
          <ShoppingCart size={18} /> Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
