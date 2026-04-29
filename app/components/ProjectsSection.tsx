"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { SectionHeading } from "./SectionHeading";

type Project = {
  name: string;
  desc: string;
  link?: string;
  github?: string;
  tags?: string[];
  hackathon?: string;
  hackathonWin?: string;
  imageSrc?: string;
  videoSrc?: string;
};

const PROJECTS: Project[] = [
  {
    name: "slotify",
    desc: "End-to-end AI platform that selects insertion points, generates sponsor reads, and inserts ads seamlessly using OpenAI and ElevenLabs voice cloning. Generates brand statements using context-aware ad segments to enhance user experience for audio media.",
    link: "https://youtu.be/S4m1lpipni0",
    github: "https://github.com/jweng121/slotify",
    hackathon: "UofTHacks",
    hackathonWin: "best use of ElevenLabs",
    tags: ["vite", "typescript", "fastapi", "node.js", "elevenlabs", "openai"],
    videoSrc: "/slotify-demo.mp4",
  },
  {
    name: "optico2",
    desc: "Dashboard for steel companies to identify and graph feasible steel manufacturers based on carbon emissions and cost. Accounts for tariffs, transportation emissions, and miscellaneous costs. ",
    github: "https://github.com/jweng121",
    hackathon: "MIT Climate Hacks",
    tags: ["fastapi", "node.js", "next.js", "pandas", "plotly.js"],
    videoSrc: "/team-diluted-demo.mp4",
  },

];

function AutoplayVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? video.play().catch(() => {}) : video.pause(); },
      { threshold: 0.3 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}


function ProjectCard({ project }: { project: Project }) {
  const hasLink = project.link && project.link !== "#";

  return (
    <div className="flex flex-col border border-zinc-200 overflow-hidden">
      {/* Preview — counter-inverted so dark mode doesn't flip it */}
      <div
        className="relative aspect-video bg-zinc-100 overflow-hidden"
        style={{ filter: "invert(var(--page-invert, 0))" }}
      >
        {project.videoSrc ? (
          <AutoplayVideo src={project.videoSrc} />
        ) : project.imageSrc ? (
          <Image src={project.imageSrc} alt={`${project.name} preview`} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#f4f4f5,#e4e4e7)]">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-400">no preview</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4">
        {/* Name + icons */}
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-zinc-900">{project.name}</span>
          <div className="flex items-center gap-2 ml-1">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/github-tiny.png" alt="GitHub" className="w-3.5 h-3.5" />
              </a>
            )}
            {hasLink && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label="View project">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/new-tab.png" alt="Open" className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs leading-5 text-zinc-500">{project.desc}</p>

        {/* Special badges */}
        {(project.hackathon || project.hackathonWin) && (
          <div className="flex flex-wrap gap-1.5">
            {project.hackathon && (
              <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 font-mono text-[10px] text-blue-500">
                {project.hackathon}
              </span>
            )}
            {project.hackathonWin && (
              <span className="rounded-full border border-yellow-300 bg-yellow-50 px-2.5 py-0.5 font-mono text-[10px] text-yellow-600">
                ★ {project.hackathonWin}
              </span>
            )}
          </div>
        )}

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 font-mono text-[10px] text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <div>
      <SectionHeading>projects</SectionHeading>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
}
