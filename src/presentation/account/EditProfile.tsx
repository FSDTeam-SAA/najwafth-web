"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { User, Phone, MapPin, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const updateMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (!TOKEN) throw new Error("Authentication token not found");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/me`,
        {
          method: "PATCH",
          headers: {
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
      queryClient.invalidateQueries({ queryKey: ["profileData"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
      setLoading(false);
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    updateMutation.mutate(formData);
  };

  // ইনপুট টেক্সট সাইজ text-lg (বড়) করা হয়েছে
  const inputStyles =
    "h-[50px] pl-10 focus-visible:ring-blue-400 border-[#C0C3C1] text-lg transition-all rounded";

  return (
    <div className="w-full">
      <div className="mb-8 pb-4 border-b border-slate-100">
        {/* মেইন হেডিং বড় করা হয়েছে */}
        <h2 className="text-3xl font-bold text-slate-900 font-serif">
          Edit Profile
        </h2>
        <p className="text-slate-500 text-base mt-1">
          Update your account information and profile picture.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="hidden">
          <input
            type="file"
            name="avatar"
            accept="image/*"
            ref={fileRef}
            onChange={(e) => {
              if (e.target.files?.[0]) {
                toast.info(
                  `Image "${e.target.files[0].name}" ready. Click Save Changes.`,
                );
              }
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Label সাইজ text-lg করা হয়েছে এবং font-bold */}
          <div className="space-y-2">
            <Label className="text-base font-medium text-[#1E1E1E] leading-[150%]">
              Full Name
            </Label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <Input
                name="name"
                defaultValue={initialData?.name}
                className={inputStyles}
                placeholder="Full Name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-medium text-[#1E1E1E] leading-[150%]">
              Phone Number
            </Label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <Input
                name="phone"
                defaultValue={initialData?.phone}
                className={inputStyles}
                placeholder="Phone Number"
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label className="text-base font-medium text-[#1E1E1E] leading-[150%]">Bio</Label>
            <Input
              name="bio"
              defaultValue={initialData?.bio}
              className="h-[50px] focus-visible:ring-blue-400 border-[#C0C3C1] text-lg transition-all rounded"
              placeholder="Tell us something about you"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-base font-medium text-[#1E1E1E] leading-[150%]">Gender</Label>

            <Select defaultValue={initialData?.gender || ""}>
              <SelectTrigger className="!h-[50px] rounded w-full text-lg border border-[#C0C3C1] focus:ring-2 focus:ring-blue-400">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-medium text-[#1E1E1E] leading-[150%]">
              Date of Birth
            </Label>
            <div className="relative">
              <Calendar
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <Input
                type="date"
                name="dob"
                defaultValue={initialData?.dob?.split("T")[0]}
                className={inputStyles}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-medium text-[#1E1E1E] leading-[150%]">Age</Label>
            <Input
              type="number"
              name="age"
              defaultValue={initialData?.age}
              className="h-[50px] focus-visible:ring-blue-400 border-[#C0C3C1] text-lg transition-all rounded w-full"
              placeholder="Age"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label className="text-base font-medium text-[#1E1E1E] leading-[150%]">Address</Label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
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
            className="h-[55px] px-5 bg-[#5F83A2] hover:bg-[#5e7e9a] text-white font-bold text-base rounded transition-all min-w-[200px] cursor-pointer"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
