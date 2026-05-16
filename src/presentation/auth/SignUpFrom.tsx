/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { SignupRequest } from "@/features/auth/types";
import { signupUser } from "@/features/auth/api/auth.api";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

function SignUpFrom() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  // Form State: এখানে role-এ "buyer" সেট করে দেওয়া হয়েছে
  const [formData, setFormData] = useState<SignupRequest>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "buyer", // Default value set to buyer
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError(t("auth.passwordMismatch"));
      return;
    }

    setIsLoading(true);
    try {
      // এপিআই কল করার সময় এখন অটোমেটিক role: "buyer" যাবে
      const response = await signupUser(formData);
      console.log("Signup Success:", response);
      toast.success(t("auth.accountCreated"));
      router.push('/signin')
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-6 sm:p-10">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/authImage.png"
          alt="Signup Image"
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
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={150}
              height={60}
              className="object-contain"
            />
          </div>

          <h2 className="text-3xl font-bold text-center text-[#459AE4]">
            {t("auth.createAccount")}
          </h2>
          <p className="text-center text-gray-500 text-sm mt-1 mb-6">
            {t("auth.createAccountSub")}
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <Label className="text-[#459AE4] text-sm">{t("account.fullName")}</Label>
              <Input
                name="name"
                required
                onChange={handleChange}
                placeholder={t("auth.writeHere")}
                className="mt-1 rounded-full border-gray-300 h-11"
              />
            </div>

            {/* Email */}
            <div>
              <Label className="text-[#459AE4] text-sm">{t("contact.emailAddress")}</Label>
              <Input
                name="email"
                type="email"
                required
                onChange={handleChange}
                placeholder={t("contact.enterEmail")}
                className="mt-1 rounded-full border-gray-300 h-11"
              />
            </div>

            {/* Phone */}
            <div>
              <Label className="text-[#459AE4] text-sm">{t("account.phoneNumber")}</Label>
              <Input
                name="phone"
                required
                onChange={handleChange}
                placeholder="+88-0158*****"
                className="mt-1 rounded-full border-gray-300 h-11"
              />
            </div>

            {/* Password */}
            <div>
              <Label className="text-[#459AE4] text-sm">
                {t("auth.createNewPassword")}
              </Label>
              <div className="relative mt-1">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={handleChange}
                  placeholder={t("auth.enterPassword")}
                  className="rounded-full border-gray-300 h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* {t("auth.confirmPassword")} */}
            <div>
              <Label className="text-[#459AE4] text-sm">{t("auth.confirmPassword")}</Label>
              <div className="relative mt-1">
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  onChange={handleChange}
                  placeholder={t("auth.reenterPassword")}
                  className="rounded-full border-gray-300 h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-3 text-gray-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <Button
              disabled={isLoading}
              type="submit"
              className="w-full h-11 rounded-md bg-slate-600 hover:bg-slate-700 text-white mt-2 transition-all"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={18} />
                  <span>{t("auth.signingUp")}</span>
                </div>
              ) : (
                t("auth.signUp")
              )}
            </Button>

            <p className="text-center text-xs text-gray-500 mt-2">
              {t("auth.alreadyHaveAccount")}{" "}
              <Link href="/signin">
                <span className="text-[#459AE4] font-semibold cursor-pointer hover:underline">
                  {t("auth.logIn")}
                </span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpFrom;
