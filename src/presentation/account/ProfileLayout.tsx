"use client";

import React, { useState, useRef } from "react";
import {
  User,
  Lock,
  History,
  Info,
  ShieldCheck,
  FileText,
  Globe,
  Bell,
  LogOut,
  ChevronRight,
  Pencil,
} from "lucide-react";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";
import LanguageSelection from "./LanguageSelection";
import LogoutModal from "./LogoutModal";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const ProfileLayout = () => {
  const [activeTab, setActiveTab] = useState("Edit Profile");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const session = useSession();
  const TOKEN = session?.data?.user?.accessToken || "";

  console.log(TOKEN);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetching Profile Data
  const { data: profileResponse, isLoading } = useQuery({
    queryKey: ["profileData"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/me`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        },
      );
      return res.json();
    },
    // enabled: !!session?.user?.accessToken,
  });

  const userData = profileResponse?.data;

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
  };

  const navItems = [
    { id: "Edit Profile", icon: <User size={20} />, label: "Edit Profile" },
    {
      id: "Change Password",
      icon: <Lock size={20} />,
      label: "Change Password",
    },
    {
      id: "Order History",
      icon: <History size={20} />,
      label: "Order History",
    },
    { id: "About Us", icon: <Info size={20} />, label: "About Us" },
    {
      id: "Privacy Policy",
      icon: <ShieldCheck size={20} />,
      label: "Privacy Policy",
    },
    {
      id: "Terms & Conditions",
      icon: <FileText size={20} />,
      label: "Terms & Conditions",
    },
    { id: "Language", icon: <Globe size={20} />, label: "Language" },
  ];

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans text-slate-800">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif text-gray-800">My Profile</h1>
          <p className="text-gray-500 mt-2">Manage your Profile</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <aside className="lg:w-1/3 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            <div className="relative">
              <div className="h-24 bg-[#76b9f0]"></div>
              <div className="flex flex-col items-center -mt-12 pb-6">
                <div className="relative group">
                  <Image
                    width={96}
                    height={96}
                    // API থেকে ইমেজ না থাকলে প্লেসহোল্ডার ইমেজ দেখাবে
                    src={
                      userData?.avatar?.url ||
                      "https://i.pravatar.cc/150?u=default"
                    }
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md bg-slate-100"
                  />
                  <button
                    onClick={() => {
                      setActiveTab("Edit Profile");
                      setTimeout(() => fileInputRef.current?.click(), 100);
                    }}
                    className="absolute bottom-0 right-0 bg-[#6392b9] hover:bg-blue-600 transition-colors text-white p-1.5 rounded-full border-2 border-white shadow-lg"
                  >
                    <Pencil size={14} />
                  </button>
                </div>
                {/* ডাইনামিক নাম এবং ইমেইল */}
                <h2 className="mt-3 font-bold text-xl text-[#76b9f0]">
                  {userData?.name || "Unknown User"}
                </h2>
                <p className="text-sm text-gray-400 font-medium">
                  {userData?.email || "No email available"}
                </p>
              </div>
            </div>

            <nav className="px-4 pb-4">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-4 rounded-lg transition-all ${
                      activeTab === item.id
                        ? "text-blue-400 bg-blue-50/50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={
                          activeTab === item.id
                            ? "text-blue-400"
                            : "text-gray-400"
                        }
                      >
                        {item.icon}
                      </span>
                      {/* টেক্সট সাইজ বাড়ানো হয়েছে (text-base) */}
                      <span className="text-base font-semibold">
                        {item.label}
                      </span>
                    </div>
                    <ChevronRight
                      size={18}
                      className={
                        activeTab === item.id
                          ? "text-blue-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                ))}

                <div className="flex items-center justify-between px-4 py-4 text-gray-600 border-t border-gray-50 mt-2">
                  <div className="flex items-center gap-4">
                    <Bell size={20} className="text-gray-400" />
                    <span className="text-base font-semibold">
                      Push Notifications
                    </span>
                  </div>
                  <div
                    className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${userData?.enableNotifications ? "bg-blue-400" : "bg-gray-300"}`}
                  >
                    <div
                      className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${userData?.enableNotifications ? "right-1" : "left-1"}`}
                    ></div>
                  </div>
                </div>

                <button
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="w-full flex items-center justify-between px-4 py-4 text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors group mt-2"
                >
                  <div className="flex items-center gap-4">
                    <LogOut
                      size={20}
                      className="text-gray-400 group-hover:text-red-500"
                    />
                    <span className="text-base font-semibold">Log Out</span>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-gray-300 group-hover:text-red-500"
                  />
                </button>
              </div>
            </nav>
          </aside>

          <main className="lg:w-2/3 border border-gray-100 rounded-xl p-8 min-h-[600px]">
            {activeTab === "Edit Profile" && (
              <EditProfile
                initialData={userData} // API থেকে আসা সব ডাটা পাঠিয়ে দেয়া হয়েছে
                fileRef={fileInputRef}
              />
            )}
            {activeTab === "Change Password" && <ChangePassword />}
            {activeTab === "Language" && <LanguageSelection />}
            {activeTab === "Order History" && (
              <div className="text-gray-400 text-center py-20 text-lg">
                Order History Coming Soon...
              </div>
            )}
          </main>
        </div>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
};

export default ProfileLayout;
