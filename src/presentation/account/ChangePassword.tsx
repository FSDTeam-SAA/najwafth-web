"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, Check, X, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ChangePassword = () => {
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const { data: session } = useSession();
  const TOKEN = session?.user?.accessToken;
  const router = useRouter();

  const changepasswordMutation = useMutation({
    mutationFn: async (data: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => {
      // টোকেন চেক
      if (!TOKEN) throw new Error("Unauthorized! Please login again.");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/change-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify(data),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Password change failed");
      }

      return result;
    },

    onSuccess: () => {
      toast.success("Password changed successfully");
      router.push("/signin");
      // পাসওয়ার্ড চেঞ্জ হলে ফর্ম রিসেট করার লজিক এখানে দিতে পারেন
    },

    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const currentPassword = form.get("currentPassword") as string;
    const newPassword = form.get("newPassword") as string;
    const confirmPassword = form.get("confirmPassword") as string;

    // সিম্পল ক্লায়েন্ট সাইড ভ্যালিডেশন
    if (newPassword !== confirmPassword) {
      return toast.error("New passwords do not match!");
    }

    changepasswordMutation.mutate({
      currentPassword,
      newPassword,
      confirmPassword,
    });
  };

  // ইনপুট এবং লেবেলের জন্য বড় টেক্সট স্টাইল
  const inputStyles =
    "pr-10 h-[50px] bg-slate-50/50 text-lg border-gray-200 focus-visible:ring-blue-400 transition-all";
  const labelStyles = "text-base font-medium text-[#1E1E1E] leading-[150%]";

  const requirements = [
    {
      text: "Minimum 8-12 characters (recommend 12+ for stronger security).",
      met: true,
    },
    { text: "At least one uppercase letter must.", met: true },
    { text: "At least one lowercase letter must.", met: true },
    { text: "At least one number must (0-9).", met: true },
    { text: "At least special character (! @ # $ % ^ & * etc.).", met: false },
    { text: "No spaces allowed.", met: false },
  ];

  return (
    <div className="w-full">
      <div className="mb-8 pb-4 border-b border-slate-100">
        <h2 className="text-3xl font-bold text-slate-900 font-serif">
          Change Password
        </h2>
        <p className="text-slate-500 text-base mt-1">
          Update your password to keep your account secure.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Password */}
          <div className="grid gap-2">
            <Label className={labelStyles}>Current Password</Label>
            <div className="relative">
              <Input
                name="currentPassword"
                type={show.current ? "text" : "password"}
                placeholder="********"
                className="h-[50px] focus-visible:ring-blue-400 border-[#C0C3C1] text-lg transition-all rounded w-full"
                required
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-600"
                onClick={() => setShow((p) => ({ ...p, current: !p.current }))}
              >
                {show.current ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>

          {/* New Password */}
          <div className="grid gap-2">
            <Label className={labelStyles}>New Password</Label>
            <div className="relative">
              <Input
                name="newPassword"
                type={show.new ? "text" : "password"}
                placeholder="********"
                className="h-[50px] focus-visible:ring-blue-400 border-[#C0C3C1] text-lg transition-all rounded w-full"
                required
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-600"
                onClick={() => setShow((p) => ({ ...p, new: !p.new }))}
              >
                {show.new ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="grid gap-2">
          <Label className={labelStyles}>Confirm New Password</Label>
          <div className="relative">
            <Input
              name="confirmPassword"
              type={show.confirm ? "text" : "password"}
              placeholder="********"
              className="h-[50px] focus-visible:ring-blue-400 border-[#C0C3C1] text-lg transition-all rounded w-full"
              required
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-600"
              onClick={() => setShow((p) => ({ ...p, confirm: !p.confirm }))}
            >
              {show.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
        </div>

        {/* Requirements - টেক্সট সাইজ বড় করা হয়েছে */}
        <div className="space-y-3 mt-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <p className="font-bold text-gray-700 mb-2">Password Requirements:</p>
          {requirements.map((req, index) => (
            <div key={index} className="flex items-center gap-3 text-base">
              {req.met ? (
                <Check className="w-5 h-5 text-emerald-500 stroke-[3px]" />
              ) : (
                <X className="w-5 h-5 text-rose-500 stroke-[3px]" />
              )}
              <span
                className={
                  req.met ? "text-emerald-600 font-medium" : "text-rose-500"
                }
              >
                {req.text}
              </span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6">
         <Button
            type="submit"
            disabled={changepasswordMutation.isPending}
            className="h-[55px] px-5 bg-[#5F83A2] hover:bg-[#5e7e9a] text-white font-bold text-base rounded transition-all min-w-[200px] cursor-pointer"
          >
            {changepasswordMutation.isPending ? "Updating..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
