"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useLanguageStore } from "@/lib/i18n/store";
import type { AppLanguage } from "@/lib/i18n/resources";
import { toast } from "sonner";

const LanguageSelection = () => {
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useLanguageStore();

  const languages = [
    {
      id: "en-GB" as AppLanguage,
      name: t("account.english"),
      country: t("account.unitedKingdom"),
      flag: "https://flagcdn.com/w80/gb.png", // UK Flag
    },
    {
      id: "fr-FR" as AppLanguage,
      name: t("account.france"),
      country: t("account.france"),
      flag: "https://flagcdn.com/w80/fr.png", // France Flag
    },
  ];

  const onSave = async () => {
    await i18n.changeLanguage(language);
    toast.success(t("account.saveChanges"));
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 font-serif">
          {t("account.chooseLanguage")}
        </h2>
        <p className="text-slate-500 text-base mt-1">{t("account.chooseLanguageSub")}</p>
      </div>

      <RadioGroup
        value={language}
        onValueChange={(value) => setLanguage(value as AppLanguage)}
        className="space-y-4"
      >
        {languages.map((lang) => (
          <div
            key={lang.id}
            className={`flex items-center justify-between p-5 rounded border transition-all cursor-pointer ${
              language === lang.id ? "border-slate-300 bg-white" : ""
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
          onClick={onSave}
          className="h-[55px] px-5 bg-[#5F83A2] hover:bg-[#5e7e9a] text-white font-bold text-base rounded transition-all min-w-[200px] cursor-pointer"
        >
          {t("account.saveChanges")}
        </Button>
      </div>
    </div>
  );
};

export default LanguageSelection;
