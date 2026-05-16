"use client";
import React, { useState } from "react";
import { Star, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

type ProductDetails = {
  _id: string;
  title?: string;
  author?: string;
  price?: number;
  stock?: boolean;
  coverImage?: string;
  thumbnail?: string;
  description?: string;
  shopId?: {
    name?: string;
  };
  category?: {
    name?: string;
  };
};

type ProductResponse = {
  data?: ProductDetails;
};

type CartResponse = {
  data?: {
    items?: {
      product?: {
        _id?: string;
      };
      quantity: number;
    }[];
  };
};

const CartDetailsPage = ({ cartItemId }: { cartItemId: string }) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [orderCompleted] = useState(true); // Set to true to show the button
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const TOKEN = session?.user?.accessToken;

  const { data: productResponse, isLoading } = useQuery<ProductResponse>({
    queryKey: ["book-details", cartItemId, TOKEN],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/books/${cartItemId}`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to fetch product details");
      }

      return res.json();
    },
    enabled: !!TOKEN && !!cartItemId,
  });

  const { data: cartResponse } = useQuery<CartResponse>({
    queryKey: ["cart", TOKEN],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch cart");
      }

      return res.json();
    },
    enabled: !!TOKEN,
  });

  const product = productResponse?.data;
  const cartItem = cartResponse?.data?.items?.find(
    (item) => item.product?._id === cartItemId,
  );
  const cartQuantity = cartItem?.quantity || 1;
  const productTitle = product?.title || "Untitled";
  const productAuthor = product?.author || "Unknown Author";
  const productPrice = Number(product?.price || 0);
  const productImage =
    product?.coverImage ||
    product?.thumbnail ||
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400";
  const productDescription =
    product?.description ||
    "A dazzling novel about all the choices that go into a life well lived, from the internationally bestselling author of Reasons to Stay Alive and How To Stop Time. Somewhere out beyond the edge of the universe there is a library that contains an infinite number of books, each one the story of another reality...";

  const updateQuantityMutation = useMutation({
    mutationFn: async (quantity: number) => {
      if (!TOKEN) {
        throw new Error("Please login to update cart");
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
            product: cartItemId,
            quantity,
          }),
        },
      );

      const result = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(result?.message || "Failed to update cart");
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", TOKEN] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  if (status === "loading" || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-4">
        <div className="container mx-auto bg-white border border-gray-100 p-10 shadow-sm text-center">
          <h1 className="text-4xl font-serif text-gray-800">
            Product not found
          </h1>
          <p className="text-gray-500 mt-2">
            This product is not available right now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="container mx-auto bg-white border border-gray-100 p-10 shadow-sm relative">
        {/* Review Button - Only shows if orderCompleted is true */}
        {orderCompleted && (
          <div className="absolute top-10 right-10">
            <button
              onClick={() => setIsReviewOpen(true)}
              className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-200 transition-colors border border-green-200"
            >
              Write a Review
            </button>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-4xl font-serif text-gray-800">Add to Cart</h1>
          <p className="text-gray-500 mt-1">Complete your order details</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="md:w-1/2">
            <Image
              width={400}
              height={400}
              src={productImage}
              className="w-full h-100 object-cover rounded-xl shadow-lg"
              alt={productTitle}
            />
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 flex flex-col justify-start">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-serif text-gray-800">
                  {productTitle}
                </h2>
                <p className="text-gray-500 mt-1">{productAuthor}</p>
                <p className="text-gray-400 text-sm mt-1">
                  📍 {product.shopId?.name || "123 Library, Book City"}
                </p>
              </div>
              <div className="flex items-center gap-1 text-yellow-400 font-bold">
                <Star size={20} fill="currentColor" /> 4.8
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-3xl font-bold text-blue-500">
                £ {productPrice.toFixed(2)}
              </h3>
              <p className="text-blue-300 text-sm">
                {product.stock ? "In Stock" : "Out of Stock"}
              </p>
              {product.category?.name && (
                <p className="text-gray-400 text-sm mt-1">
                  {product.category.name}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 mt-8 w-full">
              <div className="flex items-center gap-5 border border-blue-400 rounded-xl px-5 py-1.5 bg-white justify-between">
                <button
                  className="flex h-12 w-12 items-center justify-center rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-500"
                  disabled={updateQuantityMutation.isPending}
                  onClick={() => updateQuantityMutation.mutate(cartQuantity - 1)}
                >
                  <Minus size={24} />
                </button>
                <span className="min-w-10 text-center text-2xl font-bold">
                  {cartQuantity}
                </span>
                <button
                  className="flex h-12 w-12 items-center justify-center rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-500"
                  disabled={updateQuantityMutation.isPending}
                  onClick={() => updateQuantityMutation.mutate(cartQuantity + 1)}
                >
                  <Plus size={24} />
                </button>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-serif text-lg text-gray-800 mb-2 underline decoration-blue-500 underline-offset-4">
                Description
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed text-justify">
                {productDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Review Dialog/Modal - Design based on image_cc5b60.png */}
      {isReviewOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
            {/* Background pattern decoration (optional) */}
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <path
                  d="M10 10 Q 50 10 50 50 T 90 90"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-3 mb-6">
              <Image
              width={300}
              height={400}
                src="https://i.pravatar.cc/150?u=madiha"
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <span className="font-semibold text-gray-800 text-lg">
                Madiha Lata
              </span>
            </div>

            {/* Star Rating */}
            <div className="flex gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={28}
                  className="text-yellow-400 cursor-pointer"
                />
              ))}
            </div>

            {/* Text Area */}
            <textarea
              className="w-full border border-gray-200 rounded-xl p-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none mb-8"
              rows={4}
              placeholder="Write a short review to help fellow books lovers..."
            ></textarea>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => setIsReviewOpen(false)}
                className="flex-1 py-3 px-6 border-2 border-blue-400 text-blue-500 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 py-3 px-6 bg-[#6392b9] text-white rounded-xl font-semibold hover:bg-[#537da1] transition-colors">
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDetailsPage;
