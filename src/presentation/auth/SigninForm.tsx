/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

function SigninForm() {
  const router = useRouter();
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      toast.success(t("auth.loginSuccess", { defaultValue: "Login Successfully!" }));
      router.push("/");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Side */}
      <div className="relative h-64 w-full lg:h-auto lg:w-1/2">
        <Image
          src="/images/authImage.png"
          alt="Auth Image"
          fill
          className="object-cover"
        />
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 bg-[#F1F9FC] flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-xl bg-[#F5FBFF] rounded-lg shadow-[0px_4px_5px_0px_#0000001A] border border-sky-100 p-8">
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

          <h2 className="text-3xl font-bold text-[#459AE4]">{t("auth.hello", { defaultValue: "Hello!" })}</h2>

          <p className="text-gray-500 text-sm mt-1 mb-6">
            {t("auth.signinSub", { defaultValue: "Access to manage your account" })}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <Label className="text-[#459AE4] text-sm">{t("contact.emailAddress")}</Label>

              <Input
                type="email"
                placeholder={t("contact.enterEmail")}
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="mt-1 rounded-full border-gray-300 h-11"
              />
            </div>

            {/* Password */}
            <div>
              <Label className="text-[#459AE4] text-sm">{t("auth.password", { defaultValue: "Password" })}</Label>

              <div className="relative mt-1">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder={t("auth.enterPassword", { defaultValue: "Enter Password..." })}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
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

            {/* Remember */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="accent-blue-500"
                />
                {t("auth.remember", { defaultValue: "Remember Me" })}
              </label>

              <Link href="/forgot-password">
                <button
                  type="button"
                  className="text-[#459AE4] hover:underline"
                >
                  {t("auth.forgot", { defaultValue: "Forgot Password?" })}
                </button>
              </Link>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-md bg-slate-600 hover:bg-slate-700 text-white"
            >
              {isLoading ? t("auth.signingIn", { defaultValue: "Signing In..." }) : t("auth.signIn", { defaultValue: "Sign In" })}
            </Button>

            {/* Signup */}
            <p className="text-center text-xs text-gray-500 mt-2">
              Don&apos;t have an account?{" "}
              <Link href="/signup">
                <span className="text-[#459AE4] font-semibold hover:underline">
                  {t("auth.signUp", { defaultValue: "Sign Up" })}
                </span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SigninForm;
