"use client";
import { OrderItem, OrderStatus } from "@/types/order/types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react"; // সেশন থেকে টোকেন নিতে
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const OrderPage = () => {
  const { data: session } = useSession();
  const TOKEN = session?.user?.accessToken;

  const categories = ["All", "Pending", "Processing", "Picked", "Delivered"];
  const [activeTab, setActiveTab] = useState("All");

  // API থেকে ডাটা ফেচ করা
  const { data: orderResponse, isLoading } = useQuery({
    queryKey: ["my-order", TOKEN],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/order/my-orders?page=1&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        },
      );
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
    enabled: !!TOKEN, // টোকেন থাকলে কল হবে
  });

  // API ডাটা না থাকলে আপনার স্ট্যাটিক ডাটা দেখাবে (টেস্টিং এর জন্য)
  const myOrders: OrderItem[] = orderResponse?.data || [];

  // ফিল্টারিং লজিক
  const filteredOrders =
    activeTab === "All"
      ? myOrders
      : myOrders.filter(
          (order) => order.status.toLowerCase() === activeTab.toLowerCase(),
        );

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

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans relative overflow-hidden">
      <div className="container mx-auto">
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
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <Link
                key={order.id}
                href={`/order/${order.id}`}
                className="block"
              >
                <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 text-left">
                    <div className="relative w-24 h-24 overflow-hidden rounded-lg bg-gray-200">
                      <Image
                        src={order.img || "/images/placeholder.jpg"}
                        alt={order.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="font-serif text-lg text-gray-800 leading-tight">
                        {order.title}
                      </h3>
                      <p className="text-gray-500 text-sm">{order.author}</p>
                      <p className="text-gray-400 text-xs flex items-center mt-1">
                        <span className="mr-1">📍</span> {order.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between h-20">
                    <span
                      className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full ${getStatusStyle(order.status)}`}
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
            ))
          ) : (
            <div className="text-center py-20 text-gray-400 text-xl">
              No orders found in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
