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
  reviews?: {
    _id?: string;
    rating?: number;
    comment?: string;
    createdAt?: string;
    user?: {
      name?: string;
    };
  }[];
  avgRating?: number;
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
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
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

  const { data: cartResponse, isLoading: isCartLoading } = useQuery<CartResponse>({
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
  const productReviews = product?.reviews || [];

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
  const isQuantityUpdating = updateQuantityMutation.isPending;

  const reviewMutation = useMutation({
    mutationFn: async () => {
      if (!TOKEN) {
        throw new Error("Please login to post a review");
      }

      if (!reviewRating) {
        throw new Error("Please select a rating");
      }

      if (!reviewComment.trim()) {
        throw new Error("Please write a comment");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/write-review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify({
            book: cartItemId,
            rating: reviewRating,
            comment: reviewComment,
          }),
        },
      );

      const result = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(result?.message || "Failed to post review");
      }

      return result;
    },
    onSuccess: () => {
      toast.success("Review posted successfully");
      setReviewRating(0);
      setReviewComment("");
      setIsReviewOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["book-details", cartItemId, TOKEN],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleDecrement = () => {
    if (isQuantityUpdating || cartQuantity <= 1) return;
    updateQuantityMutation.mutate(cartQuantity - 1);
  };

  const handleIncrement = () => {
    if (isQuantityUpdating) return;
    updateQuantityMutation.mutate(cartQuantity + 1);
  };

  if (status === "loading" || isLoading || isCartLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-4">
        <div className="container mx-auto border border-gray-100 bg-white p-10 shadow-sm">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="h-10 w-48 animate-pulse rounded bg-[#e8eef4]" />
              <div className="h-4 w-64 animate-pulse rounded bg-[#e8eef4]" />
            </div>
            <div className="h-9 w-32 animate-pulse rounded-full bg-[#e8eef4]" />
          </div>

          <div className="flex flex-col gap-8 md:flex-row">
            <div className="md:w-1/2">
              <div className="h-[400px] w-full animate-pulse rounded-xl bg-[#e8eef4]" />
            </div>

            <div className="flex flex-col justify-start md:w-1/2">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className="h-9 w-64 max-w-full animate-pulse rounded bg-[#e8eef4]" />
                  <div className="h-4 w-36 animate-pulse rounded bg-[#e8eef4]" />
                  <div className="h-4 w-56 animate-pulse rounded bg-[#e8eef4]" />
                </div>
                <div className="h-7 w-16 animate-pulse rounded bg-[#e8eef4]" />
              </div>

              <div className="mb-8 space-y-3">
                <div className="h-9 w-32 animate-pulse rounded bg-[#e8eef4]" />
                <div className="h-4 w-20 animate-pulse rounded bg-[#e8eef4]" />
                <div className="h-4 w-28 animate-pulse rounded bg-[#e8eef4]" />
              </div>

              <div className="mb-8 h-14 w-48 animate-pulse rounded-xl bg-[#e8eef4]" />

              <div className="space-y-3">
                <div className="h-6 w-36 animate-pulse rounded bg-[#e8eef4]" />
                <div className="h-4 w-full animate-pulse rounded bg-[#e8eef4]" />
                <div className="h-4 w-11/12 animate-pulse rounded bg-[#e8eef4]" />
                <div className="h-4 w-8/12 animate-pulse rounded bg-[#e8eef4]" />
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-100 pt-8">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="h-8 w-48 animate-pulse rounded bg-[#e8eef4]" />
              <div className="h-6 w-14 animate-pulse rounded bg-[#e8eef4]" />
            </div>
            <div className="space-y-4">
              {[1, 2].map((item) => (
                <div
                  key={`cart-details-review-skeleton-${item}`}
                  className="rounded-xl border border-gray-100 bg-gray-50/60 p-4"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="h-5 w-32 animate-pulse rounded bg-[#e8eef4]" />
                    <div className="h-5 w-10 animate-pulse rounded bg-[#e8eef4]" />
                  </div>
                  <div className="h-4 w-full animate-pulse rounded bg-[#e8eef4]" />
                </div>
              ))}
            </div>
          </div>
        </div>
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
              className="w-full h-100 object-cover rounded-xl shadow"
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
              <div className="flex items-center gap-4 rounded-xl border border-[#dce8f2] bg-[#eef4fa] p-1.5 shadow-sm">
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#5F83A2] shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300 disabled:shadow-none"
                  disabled={isQuantityUpdating || cartQuantity <= 1}
                  onClick={handleDecrement}
                  aria-label="Decrease quantity"
                >
                  <Minus size={18} strokeWidth={3} />
                </button>
                <span className="min-w-10 text-center text-xl font-bold text-gray-800">
                  {cartQuantity}
                </span>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#5F83A2] shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300 disabled:shadow-none"
                  disabled={isQuantityUpdating}
                  onClick={handleIncrement}
                  aria-label="Increase quantity"
                >
                  <Plus size={18} strokeWidth={3} />
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

        <div className="mt-10 border-t border-gray-100 pt-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h4 className="font-serif text-2xl text-gray-800">
              Customer Reviews
            </h4>
            <div className="flex items-center gap-1 text-yellow-400 font-bold">
              <Star size={18} fill="currentColor" />
              <span>{Number(product.avgRating || 0).toFixed(1)}</span>
            </div>
          </div>

          {productReviews.length > 0 ? (
            <div className="space-y-4">
              {productReviews.map((review, index) => (
                <div
                  key={review._id || index}
                  className="rounded-xl border border-gray-100 bg-gray-50/60 p-4"
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="font-semibold text-gray-800">
                      {review.user?.name || "Anonymous"}
                    </p>
                    <div className="flex items-center gap-1 text-yellow-400 font-bold">
                      <Star size={16} fill="currentColor" />
                      <span>{review.rating || 0}</span>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-500">
                    {review.comment || "No comment provided."}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-gray-400">
              No reviews yet.
            </div>
          )}
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
                className="w-12 h-12 rounded-full object-cover border-2 border-white"
              />
              <span className="font-semibold text-gray-800 text-lg">
                Madiha Lata
              </span>
            </div>

            {/* Star Rating */}
            <div className="flex gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  disabled={reviewMutation.isPending}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-yellow-50 disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={() => setReviewRating(star)}
                  aria-label={`Select ${star} star rating`}
                >
                  <Star
                    size={28}
                    fill={star <= reviewRating ? "#FACC15" : "transparent"}
                    color="#FACC15"
                    className="pointer-events-none transition-colors"
                  />
                </button>
              ))}
            </div>

            {/* Text Area */}
            <textarea
              className="w-full border border-gray-200 rounded-xl p-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none mb-8"
              rows={4}
              placeholder="Write a short review to help fellow books lovers..."
              value={reviewComment}
              onChange={(event) => setReviewComment(event.target.value)}
              disabled={reviewMutation.isPending}
            ></textarea>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setIsReviewOpen(false);
                  setReviewRating(0);
                  setReviewComment("");
                }}
                disabled={reviewMutation.isPending}
                className="flex-1 py-3 px-6 border-2 border-blue-400 text-blue-500 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => reviewMutation.mutate()}
                disabled={reviewMutation.isPending}
                className="flex-1 py-3 px-6 bg-[#6392b9] text-white rounded-xl font-semibold hover:bg-[#537da1] transition-colors disabled:opacity-70"
              >
                {reviewMutation.isPending ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDetailsPage;
