"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, Check, X } from "lucide-react";

const ChangePassword = () => {
  const requirements = [
    { text: "Minimum 8-12 characters (recommend 12+ for stronger security).", met: true },
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
          Manage your account preferences, security settings, and privacy options.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid w-full items-center gap-2 relative">
            <Label className="font-bold text-slate-700">Current Password</Label>
            <div className="relative">
              <Input type="password" placeholder="********" className="bg-slate-50/50 pr-10 h-11" />
              <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 cursor-pointer" />
            </div>
          </div>
          <div className="grid w-full items-center gap-2 relative">
            <Label className="font-bold text-slate-700">New Password</Label>
            <div className="relative">
              <Input type="password" placeholder="********" className="bg-slate-50/50 pr-10 h-11" />
              <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="grid w-full items-center gap-2">
          <Label className="font-bold text-slate-700">Confirm New Password</Label>
          <div className="relative max-w-full">
            <Input type="password" placeholder="********" className="bg-slate-50/50 pr-10 h-11" />
            <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 cursor-pointer" />
          </div>
        </div>

        {/* Requirements Checklist */}
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

        <div className="flex justify-end gap-3 pt-6">
          <Button variant="outline" className="px-8 border-blue-400 text-blue-500 hover:bg-blue-50">
            Cancel
          </Button>
          <Button className="px-8 bg-[#6392b9] hover:bg-[#537da1] text-white shadow-sm">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;