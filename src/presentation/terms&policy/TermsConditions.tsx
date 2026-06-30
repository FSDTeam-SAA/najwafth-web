"use client";

import React from "react";
import { useTranslation } from "react-i18next";

type PolicySection = {
  title: string
  content?: string[]
  items?: string[]
}

type PolicyGroup = {
  title: string
  sections: PolicySection[]
}

const TermsConditions = () => {
  const { t } = useTranslation();
  const groups = t('policy.terms.groups', { returnObjects: true }) as PolicyGroup[]

  return (
    <div className="w-full bg-[#F7FAFC] font-sans">
      <div className="border-b border-[#DCE8F2] bg-white">
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#5F83A2]">
            {t('policy.documentLabel')}
          </p>
          <h1 className="font-['Prata'] text-4xl leading-tight text-[#111111] md:text-5xl">
            {t('policy.termsTitle')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#5F6F7D] md:text-lg">
            {t('policy.termsSub')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-lg border border-[#DCE8F2] bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#5F83A2]">
              {t('policy.contents')}
            </p>
            <div className="mt-4 space-y-3">
              {groups.map(group => (
                <div key={group.title} className="rounded-md bg-[#F7FAFC] px-4 py-3">
                  <p className="font-semibold text-[#111111]">{group.title}</p>
                  <p className="mt-1 text-sm text-[#6C7B87]">
                    {group.sections.length} {t('policy.sections')}
                  </p>
                </div>
              ))}
            </div>
          </aside>

          <div className="space-y-8">
            {groups.map(group => (
              <section key={group.title} className="rounded-lg border border-[#DCE8F2] bg-white p-6 shadow-sm md:p-8">
                <h2 className="font-['Prata'] text-2xl text-[#111111] md:text-3xl">
                  {group.title}
                </h2>

                <div className="mt-8 space-y-8">
                  {group.sections.map((section, index) => (
                    <article key={section.title} className="border-t border-[#E8EEF4] pt-6 first:border-t-0 first:pt-0">
                      <h3 className="text-xl font-semibold text-[#1F2933]">
                        {index + 1}. {section.title}
                      </h3>

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
            ))}
          </div>
        </div>

        <p className="mt-8 text-sm text-[#7B8792]">{t('policy.lastUpdated')}</p>
      </div>
    </div>
  );
};

export default TermsConditions;
