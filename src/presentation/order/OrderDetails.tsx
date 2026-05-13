import { OrderItem } from "@/types/order/types";
import Image from "next/image";
import React from "react";

const OrderDetails: React.FC = () => {
  // ডামি ডাটা (Dummy Data)
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
      status: "Processing",
      img: "/images/orderImage.jpg",
    },
    {
      id: 2,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      address: "123 Library, Book City",
      price: 12.99,
      items: 2,
      status: "Processing",
      img: "/images/orderImage.jpg",
    },
  ];

  const statusSteps = [
    { title: "Pending", desc: "Order received by store", completed: true },
    {
      title: "Processing",
      desc: "Store is preparing your order",
      completed: true,
    },
    {
      title: "Picked",
      desc: "Delivery partner picked up order",
      completed: true,
    },
    {
      title: "Delivered",
      desc: "Order delivered successfully",
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans relative overflow-hidden">
      <div className="container mx-auto bg-white border border-gray-100 p-8 shadow-sm relative z-10">
        {/* হেডার */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-gray-800">Order Details</h1>
          <p className="text-gray-500 mt-1">Complete your order details</p>
        </div>

        {/* টপ কার্ড সেকশন - দুই ভাগে বিভক্ত (৫০% - ৫০%) */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* বাম পাশের অংশ (Address & Contact) - ৫০% */}
          <div className="lg:w-1/2 flex flex-col sm:flex-row gap-4">
            {/* ১. Delivery Address */}
            <div className="flex-1 border border-gray-100 rounded-xl p-5 bg-white shadow-sm">
              <h3 className="flex items-center gap-2 font-serif text-lg text-gray-700 mb-3">
                <span className="text-blue-500 text-xl">📍</span> Delivery
                Address
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {orderInfo.deliveryAddress}
              </p>
            </div>

            {/* ২. Contact Information */}
            <div className="flex-1 border border-gray-100 rounded-xl p-5 bg-white shadow-sm">
              <h3 className="flex items-center gap-2 font-serif text-lg text-gray-700 mb-3">
                <span className="text-blue-500 text-xl">📞</span> Contact
                Information
              </h3>
              <div className="space-y-1 text-sm">
                <p className="text-gray-400">
                  Date:{" "}
                  <span className="text-gray-700 font-bold">
                    {orderInfo.orderDate}
                  </span>
                </p>
                <p className="text-gray-400">
                  Phone:{" "}
                  <span className="text-gray-700 font-bold">
                    {orderInfo.phone}
                  </span>
                </p>
                <p className="text-gray-400">
                  ID:{" "}
                  <span className="text-gray-700 font-bold">
                    {orderInfo.orderId}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* ডান পাশের অংশ (Order Summary) - ৫০% */}
          <div className="lg:w-1/2 border border-gray-100 rounded-xl p-5 bg-white shadow-sm">
            <h3 className="flex items-center gap-2 font-serif text-lg text-gray-700 mb-3">
              <span className="text-blue-500 text-xl">📋</span> Order Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-bold text-gray-800">
                  ${orderInfo.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery Fee</span>
                <span className="font-bold text-gray-800">
                  ${orderInfo.deliveryFee.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t font-bold text-xl mt-2">
                <span className="text-gray-800">Total</span>
                <span className="text-blue-500">
                  ${orderInfo.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* আইটেম লিস্ট ডিজাইন ফিক্স */}
        <div className="border border-gray-100 rounded-xl p-6 mb-8">
          <h3 className="flex items-center gap-2 font-serif text-gray-700 mb-6">
            <span className="text-blue-500 text-xl">🛒</span> Items (
            {items.length})
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border border-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4 items-center">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-100">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-gray-800 font-bold leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-400 mb-1">{item.author}</p>
                    <p className="text-[10px] text-gray-400 flex items-center">
                      <span className="mr-1">📍</span> {item.address}
                    </p>
                    <div className="flex -space-x-1.5 mt-2">
                      <div className="w-4 h-4 rounded-full bg-yellow-700 border border-white"></div>
                      <div className="w-4 h-4 rounded-full bg-green-800 border border-white"></div>
                    </div>
                  </div>
                </div>
                <div className="text-right flex items-center gap-3">
                  <div>
                    <p className="text-blue-600 font-bold text-lg leading-none">
                      ${item.price}
                    </p>
                    <p className="text-[10px] text-blue-300 mt-1">
                      {item.items} items
                    </p>
                  </div>
                  <span className="text-blue-300 font-bold text-xl cursor-pointer">
                    ›
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* অর্ডার স্ট্যাটাস (Stepper) */}
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
                <div
                  className={`z-10 w-6 h-6 rounded-full flex items-center justify-center text-[10px] shadow-sm ${
                    step.completed
                      ? "bg-blue-500 text-white"
                      : "bg-white border border-blue-100 text-blue-300"
                  }`}
                >
                  {step.completed ? "✓" : ""}
                </div>
                <div className="-mt-0.5">
                  <h4
                    className={`text-sm font-bold ${step.completed ? "text-blue-600" : "text-blue-300"}`}
                  >
                    {step.title}
                  </h4>
                  <p className="text-xs text-blue-300/80">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
