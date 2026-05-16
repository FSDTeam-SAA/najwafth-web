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
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
  const { t } = useTranslation();
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
    },

    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const currentPassword = form.get("currentPassword") as string;
    const newPassword = form.get("newPassword") as string;
    const confirmPassword = form.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      return toast.error("New passwords do not match!");
    }

    changepasswordMutation.mutate({
      currentPassword,
      newPassword,
      confirmPassword,
    });
  };

  const labelStyles = "text-base font-medium text-[#1E1E1E] leading-[150%]";

  const requirements = [
    { text: t("account.req1"), met: true },
    { text: t("account.req2"), met: true },
    { text: t("account.req3"), met: true },
    { text: t("account.req4"), met: true },
    { text: t("account.req5"), met: false },
    { text: t("account.req6"), met: false },
  ];

  return (
    <div className="w-full">
      <div className="mb-8 pb-4 border-b border-slate-100">
        <h2 className="text-3xl font-bold text-slate-900 font-serif">
          {t("account.changePasswordTitle")}
        </h2>
        <p className="text-slate-500 text-base mt-1">
          {t("account.changePasswordSub")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label className={labelStyles}>{t("account.currentPassword")}</Label>
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

          <div className="grid gap-2">
            <Label className={labelStyles}>{t("account.newPassword")}</Label>
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

        <div className="grid gap-2">
          <Label className={labelStyles}>{t("account.confirmNewPassword")}</Label>
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

        <div className="space-y-3 mt-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <p className="font-bold text-gray-700 mb-2">{t("account.passwordRequirements")}</p>
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

        <div className="flex justify-end gap-4 pt-6">
          <Button
            type="submit"
            disabled={changepasswordMutation.isPending}
            className="h-[55px] px-5 bg-[#5F83A2] hover:bg-[#5e7e9a] text-white font-bold text-base rounded transition-all min-w-[200px] cursor-pointer"
          >
            {changepasswordMutation.isPending
              ? t("account.updating")
              : t("account.saveChanges")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
