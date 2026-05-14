"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const EditProfile = ({ initialData }: { initialData?: any }) => {
  const [loading, setLoading] = useState(false);

  const session = useSession();
  const TOKEN = session?.data?.user?.accessToken;
  // ✅ mutation outside handler
  const updateMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/me`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          }, // or PATCH
          body: formData,
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      setLoading(false);
    },
    onError: () => {
      toast.error("Something went wrong");
      setLoading(false);
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const form = new FormData(event.currentTarget);

    // optional: ensure all fields exist
    const formData = new FormData();
    formData.append("name", form.get("name") as string);
    formData.append("phone", form.get("phone") as string);
    formData.append("bio", form.get("bio") as string);
    formData.append("gender", form.get("gender") as string);
    formData.append("dob", form.get("dob") as string);
    formData.append("age", form.get("age") as string);
    formData.append("address", form.get("address") as string);

    const avatar = form.get("avatar") as File;
    if (avatar) {
      formData.append("avatar", avatar);
    }

    updateMutation.mutate(formData);
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Edit Profile</h2>
        <p className="text-slate-500 text-sm mt-1">
          Manage your personal information.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar */}
        <div className="grid gap-2">
          <Label>Profile Picture</Label>
          <Input name="avatar" type="file" accept="image/*" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="name" defaultValue={initialData?.name} />
          <Input name="phone" defaultValue={initialData?.phone} />
        </div>

        <Input name="bio" defaultValue={initialData?.bio} />

        <select name="gender" defaultValue={initialData?.gender}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <Input type="date" name="dob" defaultValue={initialData?.dob} />
        <Input type="number" name="age" defaultValue={initialData?.age} />
        <Input name="address" defaultValue={initialData?.address} />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
