/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useVerifyOtp } from "@/features/auth/hooks/useVerifyOtp";
import { useTranslation } from "react-i18next";

function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const { t } = useTranslation();

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const { executeVerifyOtp, isLoading } = useVerifyOtp(); // হুক কল করা হলো
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // পেস্ট হ্যান্ডলার
  const handlePaste = (e: React.ClipboardEvent) => {
    const data = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(data)) return;

    const pasteData = data.split("").slice(0, 6);
    const newOtp = [...otp];
    pasteData.forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    const lastIndex = pasteData.length - 1;
    if (lastIndex >= 0) {
      inputRefs.current[Math.min(lastIndex, 5)]?.focus();
    }
  };

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // মেইন ভেরিফাই লজিক
  const handleVerify = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length < 6) {
      toast.error(t("auth.enter6Digits"));
      return;
    }

    try {
      // API কল করা (আপনার হুক ব্যবহার করে)
      const response = await executeVerifyOtp(email, fullOtp);

      if (response?.success) {
        toast.success(t("auth.otpVerified"));

        // রিডাইরেক্ট করার সময় email, otp এবং resetToken (যা আসলে OTP ই) পাঠানো হচ্ছে
        router.push(
          `/reset-password?email=${encodeURIComponent(email)}`,
        );
      }
    } catch (err: any) {
      toast.error(err.message || t("auth.invalidOtp"));
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="relative h-64 w-full lg:h-auto lg:w-1/2">
        <Image
          src="/images/authImage.png"
          alt="Auth Image"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="w-full lg:w-1/2 bg-[#F1F9FC] flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-xl bg-[#F5FBFF] rounded-lg shadow-[0px_4px_5px_0px_#0000001A] border border-sky-100 p-8 text-center sm:text-left">
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
            {t("auth.verifyEmail")}
          </h2>
          <p className="text-gray-500 text-sm mt-1 mb-6 text-center">
            {t("auth.enterOtpSentTo")}{" "}
            <span className="font-semibold text-blue-400">{email}</span>
          </p>

          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                onPaste={index === 0 ? handlePaste : undefined}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-md border text-center text-lg font-bold outline-none transition-all
                  ${digit ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100" : "border-gray-300 bg-white"}
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 mb-5 px-1">
            <p className="flex items-center gap-1">⏱ 00:59</p>
            <p>
              Didn&apos;t get a code?{" "}
              <button className="text-blue-500 font-semibold cursor-pointer hover:underline bg-transparent border-none">
                {t("auth.resend")}
              </button>
            </p>
          </div>

          <Button
            onClick={handleVerify}
            disabled={isLoading}
            className="w-full h-11 rounded-md bg-slate-600 hover:bg-slate-700 text-white flex items-center justify-center gap-2 transition-all"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              t("auth.verify")
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtpForm;
