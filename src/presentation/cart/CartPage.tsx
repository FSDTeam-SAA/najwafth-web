import React from "react";
import { Trash2, Plus, Minus, ChevronRight } from "lucide-react";
import Link from "next/link";

const CartPage = () => {
  const cartItems = Array(6).fill({
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    location: "123 Library, Book City",
    price: 12.99,
    items: 2,
    img: "/images/orderImage.jpg",
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 relative overflow-hidden">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-serif text-gray-800">My Cart</h1>
        <p className="text-gray-500 mt-2 mb-8 font-medium">
          Manage & see my My Cart list
        </p>

        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <Link key={index} href={`/cart/${item?.id}`} className="">
              <div
                
                className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between shadow-sm relative mb-5"
              >
                {/* Delete Icon */}
                <button className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors">
                  <Trash2 size={16} />
                </button>

                <div className="flex items-center gap-4 text-left">
                  <img
                    src={item.img}
                    alt="book"
                    className="w-20 h-20 rounded-lg object-cover bg-gray-200"
                  />
                  <div>
                    <h3 className="font-serif text-lg text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{item.author}</p>
                    <p className="text-gray-400 text-xs flex items-center mt-1">
                      <span className="mr-1">📍</span> {item.location}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-blue-500 font-bold">
                      ${item.price}{" "}
                      <ChevronRight size={14} className="mt-0.5" />
                    </div>
                    <p className="text-blue-300 text-[10px] mt-0.5">
                      {item.items} items
                    </p>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-3 border border-blue-100 rounded-lg px-2 py-1 mr-4 bg-white shadow-sm">
                  <button className="text-blue-300 hover:text-blue-500">
                    <Minus size={16} />
                  </button>
                  <span className="font-bold text-gray-700 min-w-5 text-center">
                    1
                  </span>
                  <button className="text-blue-300 hover:text-blue-500">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
