"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, Check, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const ChangePassword = () => {
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });


  const session = useSession();
    const TOKEN = session?.data?.user?.accessToken;

  const changepasswordMutation = useMutation({
    mutationFn: async (data: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/change-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error("Password change failed");
      }

      return res.json();
    },

    onSuccess: () => {
      toast.success("Password changed successfully");
    },

    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const currentPassword = form.get("currentPassword") as string;
    const newPassword = form.get("newPassword") as string;
    const confirmPassword = form.get("confirmPassword") as string;

    changepasswordMutation.mutate({
      currentPassword,
      newPassword,
      confirmPassword,
    });
  };

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
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Change Password</h2>
        <p className="text-slate-500 text-sm mt-1">
          Manage your account preferences, security settings, and privacy
          options.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current + New */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label>Current Password</Label>
            <div className="relative">
              <Input
                name="currentPassword"
                type={show.current ? "text" : "password"}
                placeholder="********"
                className="pr-10 h-11 bg-slate-50/50"
              />
              <Eye
                onClick={() =>
                  setShow((p) => ({ ...p, current: !p.current }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>New Password</Label>
            <div className="relative">
              <Input
                name="newPassword"
                type={show.new ? "text" : "password"}
                placeholder="********"
                className="pr-10 h-11 bg-slate-50/50"
              />
              <Eye
                onClick={() => setShow((p) => ({ ...p, new: !p.new }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Confirm */}
        <div className="grid gap-2">
          <Label>Confirm New Password</Label>
          <div className="relative">
            <Input
              name="confirmPassword"
              type={show.confirm ? "text" : "password"}
              placeholder="********"
              className="pr-10 h-11 bg-slate-50/50"
            />
            <Eye
              onClick={() =>
                setShow((p) => ({ ...p, confirm: !p.confirm }))
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
            />
          </div>
        </div>

        {/* Requirements */}
        <div className="space-y-2 mt-6">
          {requirements.map((req, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              {req.met ? (
                <Check className="w-4 h-4 text-emerald-500 stroke-[3px]" />
              ) : (
                <X className="w-4 h-4 text-rose-500 stroke-[3px]" />
              )}
              <span className={req.met ? "text-emerald-500" : "text-rose-500"}>
                {req.text}
              </span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-6">
          <Button type="button" variant="outline" className="px-8">
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={changepasswordMutation.isPending}
            className="px-8 bg-[#6392b9] hover:bg-[#537da1] text-white"
          >
            {changepasswordMutation.isPending
              ? "Updating..."
              : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;