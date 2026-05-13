import React from 'react';
import { ClipboardList, Wallet } from 'lucide-react';

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 flex justify-center items-center">
      <div className="max-w-3xl w-full bg-white border border-gray-100 rounded-xl p-12 shadow-sm text-center">
        {/* Confetti Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <span className="text-7xl">🎉</span>
          </div>
        </div>

        <h1 className="text-4xl font-serif text-gray-800">Order Confirmed</h1>
        <p className="text-gray-500 mt-4 text-lg max-w-lg mx-auto leading-relaxed">
          Thank you for your purchase. Your order has been received and is currently being processed by the sellers.
        </p>

        {/* Status Badge */}
        <div className="mt-12 flex justify-between items-center text-left">
          <span className="font-bold text-gray-800">Status:</span>
          <span className="bg-yellow-100 text-yellow-600 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Pending</span>
        </div>

        {/* Summary */}
        <div className="mt-4 text-left">
          <h3 className="flex items-center gap-2 text-gray-700 font-bold mb-4">
            <ClipboardList size={18} className="text-blue-500" /> Order Summary
          </h3>
          <div className="space-y-2 py-4 border-b border-gray-100 text-sm">
            <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>$12.99</span></div>
            <div className="flex justify-between text-gray-500"><span>Delivery Fee</span><span>$2.00</span></div>
          </div>
          <div className="flex justify-between py-4 text-xl font-bold">
            <span className="text-gray-800">Total</span>
            <span className="text-blue-500">$14.99</span>
          </div>
        </div>

        {/* Payment Info */}
        <div className="mt-4 text-left">
          <h3 className="flex items-center gap-2 text-gray-700 font-bold mb-4">
            <Wallet size={18} className="text-blue-500" /> Payment
          </h3>
          <div className="bg-gray-50 rounded-xl p-6 flex justify-center">
             <h2 className="text-blue-600 font-black text-3xl italic tracking-tighter">stripe</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;