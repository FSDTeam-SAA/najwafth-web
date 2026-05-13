"use client";
import { OrderItem, OrderStatus } from "@/types/order/types"; // OrderItem ইন্টারফেসটি ইম্পোর্ট করুন
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const OrderPage = () => {
  // ডাটাতে সরাসরি টাইপ বলে দিলে TS এরর আসবে না
  const orders: OrderItem[] = [
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
      status: "Pending",
      img: "/images/orderImage.jpg",
    },
    {
      id: 3,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      address: "123 Library, Book City",
      price: 12.99,
      items: 2,
      status: "Picked",
      img: "/images/orderImage.jpg",
    },
    {
      id: 4,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      address: "123 Library, Book City",
      price: 12.99,
      items: 2,
      status: "Delivered",
      img: "/images/orderImage.jpg",
    },
    {
      id: 5,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      address: "123 Library, Book City",
      price: 12.99,
      items: 2,
      status: "Processing",
      img: "/images/orderImage.jpg",
    },
  ];

  const categories = [
    "All",
    "Pending (2)",
    "Processing",
    "Picked (1)",
    "Delivered",
  ];
  const [activeTab, setActiveTab] = useState("All");

  // স্ট্যাটাস অনুযায়ী কালার নির্ধারণ - টাইপ সেফ করা হয়েছে
  const getStatusStyle = (status: OrderStatus) => {
    switch (status) {
      case "Processing":
        return "bg-green-100 text-green-600";
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      case "Picked":
        return "bg-orange-100 text-orange-600";
      case "Delivered":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans relative overflow-hidden">
      <div className="container mx-auto">
        {/* হেডার সেকশন */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-serif text-[#1A1A1A]">My Orders</h1>
          <p className="text-gray-500 text-lg mt-2">
            Manage & see my order list
          </p>
        </div>

        {/* ট্যাব ফিল্টার */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md border text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-[#5F83A2] text-white border-[#5F83A2] shadow-md"
                  : "bg-white text-[#5F83A2] border-[#5F83A2] hover:bg-blue-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* অর্ডার লিস্ট */}
        <div className="space-y-4">
          {orders.map((order) => (
            <Link key={order.id} href={`/order/${order.id}`} className="block">
              <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between shadow-[0px_1px_2px_-1px_#0000001A] hover:shadow-[0px_1px_3px_0px_#0000001A]">
                <div className="flex items-center gap-4 text-left">
                  {/* ইমেজ - Next.js Image Component */}
                  <div className="relative w-33 h-33 overflow-hidden rounded-lg bg-gray-200">
                    <Image
                      src={order.img}
                      alt={order.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* ইনফরমেশন */}
                  <div>
                    <h3 className="font-serif text-lg text-gray-800 leading-tight">
                      {order.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{order.author}</p>
                    <p className="text-gray-400 text-xs flex items-center mt-1">
                      <span className="mr-1">📍</span> {order.address}
                    </p>
                    {/* ছোট কালার সার্কেলগুলো */}
                    <div className="flex -space-x-2 mt-2">
                      <div className="w-5 h-5 rounded-full bg-[#8B5E3C] border-2 border-white"></div>
                      <div className="w-5 h-5 rounded-full bg-[#2D4F1E] border-2 border-white"></div>
                    </div>
                  </div>
                </div>

                {/* স্ট্যাটাস ও প্রাইস সেকশন */}
                <div className="flex flex-col items-end justify-between h-20">
                  <span
                    className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full ${getStatusStyle(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>

                  <div className="flex items-center gap-2 group">
                    <div className="text-right">
                      <p className="text-[#3B82F6] font-bold text-xl leading-none">
                        ${order.price}
                      </p>
                      <p className="text-blue-300 text-[10px] mt-1">
                        {order.items} Items
                      </p>
                    </div>
                    <span className="text-[#3B82F6] font-bold text-2xl leading-none group-hover:translate-x-1 transition-transform">
                      ›
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
