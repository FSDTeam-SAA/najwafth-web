"use client";

import React from "react";
import { Trash2, Plus, Minus, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

type CartItem = {
  _id: string;
  quantity: number;
  product?: {
    _id: string;
    title: string;
    price: number;
    stock: boolean;
  };
};

type CartResponse = {
  data?: {
    items?: CartItem[];
    totalAmount?: number;
  };
};

const CartPage = () => {
  const { data: session, status } = useSession();
  const TOKEN = session?.user?.accessToken;
  const queryClient = useQueryClient();
  const { t } = useTranslation();

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
      if (!res.ok) throw new Error(t("cart.fetchFail"));
      return res.json();
    },
    enabled: !!TOKEN,
  });

  const cartData = (cartResponse as CartResponse | undefined)?.data;
  const cartItems = cartData?.items || [];
  const totalAmount = cartData?.totalAmount || 0;

  const updateQuantityMutation = useMutation({
    mutationFn: async ({
      product,
      quantity,
    }: {
      product: string;
      quantity: number;
    }) => {
      if (!TOKEN) {
        throw new Error(t("cart.loginUpdate"));
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify({
            product,
            quantity,
          }),
        },
      );

      const result = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(result?.message || t("cart.updateFail"));
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", TOKEN] });
    },
    onError: (error: Error) => {
      toast.error(error.message || t("auth.somethingWrong"));
    },
  });

  // লোডিং স্টেট
  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 relative overflow-hidden">
        <div className="container mx-auto text-center">
          <div className="mb-8 flex flex-col items-center">
            <div className="h-10 w-44 animate-pulse rounded bg-[#e8eef4]" />
            <div className="mt-4 h-5 w-72 max-w-full animate-pulse rounded bg-[#e8eef4]" />
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={`cart-item-skeleton-${item}`}
                className="relative mb-5 flex flex-col items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm md:flex-row"
              >
                <div className="absolute right-4 top-4 h-5 w-5 animate-pulse rounded bg-[#e8eef4]" />

                <div className="flex w-full items-center gap-4 text-left">
                  <div className="h-20 w-20 shrink-0 animate-pulse rounded-lg bg-[#e8eef4]" />

                  <div className="flex-1 space-y-3">
                    <div className="h-5 w-56 max-w-[52vw] animate-pulse rounded bg-[#e8eef4]" />
                    <div className="h-4 w-32 animate-pulse rounded bg-[#e8eef4]" />
                    <div className="h-3 w-64 max-w-[46vw] animate-pulse rounded bg-[#e8eef4]" />
                    <div className="h-6 w-24 animate-pulse rounded bg-[#e8eef4]" />
                  </div>
                </div>

                <div className="mt-4 flex h-12 w-44 shrink-0 animate-pulse rounded-xl bg-[#e8eef4] md:mt-0" />
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-5 rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-3 text-left">
              <div className="h-4 w-32 animate-pulse rounded bg-[#e8eef4]" />
              <div className="h-7 w-56 animate-pulse rounded bg-[#e8eef4]" />
            </div>
            <div className="h-12 w-full animate-pulse rounded-xl bg-[#e8eef4] sm:w-48" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 relative overflow-hidden">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-serif text-gray-800">{t("cart.title")}</h1>
        <p className="text-gray-500 mt-2 mb-8 font-medium">
          {t("cart.subtitle")}
        </p>

        <div className="space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item, index: number) => (
              <div
                key={item._id || index}
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

                <Link
                  href={`/cart/${item.product?._id || item._id}`}
                  className="flex items-center gap-4 text-left w-full"
                >
                  <div className="relative w-20 h-20 shrink-0">
                    <Image
                      fill
                      src="/images/orderImage.jpg"
                      alt={item.product?.title || "Cart item"}
                      className="rounded-lg object-cover bg-gray-200"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-serif text-lg text-gray-800 hover:text-blue-500 transition-colors">
                      {item.product?.title || "Untitled"}
                    </h3>
                    <p className="text-gray-500 text-sm">{t("cart.unknownAuthor")}</p>
                    <p className="text-gray-400 text-xs flex items-center mt-1">
                      <span className="mr-1">📍</span> {t("cart.storeLocation")}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-blue-500 font-bold text-lg">
                      ${Number(item.product?.price || 0).toFixed(2)}
                      <ChevronRight size={16} className="mt-0.5" />
                    </div>
                  </div>
                </Link>

                {/* ৩. কোয়ান্টিটি সিলেক্টর (Link এর বাইরে জেনুইন বাটন হিসেবে) */}
                <div className="flex items-center gap-4 mt-4 md:mt-0 z-10">
                  <div className="flex items-center gap-4 border border-blue-100 rounded-xl px-4  bg-white shadow-sm">
                    <button
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-blue-300 hover:bg-blue-50 hover:text-blue-500"
                      disabled={updateQuantityMutation.isPending}
                      onClick={() => {
                        if (!item.product?._id) return;
                        updateQuantityMutation.mutate({
                          product: item.product._id,
                          quantity: (item.quantity || 1) - 1,
                        });
                      }}
                    >
                      <Minus size={22} />
                    </button>
                    <span className="font-bold text-gray-700 min-w-8 text-center text-xl">
                      {item.quantity || 1}
                    </span>
                    <button
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-blue-300 hover:bg-blue-50 hover:text-blue-500"
                      disabled={updateQuantityMutation.isPending}
                      onClick={() => {
                        if (!item.product?._id) return;
                        updateQuantityMutation.mutate({
                          product: item.product._id,
                          quantity: (item.quantity || 1) + 1,
                        });
                      }}
                    >
                      <Plus size={22} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-20 rounded-2xl border border-dashed border-gray-200 text-gray-400 text-xl">
              {t("cart.empty")}
            </div>
          )}
        </div>

        {/* ৪. চেকআউট সামারি (অতিরিক্ত সুবিধা) */}
        {cartItems.length > 0 && (
          <div className="mt-10 p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col gap-5 sm:flex-row sm:justify-between sm:items-center">
            <div className="text-left">
              <p className="text-gray-500">{t("cart.totalItems")}: {cartItems.length}</p>
              <p className="text-2xl font-bold text-gray-800">
                {t("cart.totalAmount")}: ${Number(totalAmount).toFixed(2)}
              </p>
            </div>
            <Link href="/checkout">
              <button className="w-full sm:w-auto bg-[linear-gradient(90deg,#5F83A2_0%,#5E92C0_100%)] hover:opacity-95 text-white px-10 py-3 rounded-xl font-bold text-lg transition-all shadow-lg shadow-[#5F83A2]/20">
                {t("cart.checkout")}
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
