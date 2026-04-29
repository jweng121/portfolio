"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "./SectionHeading";

type ExperienceCategory = "internships" | "extracurriculars";

type ExperienceCard = {
  company: string;
  role: string;
  term: string;
  description: string;
  accent: string;
  logo: string;
  imageSrc?: string;
  imageClassName?: string;
  logoClassName?: string;
  url?: string;
};

const CATEGORIES: { key: ExperienceCategory; label: string }[] = [
  { key: "internships", label: "internships" },
  { key: "extracurriculars", label: "extracurriculars" },
];

const CATEGORY_DOT_CLASS: Record<ExperienceCategory, string> = {
  internships: "bg-red-500",
  extracurriculars: "bg-blue-500",
};

const INTERNSHIPS: ExperienceCard[] = [
  {
    company: "Revvo Technologies",
    role: "Data Science Intern",
    term: "may 2026 - aug 2026",
    description: "Incoming summer 2026.",
    accent: "bg-black",
    logo: "Revvo",
    imageSrc: "/revvologo.png",
    imageClassName: "object-cover invert",
    logoClassName: "text-white",
    url: "https://www.revvo.ai/",
  },
];

const EXTRACURRICULARS: ExperienceCard[] = [
  {
    company: "JWblends",
    role: "Founder",
    term: "apr 2023 - aug 2025",
    description: "Launched my own barber business to provide an attentive haircutting service. Secured over 100+ returning clients and made 73k media impressions.",
    accent: "bg-white",
    logo: "JW",
    imageSrc: "/jw.jpg",
    imageClassName: "object-cover",
    logoClassName: "text-zinc-900",
  },
  {
    company: "The Traction Initiative",
    role: "Founder",
    term: "2024",
    description: "Founded Traction to address tire particulate pollution. Led a team of 23 executives and partnered with the City of Vancouver and Revvo to launch educational programming, clean-ups, and fundraisers.",
    accent: "bg-white",
    logo: "TTI",
    imageSrc: "/traction.png",
    imageClassName: "object-cover",
    logoClassName: "text-zinc-900",
  },
];

const EXPERIENCE_BY_CATEGORY: Record<ExperienceCategory, ExperienceCard[]> = {
  internships: INTERNSHIPS,
  extracurriculars: EXTRACURRICULARS,
};

export function ExperienceSection() {
  const [activeCategory, setActiveCategory] = useState<ExperienceCategory>("internships");
  const experiences = EXPERIENCE_BY_CATEGORY[activeCategory];

  return (
    <div>
      <SectionHeading>experience</SectionHeading>

      <div className="mt-8 flex flex-wrap items-center gap-7 font-mono text-sm">
        {CATEGORIES.map((category) => (
          <button
            type="button"
            key={category.key}
            onClick={() => setActiveCategory(category.key)}
            className={
              activeCategory === category.key
                ? "flex cursor-pointer items-center gap-2 text-zinc-900"
                : "flex cursor-pointer items-center gap-2 text-zinc-400 transition-colors hover:text-zinc-700"
            }
          >
            <span className={`h-2.5 w-2.5 rounded-full ${CATEGORY_DOT_CLASS[category.key]}`} />
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
      <motion.div
        key={activeCategory}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2"
      >
        {experiences.map((experience) => (
          <motion.article
            key={`${experience.company}-${experience.role}`}
            className="min-w-0"
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
            }}
          >
            {experience.url ? (
              <a
                href={experience.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${experience.company}`}
                className={`relative flex aspect-[1.6/1] items-center justify-center overflow-hidden ${experience.accent} block`}
                style={{ filter: "invert(var(--page-invert, 0))" }}
              >
                {experience.imageSrc ? (
                  <Image
                    src={experience.imageSrc}
                    alt={`${experience.company} logo`}
                    fill
                    className={experience.imageClassName ?? "object-cover"}
                  />
                ) : (
                  <div className={`font-(--font-display) text-5xl tracking-wider ${experience.logoClassName ?? "text-white"}`}>
                    {experience.logo}
                  </div>
                )}
              </a>
            ) : (
              <div
                className={`relative flex aspect-[1.6/1] items-center justify-center overflow-hidden ${experience.accent}`}
                aria-label={`${experience.company} placeholder image`}
                style={{ filter: "invert(var(--page-invert, 0))" }}
              >
                {experience.imageSrc ? (
                  <Image
                    src={experience.imageSrc}
                    alt={`${experience.company} logo`}
                    fill
                    className={experience.imageClassName ?? "object-cover"}
                  />
                ) : (
                  <div className={`font-(--font-display) text-5xl tracking-wider ${experience.logoClassName ?? "text-white"}`}>
                    {experience.logo}
                  </div>
                )}
              </div>
            )}

            <div className="mt-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold leading-tight text-zinc-900 underline decoration-zinc-900 decoration-1 underline-offset-2">
                  {experience.role}
                </h3>
                <span className="shrink-0 text-xs font-mono text-zinc-400">
                  {experience.term}
                </span>
              </div>
              <p className="mt-2 text-xs leading-5 text-zinc-500">{experience.description}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
      </AnimatePresence>
    </div>
  );
}
