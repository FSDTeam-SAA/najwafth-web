"use client";

import React from "react";
import { useTranslation } from "react-i18next";

const TermsConditions = () => {
  const { t } = useTranslation();

  const sections = [1,2,3,4,5,6]

  return (
    <div className="w-full bg-white font-sans">
      <div className="py-10 text-center border-b border-gray-100 bg-[#FAFAFA]">
        <h1 className="text-4xl font-serif text-gray-900 mb-2">{t('policy.termsTitle')}</h1>
        <p className="text-gray-600 text-lg">{t('policy.termsSub')}</p>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="bg-[#F9FAFB] rounded p-8 md:p-12">
          <div className="space-y-8">
            {sections.map((id) => (
              <div key={id}>
                <h3 className="text-xl font-bold text-gray-800 mb-3 font-serif">
                  {id}. {t(`policy.terms.s${id}.title`)}
                </h3>
                <p className="text-gray-500 leading-relaxed text-base">
                  {t(`policy.terms.s${id}.content`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-gray-400 text-base">{t('policy.lastUpdated')}</p>
      </div>
    </div>
  );
};

export default TermsConditions;
