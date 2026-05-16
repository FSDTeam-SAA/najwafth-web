/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPassword } from "@/features/auth/hooks/useResetPassword";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";

function ChangePasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  // URL থেকে email এবং resetToken সংগ্রহ করা
  const email = searchParams.get("email") || "";
  const session = useSession();
  const resetToken = session?.data?.user?.refreshToken
  console.log("rese", resetToken)

  const { executeResetPassword, isLoading } = useResetPassword();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.newPassword.length < 6) {
    toast.error(t("auth.passMin"));
    return;
  }

  if (formData.newPassword !== formData.confirmPassword) {
    toast.error(t("auth.passwordMismatch"));
    return;
  }

  try {
    const otp = searchParams.get("otp") || "";

    const payload = {
      email,
      otp,
      password: formData.newPassword,
    };

    const response = await executeResetPassword(payload);

    if (response?.success) {
      toast.success(t("auth.passwordChanged"));

      router.push("/signin");
    }
  } catch (err: any) {
    toast.error(
      err?.message || t("auth.resetFailed")
    );
  }
};

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Side Image */}
      <div className="relative h-64 w-full lg:h-auto lg:w-1/2">
        <Image
          src="/images/authImage.png"
          alt="Auth Image"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Right Side Form */}
      <div className="w-full lg:w-1/2 bg-[#F1F9FC] flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-xl bg-[#F5FBFF] rounded-lg shadow-[0px_4px_5px_0px_#0000001A] border border-sky-100 p-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={150}
              height={60}
              className="object-contain"
            />
          </div>

          <h2 className="text-3xl font-bold text-blue-500 text-center">
            {t("auth.createNewPassword")}
          </h2>
          <p className="text-gray-500 text-sm mt-1 mb-6 text-center">
            {t("auth.resetSub")}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password */}
            <div>
              <Label className="text-blue-500 text-sm">
                {t("auth.createNewPassword")}
              </Label>
              <div className="relative mt-1">
                <Input
                  name="newPassword"
                  required
                  value={formData.newPassword}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder={t("auth.enterPassword")}
                  className="rounded-full border-gray-300 h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <Label className="text-blue-500 text-sm">
                {t("account.confirmNewPassword")}
              </Label>
              <div className="relative mt-1">
                <Input
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t("auth.reenterPassword")}
                  className="rounded-full border-gray-300 h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full h-11 rounded-md bg-slate-600 hover:bg-slate-700 text-white flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  {t("account.updating")}
                </>
              ) : (
                t("auth.updatePassword")
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordForm;