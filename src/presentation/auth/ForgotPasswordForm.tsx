/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword"; // আপনার হুক পাথ অনুযায়ী চেঞ্জ করবেন
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { executeForgotPassword, isLoading, error } = useForgotPassword();
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(false);

    try {
      const response = await executeForgotPassword(email);
      if (response?.success) {
        toast.success(response.message || t("auth.otpSent"));
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
      }
    } catch (err: any) {
      toast.error(err.message || t("auth.somethingWrong"));
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-6 sm:p-10">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/authImage.png"
          alt="Auth Image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Center Form */}
      <div className="relative z-10 w-full max-w-xl">
        <div className="w-full bg-[#F5FBFF]/95 rounded-lg shadow-[0px_18px_45px_0px_#00000033] border border-white/60 p-8 backdrop-blur-sm">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            {/* Logo */}
                      <div className="flex justify-center mb-4">
                        <Image
                          src="/images/logo.png"
                          alt="Logo"
                          width={150}
                          height={60}
                          className="object-contain"
                        />
                      </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-blue-500">{t("auth.forgotTitle")}</h2>

          <p className="text-gray-500 text-sm mt-1 mb-6">
            {t("auth.forgotSub")}
          </p>

          {/* Success Message */}
          {isSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-2 rounded-lg text-sm mb-4">
              {t("auth.otpSent")}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <Label className="text-blue-500 text-sm">{t("contact.emailAddress")}</Label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("contact.enterEmail")}
                className="mt-1 rounded-full border-gray-300 h-11"
              />
            </div>

            {/* Button */}
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full h-11 rounded-md bg-slate-600 hover:bg-slate-700 text-white flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  {t("contact.sending")}
                </>
              ) : (
                t("auth.sendOtp")
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
