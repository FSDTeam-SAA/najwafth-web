"use client";

import React from "react";
import {
  User,
  MapPin,
  Phone,
  ClipboardList,
  Wallet,
  ShoppingCart,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

const CheckoutPage = () => {
  const { data: session } = useSession();
  const TOKEN = session?.user?.accessToken;
  const router = useRouter();
  const queryClient = useQueryClient();
  const [address, setAddress] = React.useState("Demo street");

  const { data: cartResponse, isLoading } = useQuery<CartResponse>({
    queryKey: ["cart", TOKEN],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch cart");
      return res.json();
    },
    enabled: !!TOKEN,
  });

  const cartItems = cartResponse?.data?.items || [];
  const totalAmount = cartResponse?.data?.totalAmount || 0;

  const createOrderMutation = useMutation({
    mutationFn: async () => {
      if (!TOKEN) {
        throw new Error("Please login to place order");
      }

      if (cartItems.length === 0) {
        throw new Error("Your cart is empty");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/order/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify({
            items: cartItems.map((item) => ({
              product: item.product?._id,
              quantity: item.quantity || 1,
            })),
            address: address || "Demo street",
          }),
        },
      );

      const result = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(result?.message || "Failed to create order");
      }

      return result;
    },
    onSuccess: () => {
      toast.success("Order created successfully");
      queryClient.invalidateQueries({ queryKey: ["cart", TOKEN] });
      queryClient.invalidateQueries({ queryKey: ["my-order", TOKEN] });
      router.push("/order");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Demo street"
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
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between gap-4 text-gray-500"
                >
                  <span>
                    {item.product?.title || "Untitled"} x {item.quantity || 1}
                  </span>
                  <span>
                    ৳
                    {(
                      Number(item.product?.price || 0) * (item.quantity || 1)
                    ).toFixed(2)}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-gray-400">Your cart is empty.</div>
            )}
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>৳{Number(totalAmount).toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between py-4 text-xl font-bold">
            <span className="text-gray-800">Total</span>
            <span className="text-blue-500">
              ৳{Number(totalAmount).toFixed(2)}
            </span>
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

        <button
          disabled={createOrderMutation.isPending || cartItems.length === 0}
          onClick={() => createOrderMutation.mutate()}
          className="w-full bg-blue-500 disabled:bg-gray-400 disabled:shadow-none text-white rounded-lg py-4 font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
        >
          <ShoppingCart size={18} />{" "}
          {createOrderMutation.isPending ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
