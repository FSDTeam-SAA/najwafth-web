"use client";

import React from "react";
import { useTranslation } from "react-i18next";

type PrivacySection = {
  title: string
  content?: string[]
  items?: string[]
}

type LegalItem = {
  label: string
  value: string
}

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const sections = t('policy.privacy.sections', { returnObjects: true }) as PrivacySection[]
  const legalItems = t('policy.privacy.legal.items', { returnObjects: true }) as LegalItem[]

  return (
    <div className="w-full bg-[#F7FAFC] font-sans">
      <div className="border-b border-[#DCE8F2] bg-white">
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#5F83A2]">
            {t('policy.documentLabel')}
          </p>
          <h1 className="font-['Prata'] text-4xl leading-tight text-[#111111] md:text-5xl">
            {t('policy.privacyTitle')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#5F6F7D] md:text-lg">
            {t('policy.privacySub')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <section className="rounded-lg border border-[#DCE8F2] bg-white p-6 shadow-sm md:p-8">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <article key={section.title} className="border-t border-[#E8EEF4] pt-6 first:border-t-0 first:pt-0">
                  <h2 className="text-xl font-semibold text-[#1F2933]">
                    {index + 1}. {section.title}
                  </h2>

                  {section.content?.map(paragraph => (
                    <p key={paragraph} className="mt-3 text-base leading-7 text-[#52616E]">
                      {paragraph}
                    </p>
                  ))}

                  {section.items ? (
                    <ul className="mt-4 grid gap-2 text-base leading-7 text-[#52616E] sm:grid-cols-2">
                      {section.items.map(item => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#5F83A2]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-lg border border-[#DCE8F2] bg-white p-6 shadow-sm">
              <h2 className="font-['Prata'] text-2xl text-[#111111]">
                {t('policy.privacy.legal.title')}
              </h2>
              <dl className="mt-5 space-y-4">
                {legalItems.map(item => (
                  <div key={item.label}>
                    <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-[#5F83A2]">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-base leading-7 text-[#52616E]">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-lg bg-[#5F83A2] p-6 text-white shadow-sm">
              <h2 className="font-['Prata'] text-2xl">{t('policy.privacy.contactTitle')}</h2>
              <p className="mt-3 leading-7 text-white/90">{t('policy.privacy.contactText')}</p>
              <a
                href={`mailto:${t('policy.contactEmail')}`}
                className="mt-5 inline-flex rounded-md bg-white px-4 py-2 font-semibold text-[#5F83A2]"
              >
                {t('policy.contactEmail')}
              </a>
            </div>
          </aside>
        </div>

        <p className="mt-8 text-sm text-[#7B8792]">{t('policy.lastUpdated')}</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
