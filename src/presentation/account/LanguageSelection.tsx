"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const LanguageSelection = () => {
  const [language, setLanguage] = useState("english");

  const languages = [
    {
      id: "english",
      name: "English",
      country: "United Kingdom",
      flag: "https://flagcdn.com/w80/gb.png", // UK Flag
    },
    {
      id: "france",
      name: "France",
      country: "France",
      flag: "https://flagcdn.com/w80/fr.png", // France Flag
    },
  ];

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Choose Language</h2>
        <p className="text-slate-500 text-sm mt-1">Choose Language</p>
      </div>

      <RadioGroup
        defaultValue="english"
        onValueChange={(value) => setLanguage(value)}
        className="space-y-4"
      >
        {languages.map((lang) => (
          <div
            key={lang.id}
            className={`flex items-center justify-between p-5 rounded-xl border transition-all cursor-pointer ${
              language === lang.id
                ? "border-slate-300 bg-white"
                : "border-slate-100 bg-slate-50/30"
            }`}
          >
            <Label
              htmlFor={lang.id}
              className="flex items-center gap-4 cursor-pointer flex-1"
            >
              <div className="w-12 h-8 overflow-hidden rounded-sm shadow-sm border border-slate-100">
                <Image
                  width={400}
                  height={400}
                  src={lang.flag}
                  alt={lang.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-lg leading-tight">
                  {lang.name}
                </p>
                <p className="text-sm text-slate-400">{lang.country}</p>
              </div>
            </Label>

            <RadioGroupItem
              value={lang.id}
              id={lang.id}
              className="h-6 w-6 border-slate-400 text-blue-400 focus:ring-blue-400"
            />
          </div>
        ))}
      </RadioGroup>

      <div className="flex justify-end gap-3 mt-8">
        <Button
          variant="outline"
          className="px-8 border-blue-400 text-blue-500 hover:bg-blue-50"
        >
          Cancel
        </Button>
        <Button className="px-8 bg-[#6392b9] hover:bg-[#537da1] text-white shadow-sm font-medium">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default LanguageSelection;
