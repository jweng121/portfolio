"use client";

import { useState, useRef, useEffect } from "react";
import type { MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Metal_Mania } from "next/font/google";
import localFont from "next/font/local";
import { Signature } from "./components/Signature";
import { MeSection } from "./components/MeSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContactSection } from "./components/ContactSection";
import { SpotifyNowPlaying } from "./components/SpotifyNowPlaying";

const metalMania = Metal_Mania({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const ztNature = localFont({
  src: "../public/ZTNature-Bold.otf",
  variable: "--font-name",
});

type Section = "me" | "experience" | "contact";
const NAV: { section: Section; icon: string }[] = [
  { section: "me",         icon: "/home.png" },
  { section: "experience", icon: "/experience.png" },
  { section: "contact",    icon: "/chat.png" },
];

export default function Home() {
  const [active, setActive] = useState<Section>("me");
  const [filterProgress, setFilterProgress] = useState(0);
  const [sweepY, setSweepY] = useState(-1);
  const isAnimating = useRef(false);
  const progressRef = useRef(0);
  const navAudioRef = useRef<HTMLAudioElement | null>(null);
  const globalClickAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const nav = new Audio("/switch-sound.mp3");
    nav.preload = "auto";
    nav.volume = 0.3;
    navAudioRef.current = nav;

    const global = new Audio("/global-click.wav");
    global.preload = "auto";
    global.volume = 0.3;
    globalClickAudioRef.current = global;

    const handleGlobalClick = (e: Event) => {
      const target = e.target as Element | null;
      if (!target) return;
      if (target.closest("[data-custom-click-sound]")) return;
      const audio = globalClickAudioRef.current;
      if (!audio) return;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  const startTransition = () => {
    isAnimating.current = true;
    const duration = 1800;
    const startTime = performance.now();
    const startProg = progressRef.current;
    const endProg = startProg < 0.5 ? 1 : 0;

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;
      const newProg = startProg + (endProg - startProg) * eased;
      progressRef.current = newProg;
      setFilterProgress(newProg);
      setSweepY(eased);
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        progressRef.current = endProg;
        setFilterProgress(endProg);
        setSweepY(-1);
        isAnimating.current = false;
      }
    };
    requestAnimationFrame(tick);
  };

  const handleSkeyesClick = () => {
    if (isAnimating.current) return;
    const audio = new Audio("/domain.mp3");
    audio.addEventListener("loadedmetadata", () => {
      const delay = Math.max(0, (audio.duration - 0.2 - 2.7) * 1000);
      setTimeout(startTransition, delay);
    }, { once: true });
    audio.addEventListener("timeupdate", () => {
      if (audio.duration && audio.currentTime >= audio.duration - 0.2) {
        audio.pause();
      }
    });
    audio.play().catch(() => startTransition());
  };

  const handleNavClick = (event: MouseEvent<HTMLButtonElement>, section: Section) => {
    event.stopPropagation();

    if (!navAudioRef.current) return;
    navAudioRef.current.currentTime = 0;
    navAudioRef.current.play().catch(() => {});
    setActive(section);
  };

  return (
    <div className="overflow-x-hidden">
      {sweepY >= 0 && (
        <div
          aria-hidden
          className="fixed inset-x-0 pointer-events-none"
          style={{
            zIndex: 200,
            top: 0,
            height: "100vh",
            background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.92) 50%, transparent 100%)",
            transform: `translateY(${(sweepY * 2 - 1) * 100}vh)`,
          }}
        />
      )}

      <div
        className={`${metalMania.variable} ${ztNature.variable} min-h-screen bg-white text-zinc-900`}
        style={{ filter: `invert(${filterProgress})`, ['--page-invert' as string]: filterProgress }}
      >
        <div
          aria-hidden
          className="fixed pointer-events-none select-none"
          style={{
            top: "50%",
            right: "-2rem",
            width: "520px",
            opacity: 0.08,
            transform: "translateY(-50%)",
            zIndex: 0,
          }}
        >
          <Signature />
        </div>

        <div className="relative z-10 flex">
          <aside className="fixed inset-y-0 left-0 w-44 flex flex-col py-12 px-6 z-30 bg-white">
            <nav className="flex flex-col mt-2">
              {NAV.map(({ section, icon }) => (
                <button
                  key={section}
                  data-custom-click-sound
                  onClick={(event) => handleNavClick(event, section)}
                  className="cursor-pointer transition-opacity duration-150 w-fit"
                  style={{ opacity: active === section ? 1 : 0.3 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={icon} alt={section} className="block w-100 h-20" />
                </button>
              ))}
            </nav>
          </aside>

          <main className="ml-44 flex-1 min-h-screen">
            <div className="fixed top-7 right-40 z-40 flex flex-col items-end gap-3">
              <div className="flex items-center gap-3">
                {[
                  { href: "https://github.com/jweng121", src: "/git.png", label: "GitHub", target: "_blank" },
                  { href: "https://www.linkedin.com/in/james-weng-25b759317/", src: "/in.png", label: "LinkedIn", target: "_blank" },
                  { href: "mailto:jqweng@uwaterloo.ca", src: "/email.png", label: "Email", target: undefined },
                ].map(({ href, src, label, target }) => (
                  <a
                    key={label}
                    href={href}
                    target={target}
                    rel={target ? "noopener noreferrer" : undefined}
                    aria-label={label}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={label} style={{ width: 30, height: 30 }} />
                  </a>
                ))}
              </div>

              <div style={{ filter: "invert(var(--page-invert, 0))" }}>
                <SpotifyNowPlaying />
              </div>
            </div>

            <div className="flex min-h-screen flex-col px-14 py-12">
              <div className="flex flex-1 gap-10">
                <div className="max-w-3xl flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    >
                      {active === "me" && (
                        <>
                          <MeSection onSkeyesClick={handleSkeyesClick} />
                          <div className="mt-20">
                            <ProjectsSection />
                          </div>
                        </>
                      )}
                      {active === "experience" && <ExperienceSection />}
                      {active === "contact" && <ContactSection />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
