"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react"; 
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// API Response এর জন্য টাইপ ডেফিনিশন
interface OrderProduct {
  _id: string;
  title: string;
  price: number;
  coverImage?: string; // নতুন ইমেজের ফিল্ড
}

interface OrderItemPayload {
  product: OrderProduct;
  quantity: number;
  price: number;
  _id: string;
}

interface Order {
  _id: string;
  orderId: string;
  items: OrderItemPayload[];
  totalAmount: number;
  shippingFee: number;
  discount: number;
  status: string;
  trackingNumber: string;
  expectedDeliveryDate: string;
  customer: {
    _id: string;
    email: string;
  };
  address: string;
  createdAt: string;
  updatedAt: string;
}

const OrderPage = () => {
  const { data: session, status } = useSession();
  const TOKEN = session?.user?.accessToken;
  const { t } = useTranslation();

  const statuses = ["All", "Pending", "Processing", "Picked", "Delivered"];
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
      if (!res.ok) throw new Error(t("order.fetchFail"));
      return res.json();
    },
    enabled: !!TOKEN, 
  });

  // API রেসপন্স থেকে orders অ্যারে নেওয়া
  const myOrders: Order[] = orderResponse?.data?.orders || [];

  // ফিল্টারিং লজিক
  const filteredOrders =
    activeTab === "All"
      ? myOrders
      : myOrders.filter(
          (order) => order.status.toLowerCase() === activeTab.toLowerCase(),
        );

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "bg-green-100 text-green-600";
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      case "picked":
        return "bg-orange-100 text-orange-600";
      case "delivered":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (status === "loading" || isLoading)
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans">
        <div className="container mx-auto">
          <div className="mb-10 flex flex-col items-center">
            <div className="h-12 w-56 animate-pulse rounded bg-[#e8eef4]" />
            <div className="mt-4 h-5 w-72 max-w-full animate-pulse rounded bg-[#e8eef4]" />
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {statuses.map((tab) => (
              <div
                key={`order-tab-skeleton-${tab}`}
                className="h-10 w-24 animate-pulse rounded-md bg-[#e8eef4]"
              />
            ))}
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={`order-card-skeleton-${item}`}
                className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="h-24 w-24 shrink-0 animate-pulse rounded-lg bg-[#e8eef4]" />
                  <div className="min-w-0 space-y-3">
                    <div className="h-5 w-52 max-w-[52vw] animate-pulse rounded bg-[#e8eef4]" />
                    <div className="h-4 w-36 animate-pulse rounded bg-[#e8eef4]" />
                    <div className="h-3 w-64 max-w-[46vw] animate-pulse rounded bg-[#e8eef4]" />
                  </div>
                </div>

                <div className="ml-4 flex h-20 shrink-0 flex-col items-end justify-between">
                  <div className="h-6 w-20 animate-pulse rounded-full bg-[#e8eef4]" />
                  <div className="space-y-2">
                    <div className="h-6 w-24 animate-pulse rounded bg-[#e8eef4]" />
                    <div className="ml-auto h-3 w-14 animate-pulse rounded bg-[#e8eef4]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-serif text-[#1A1A1A]">{t("order.title")}</h1>
          <p className="text-gray-500 text-lg mt-2">
            {t("order.subtitle")}
          </p>
        </div>

        {/* ট্যাব ফিল্টার */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {statuses.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md border text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-[#5F83A2] text-white border-[#5F83A2] shadow-md"
                  : "bg-white text-[#5F83A2] border-[#5F83A2] hover:bg-blue-50"
              }`}
            >
              {t(`order.${tab.toLowerCase()}`)}
            </button>
          ))}
        </div>

        {/* অর্ডার লিস্ট */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              // প্রথম প্রোডাক্টের ডাটা বের করা কার্ডে দেখানোর জন্য
              const firstItem = order.items?.[0];
              const productTitle = firstItem?.product?.title || t("cart.untitled");
              const productImage = firstItem?.product?.coverImage || "/images/placeholder.jpg";
              const totalItemsCount = order.items?.length || 0;

              return (
                <Link
                  key={order._id}
                  href={`/order/${order.orderId}`}
                  className="block"
                >
                  <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 text-left">
                      <div className="relative w-24 h-24 overflow-hidden rounded-lg bg-gray-100">
                        {/* API থেকে আসা রিয়েল coverImage ব্যবহার করা হয়েছে */}
                        <Image
                          src={productImage}
                          alt={productTitle}
                          fill
                          className="object-cover"
                          unoptimized // এক্সটার্নাল ইমেজ ডোমেইন কনফিগার করা না থাকলে এরর এড়াতে এটি ব্যবহার করতে পারেন
                        />
                      </div>

                      <div>
                        <h3 className="font-serif text-lg text-gray-800 leading-tight">
                          {productTitle}
                          {totalItemsCount > 1 && (
                            <span className="text-xs text-gray-400 block mt-1">
                              + {totalItemsCount - 1} {t("order.moreItems")}
                            </span>
                          )}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">{t("order.orderId")}: {order.orderId}</p>
                        <p className="text-gray-400 text-xs flex items-center mt-1">
                          <span className="mr-1">📍</span> {order.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between h-20">
                      <span
                        className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full ${getStatusStyle(order.status)}`}
                      >
                        {t(`order.${order.status.toLowerCase()}`)}
                      </span>

                      <div className="flex items-center gap-2 group">
                        <div className="text-right">
                          <p className="text-[#3B82F6] font-bold text-xl leading-none">
                            ৳{order.totalAmount}
                          </p>
                          <p className="text-blue-300 text-[10px] mt-1">
                            {totalItemsCount} {totalItemsCount > 1 ? t("order.items") : t("order.item")}
                          </p>
                        </div>
                        <span className="text-[#3B82F6] font-bold text-2xl leading-none group-hover:translate-x-1 transition-transform">
                          ›
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="text-center py-20 text-gray-400 text-xl">
              {t("order.noOrders")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
