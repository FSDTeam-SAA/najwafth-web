"use client";

import { useParams } from "next/navigation"; // URL থেকে ID নেওয়ার জন্য
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Star } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// API Response এর জন্য সঠিক টাইপ ডেফিনিশন
interface OrderProduct {
  _id: string;
  title: string;
  price: number;
  coverImage?: string;
}

interface OrderItemPayload {
  product: OrderProduct;
  quantity: number;
  price: number;
  _id: string;
}

interface OrderDetailsData {
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
  vendor: {
    _id: string;
  };
  address: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const OrderDetails: React.FC = () => {
  const params = useParams();
  const id = params?.id; // URL params থেকে id নেওয়া হলো

  const { data: session } = useSession();
  const TOKEN = session?.user?.accessToken;
  const { t } = useTranslation();

  // ইন-লাইন রিভিউ সেকশনের জন্য স্টেট
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");

  // Single Order API থেকে ডাটা ফেচ করা
  const {
    data: orderResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order-details", id, TOKEN],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/order/${id}`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        },
      );
      if (!res.ok) throw new Error(t("order.fetchDetailFail"));
      return res.json();
    },
    enabled: !!id && !!TOKEN,
  });

  // API রেসপন্স থেকে মেইন ডাটা অবজেক্ট নেওয়া
  const orderInfo: OrderDetailsData = orderResponse?.data;

  // স্ট্যাটাস ট্র্যাকিং ডাইনামিক করার লজিক
  const getStatusSteps = (currentStatus: string = "") => {
    const statuses = ["pending", "processing", "picked", "delivered"];
    const currentIndex = statuses.indexOf(currentStatus.toLowerCase());

    return [
      {
        title: t("order.pending"),
        desc: t("order.stepPending"),
        completed: currentIndex >= 0,
      },
      {
        title: t("order.processing"),
        desc: t("order.stepProcessing"),
        completed: currentIndex >= 1,
      },
      {
        title: t("order.picked"),
        desc: t("order.stepPicked"),
        completed: currentIndex >= 2,
      },
      {
        title: t("order.delivered"),
        desc: t("order.stepDelivered"),
        completed: currentIndex >= 3,
      },
    ];
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error || !orderInfo)
    return (
      <div className="text-center py-20 text-red-500 font-sans text-xl">
        {t("order.detailNotFound")}
      </div>
    );

  const statusSteps = getStatusSteps(orderInfo.status);
  const formattedDate = new Date(orderInfo.createdAt).toLocaleDateString();
  const isDelivered = orderInfo.status.toLowerCase() === "delivered";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans relative overflow-hidden">
      <div className="container mx-auto bg-white border border-gray-100 p-8 shadow-sm relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-gray-800">{t("order.detailsTitle")}</h1>
          <p className="text-gray-500 mt-1">{t("order.detailsSub")}</p>
        </div>

        {/* Address and Summary Info */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="lg:w-1/2 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 border border-gray-100 rounded-xl p-5 bg-white shadow-sm">
              <h3 className="flex items-center gap-2 font-serif text-lg text-gray-700 mb-3">
                <span className="text-blue-500 text-xl">📍</span> {t("order.deliveryAddress")}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {orderInfo.address}
              </p>
            </div>
            <div className="flex-1 border border-gray-100 rounded-xl p-5 bg-white shadow-sm">
              <h3 className="flex items-center gap-2 font-serif text-lg text-gray-700 mb-3">
                <span className="text-blue-500 text-xl">📞</span> {t("order.contactInfo")}
              </h3>
              <div className="space-y-1 text-sm text-gray-400">
                <p>
                  {t("order.date")}:{" "}
                  <span className="text-gray-700 font-bold">
                    {formattedDate}
                  </span>
                </p>
                <p>
                  {t("contact.email")}:{" "}
                  <span className="text-gray-700 font-bold">
                    {orderInfo.customer?.email}
                  </span>
                </p>
                <p>
                  {t("order.orderId")}:{" "}
                  <span className="text-gray-700 font-bold">
                    {orderInfo.orderId}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 border border-gray-100 rounded-xl p-5 bg-white shadow-sm">
            <h3 className="flex items-center gap-2 font-serif text-lg text-gray-700 mb-3">
              <span className="text-blue-500 text-xl">📋</span> {t("order.orderSummary")}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>{t("order.subtotal")}</span>
                <span className="font-bold text-gray-800">
                  ৳
                  {orderInfo.totalAmount -
                    orderInfo.shippingFee +
                    orderInfo.discount}
                </span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>{t("order.deliveryFee")}</span>
                <span className="font-bold text-gray-800">
                  ৳{orderInfo.shippingFee}
                </span>
              </div>
              {orderInfo.discount > 0 && (
                <div className="flex justify-between text-green-500">
                  <span>{t("order.discount")}</span>
                  <span className="font-bold">-৳{orderInfo.discount}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t font-bold text-xl mt-2">
                <span className="text-gray-800">{t("order.total")}</span>
                <span className="text-blue-500">৳{orderInfo.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="border border-gray-100 rounded-xl p-6 mb-8">
          <h3 className="flex items-center gap-2 font-serif text-gray-700 mb-6">
            <span className="text-blue-500 text-xl">🛒</span> Items (
            {orderInfo.items?.length || 0})
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {orderInfo.items?.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border border-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4 items-center">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                    <img
                      src={
                        item.product?.coverImage || "/images/placeholder.jpg"
                      }
                      alt={item.product?.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-gray-800 font-bold leading-tight">
                      {item.product?.title || t("cart.untitled")}
                    </h4>
                    <p className="text-xs text-gray-400 mb-1">
                      {t("order.quantity")}: {item.quantity}
                    </p>
                    <p className="text-[10px] text-gray-400 flex items-center">
                      📍 {orderInfo.address}
                    </p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-6">
                  <div>
                    <p className="text-blue-600 font-bold text-lg leading-none">
                      ৳{item.price}
                    </p>
                    <p className="text-[10px] text-blue-300 mt-1">
                      {item.quantity} pcs
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* {t("order.status")} Section */}
        <div className="border border-gray-100 rounded-xl p-6 mb-8">
          <h3 className="flex items-center gap-2 font-serif text-xs text-gray-700 mb-8 font-bold uppercase tracking-wider">
            <span className="text-blue-500">⚙️</span> {t("order.status")}
          </h3>
          <div className="max-w-md">
            {statusSteps.map((step, index) => (
              <div key={index} className="relative flex gap-4 pb-8 last:pb-0">
                {index !== statusSteps.length - 1 && (
                  <div className="absolute left-[11px] top-6 w-[0.5px] h-full bg-blue-100"></div>
                )}
                <div
                  className={`z-10 w-6 h-6 rounded-full flex items-center justify-center text-[10px] shadow-sm ${step.completed ? "bg-blue-500 text-white" : "bg-white border border-blue-100 text-blue-300"}`}
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

        {isDelivered && (
          <div className="border border-gray-200 bg-white rounded-2xl p-8 max-w-sm w-full ">
            {/* ইউজার প্রোফাইল সেকশন */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src="https://i.pravatar.cc/150?u=madiha"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-semibold text-gray-800">Madiha Lata</span>
            </div>

            {/* ইন্টারেক্টিভ গোল্ডেন স্টার সিলেকশন */}
            <div className="flex gap-1.5 mb-6">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={24}
                  fill={s <= rating ? "#FACC15" : "none"}
                  color="#FACC15"
                  className="cursor-pointer transition-colors"
                  onClick={() => setRating(s)}
                />
              ))}
            </div>

            {/* রিভিউ টেক্সট এরিয়া */}
            <textarea
              className="w-full border border-gray-200 rounded-xl p-4 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none min-h-[120px]"
              placeholder={t("order.reviewPlaceholder")}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            {/* ক্যানসেল এবং পোস্ট বাটন */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => {
                  setRating(0);
                  setReviewText("");
                }}
                className="flex-1 py-3 px-4 border border-blue-400 text-blue-400 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                {t("account.cancel")}
              </button>
              <button
                className="flex-1 py-3 px-4 bg-[#6392b9] text-white rounded-xl font-semibold hover:bg-[#537da1] transition-colors shadow-md"
                onClick={() => {
                  console.log({ rating, reviewText });
                  // আপনার রিভিউ সাবমিট API হ্যান্ডলার এখানে দিতে পারেন।
                }}
              >
                {t("order.post")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
