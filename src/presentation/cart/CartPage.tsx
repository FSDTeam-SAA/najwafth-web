"use client";

import React from "react";
import { Trash2, Plus, Minus, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const CartPage = () => {
  const { data: session } = useSession();
  const TOKEN = session?.user?.accessToken;
  const queryClient = useQueryClient();

  // ১. ফেচিং লজিক ফিক্স (টোকেনসহ এবং ডাটা রিটার্ন)
  const { data: cartResponse, isLoading } = useQuery({
    queryKey: ["cart", TOKEN],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        },
      );
      if (!res.ok) throw new Error("Failed to fetch cart");
      return res.json();
    },
    enabled: !!TOKEN,
  });

  const cartItems = cartResponse?.data || [];

  // লোডিং স্টেট
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 relative overflow-hidden">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-4xl font-serif text-gray-800">My Cart</h1>
        <p className="text-gray-500 mt-2 mb-8 font-medium">
          Manage & see my My Cart list
        </p>

        <div className="space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item: any, index: number) => (
              <div
                key={item.id || index}
                className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between shadow-sm relative mb-5 transition-all hover:shadow-md"
              >
                {/* ২. ডিলিট বাটন (Link এর বাইরে রাখা হয়েছে যাতে ক্লিক করলে পেজ চেঞ্জ না হয়) */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // এখানে ডিলিট মিউটেশন কল করবেন
                  }}
                  className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors z-10"
                >
                  <Trash2 size={18} />
                </button>

                <div className="flex items-center gap-4 text-left w-full">
                  <div className="relative w-20 h-20 shrink-0">
                    <Image
                      fill
                      src={item.img || "/images/orderImage.jpg"}
                      alt={item.title}
                      className="rounded-lg object-cover bg-gray-200"
                    />
                  </div>

                  <div className="flex-1">
                    <Link href={`/cart/${item?.id}`}>
                      <h3 className="font-serif text-lg text-gray-800 hover:text-blue-500 transition-colors">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-gray-500 text-sm">{item.author}</p>
                    <p className="text-gray-400 text-xs flex items-center mt-1">
                      <span className="mr-1">📍</span>{" "}
                      {item.location || "Store Location"}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-blue-500 font-bold text-lg">
                      ${item.price}
                      <ChevronRight size={16} className="mt-0.5" />
                    </div>
                  </div>
                </div>

                {/* ৩. কোয়ান্টিটি সিলেক্টর (Link এর বাইরে জেনুইন বাটন হিসেবে) */}
                <div className="flex items-center gap-4 mt-4 md:mt-0 z-10">
                  <div className="flex items-center gap-3 border border-blue-100 rounded-lg px-3 py-1.5 bg-white shadow-sm">
                    <button className="text-blue-300 hover:text-blue-500 p-1">
                      <Minus size={18} />
                    </button>
                    <span className="font-bold text-gray-700 min-w-6 text-center text-lg">
                      {item.quantity || 1}
                    </span>
                    <button className="text-blue-300 hover:text-blue-500 p-1">
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-20 rounded-2xl border border-dashed border-gray-200 text-gray-400 text-xl">
              Your cart is empty.
            </div>
          )}
        </div>

        {/* ৪. চেকআউট সামারি (অতিরিক্ত সুবিধা) */}
        {cartItems.length > 0 && (
          <div className="mt-10 p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
            <div className="text-left">
              <p className="text-gray-500">Total Items: {cartItems.length}</p>
              <p className="text-2xl font-bold text-gray-800">Total: $120.00</p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-3 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-100">
              Checkout Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
