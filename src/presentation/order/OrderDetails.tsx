"use client"; // <--- Add this line at the very top!

import { OrderItem } from "@/types/order/types";
import { Star } from "lucide-react";
import React, { useState } from "react";

const OrderDetails: React.FC = () => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  const orderInfo = {
    deliveryAddress: "123 Main Street, Apt 4B San Francisco, CA 94105",
    orderDate: "4/8/2026",
    phone: "01810641003",
    orderId: "ORD-9102",
    subtotal: 51.96,
    deliveryFee: 2.0,
    total: 53.96,
  };

  const items: OrderItem[] = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      address: "123 Library, Book City",
      price: 12.99,
      items: 2,
      status: "Delivered", 
      img: "/images/orderImage.jpg",
    },
    {
      id: 2,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      address: "123 Library, Book City",
      price: 12.99,
      items: 2,
      status: "Delivered",
      img: "/images/orderImage.jpg",
    },
  ];

  const statusSteps = [
    { title: "Pending", desc: "Order received by store", completed: true },
    { title: "Processing", desc: "Store is preparing your order", completed: true },
    { title: "Picked", desc: "Delivery partner picked up order", completed: true },
    { title: "Delivered", desc: "Order delivered successfully", completed: true },
  ];

  const openReviewModal = (title: string) => {
    setSelectedBook(title);
    setIsReviewOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans relative overflow-hidden">
      <div className="container mx-auto bg-white border border-gray-100 p-8 shadow-sm relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-gray-800">Order Details</h1>
          <p className="text-gray-500 mt-1">Review your purchase and status</p>
        </div>

        {/* ... the rest of the UI remains the same ... */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="lg:w-1/2 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 border border-gray-100 rounded-xl p-5 bg-white shadow-sm">
              <h3 className="flex items-center gap-2 font-serif text-lg text-gray-700 mb-3">
                <span className="text-blue-500 text-xl">📍</span> Delivery Address
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{orderInfo.deliveryAddress}</p>
            </div>
            <div className="flex-1 border border-gray-100 rounded-xl p-5 bg-white shadow-sm">
              <h3 className="flex items-center gap-2 font-serif text-lg text-gray-700 mb-3">
                <span className="text-blue-500 text-xl">📞</span> Contact Info
              </h3>
              <div className="space-y-1 text-sm text-gray-400">
                <p>Date: <span className="text-gray-700 font-bold">{orderInfo.orderDate}</span></p>
                <p>Phone: <span className="text-gray-700 font-bold">{orderInfo.phone}</span></p>
                <p>ID: <span className="text-gray-700 font-bold">{orderInfo.orderId}</span></p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 border border-gray-100 rounded-xl p-5 bg-white shadow-sm">
            <h3 className="flex items-center gap-2 font-serif text-lg text-gray-700 mb-3">
              <span className="text-blue-500 text-xl">📋</span> Order Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-bold text-gray-800">${orderInfo.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery Fee</span>
                <span className="font-bold text-gray-800">${orderInfo.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t font-bold text-xl mt-2">
                <span className="text-gray-800">Total</span>
                <span className="text-blue-500">${orderInfo.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-gray-100 rounded-xl p-6 mb-8">
          <h3 className="flex items-center gap-2 font-serif text-gray-700 mb-6">
            <span className="text-blue-500 text-xl">🛒</span> Items ({items.length})
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {items.map((item, index) => (
              <div key={index} className="flex items-center justify-between border border-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-4 items-center">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-100">
                    <img src={item.img} alt={item.title} className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <h4 className="font-serif text-gray-800 font-bold leading-tight">{item.title}</h4>
                    <p className="text-xs text-gray-400 mb-1">{item.author}</p>
                    <p className="text-[10px] text-gray-400 flex items-center">📍 {item.address}</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-6">
                  {item.status === "Delivered" && (
                    <button 
                      onClick={() => openReviewModal(item.title)}
                      className="text-xs font-bold text-blue-500 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 hover:bg-blue-500 hover:text-white transition-all"
                    >
                      Write Review
                    </button>
                  )}
                  <div>
                    <p className="text-blue-600 font-bold text-lg leading-none">${item.price}</p>
                    <p className="text-[10px] text-blue-300 mt-1">{item.items} items</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-gray-100 rounded-xl p-6">
          <h3 className="flex items-center gap-2 font-serif text-xs text-gray-700 mb-8 font-bold uppercase tracking-wider">
            <span className="text-blue-500">⚙️</span> Order Status
          </h3>
          <div className="max-w-md">
            {statusSteps.map((step, index) => (
              <div key={index} className="relative flex gap-4 pb-8 last:pb-0">
                {index !== statusSteps.length - 1 && (
                  <div className="absolute left-[11px] top-6 w-[0.5px] h-full bg-blue-100"></div>
                )}
                <div className={`z-10 w-6 h-6 rounded-full flex items-center justify-center text-[10px] shadow-sm ${step.completed ? "bg-blue-500 text-white" : "bg-white border border-blue-100 text-blue-300"}`}>
                  {step.completed ? "✓" : ""}
                </div>
                <div className="-mt-0.5">
                  <h4 className={`text-sm font-bold ${step.completed ? "text-blue-600" : "text-blue-300"}`}>{step.title}</h4>
                  <p className="text-xs text-blue-300/80">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Dialog/Modal - UI based on image_cc5b60.png */}
      {isReviewOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=madiha" alt="User" className="w-full h-full object-cover" />
              </div>
              <span className="font-semibold text-gray-800">Madiha Lata</span>
            </div>

            <div className="flex gap-1.5 mb-6">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={24} fill="#FACC15" color="#FACC15" className="cursor-pointer" />
              ))}
            </div>

            <textarea
              className="w-full border border-gray-200 rounded-xl p-4 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none min-h-[120px]"
              placeholder="Write a short review to help fellow books lovers..."
            />

            <div className="flex gap-3 mt-8">
              <button 
                onClick={() => setIsReviewOpen(false)}
                className="flex-1 py-3 px-4 border border-blue-400 text-blue-400 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 py-3 px-4 bg-[#6392b9] text-white rounded-xl font-semibold hover:bg-[#537da1] transition-colors shadow-md">
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;