"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const EditProfile = () => {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Edit Profile</h2>
        <p className="text-slate-500 text-sm mt-1">
          Manage your personal information and profile details.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="name" className="font-bold text-slate-700">Name</Label>
          <Input 
            type="text" 
            id="name" 
            placeholder="Madiha Lata" 
            className="bg-slate-50/50 border-slate-200 focus:ring-blue-400 w-full h-11"
          />
        </div>

        <div className="grid w-full items-center gap-2">
          <Label htmlFor="email" className="font-bold text-slate-700">Email Address</Label>
          <Input 
            type="email" 
            id="email" 
            className="bg-slate-50/50 border-slate-200 focus:ring-blue-400 h-11"
          />
        </div>

        <div className="grid w-full items-center gap-2">
          <Label htmlFor="phone" className="font-bold text-slate-700">Phone Number</Label>
          <Input 
            type="text" 
            id="phone" 
            placeholder="+123456" 
            className="bg-slate-50/50 border-slate-200 focus:ring-blue-400 h-11"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
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

export default EditProfile;