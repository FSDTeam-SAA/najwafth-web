"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { User, Phone, MapPin, Calendar } from "lucide-react";

const EditProfile = ({
  initialData,
  fileRef,
}: {
  initialData?: any;
  fileRef?: any;
}) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const TOKEN = session?.user?.accessToken;
  console.log("token", TOKEN);

  const updateMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/me`,
        {
          method: "PATCH",
          headers: {
            // Note: FormData পাঠালে Content-Type header সেট করার দরকার নেই, ব্রাউজার নিজে থেকেই সীমানা (boundary) সহ সেট করে নেয়।
            Authorization: `Bearer ${TOKEN}`,
          },
          body: formData,
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update profile");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      setLoading(false);
      // প্রোফাইল আপডেট হওয়ার পর ডাটা রিফ্রেশ করার জন্য
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
      setLoading(false);
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    // আপনার কন্ট্রোলার অনুযায়ী ফাইল এবং টেক্সট ডাটা অটোমেটিক FormData-তে চলে যাবে
    updateMutation.mutate(formData);
  };

  // কমন ইনপুট স্টাইল (Height 50px)
  const inputStyles =
    "h-[50px] pl-10 focus-visible:ring-blue-400 border-gray-200 transition-all";

  return (
    <div className="w-full">
      <div className="mb-8 pb-4 border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900">Edit Profile</h2>
        <p className="text-slate-500 text-sm mt-1">
          Update your account information and profile picture.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hidden File Input linked with Sidebar Pencil */}
        <div className="hidden">
          <input
            type="file"
            name="avatar" // আপনার কন্ট্রোলার req.file খুঁজবে, তাই name="avatar" গুরুত্বপূর্ণ
            accept="image/*"
            ref={fileRef}
            onChange={(e) => {
              if (e.target.files?.[0]) {
                toast.info(
                  `Selected: ${e.target.files[0].name}. Click Save to update.`,
                );
              }
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label className="font-medium">Full Name</Label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <Input
                name="name"
                defaultValue={initialData?.name}
                className={inputStyles}
                placeholder="Full Name"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label className="font-medium">Phone Number</Label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <Input
                name="phone"
                defaultValue={initialData?.phone}
                className={inputStyles}
                placeholder="Phone Number"
              />
            </div>
          </div>

          {/* Bio - Full Width */}
          <div className="md:col-span-2 space-y-2">
            <Label className="font-medium">Bio</Label>
            <Input
              name="bio"
              defaultValue={initialData?.bio}
              className="h-[50px] border-gray-200"
              placeholder="A short bio about yourself"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label className="font-medium">Gender</Label>
            <select
              name="gender"
              defaultValue={initialData?.gender}
              className="flex h-[50px] w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label className="font-medium">Date of Birth</Label>
            <div className="relative">
              <Calendar
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <Input
                type="date"
                name="dob"
                defaultValue={initialData?.dob}
                className={inputStyles}
              />
            </div>
          </div>

          {/* Age */}
          <div className="space-y-2">
            <Label className="font-medium">Age</Label>
            <Input
              type="number"
              name="age"
              defaultValue={initialData?.age}
              className="h-[50px] border-gray-200"
              placeholder="Age"
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label className="font-medium">Address</Label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <Input
                name="address"
                defaultValue={initialData?.address}
                className={inputStyles}
                placeholder="Your Address"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <Button
            type="submit"
            disabled={loading}
            className="h-[50px] px-10 bg-[#76b9f0] hover:bg-blue-500 text-white font-semibold transition-all min-w-[160px]"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Saving...
              </span>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
