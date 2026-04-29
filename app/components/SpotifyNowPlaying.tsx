"use client";

import { useEffect, useState } from "react";

type NowPlaying = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string | null;
  songUrl?: string | null;
  progressMs?: number;
  durationMs?: number;
  error?: string;
};

const POLL_INTERVAL_MS = 30000;

export function SpotifyNowPlaying({ square = false }: { square?: boolean }) {
  const [track, setTrack] = useState<NowPlaying | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadTrack() {
      try {
        const response = await fetch("/api/spotify", { cache: "no-store" });
        const data = (await response.json()) as NowPlaying;
        if (!cancelled) setTrack(data);
      } catch {
        if (!cancelled) setTrack({ isPlaying: false });
      }
    }

    loadTrack();
    const intervalId = window.setInterval(loadTrack, POLL_INTERVAL_MS);
    return () => { cancelled = true; window.clearInterval(intervalId); };
  }, []);

  const albumImageUrl = track?.albumImageUrl;
  const isPlaying = Boolean(track?.isPlaying);
  const title = isPlaying ? track?.title : "Not playing currently";
  const artist = isPlaying ? track?.artist : track ? "" : "loading";
  const href = isPlaying ? track?.songUrl : undefined;

  const content = square ? (
    <div className="relative h-9 w-9 overflow-hidden rounded-md border border-zinc-200 bg-zinc-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={albumImageUrl ?? "/spotify.jpg"}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />
    </div>
  ) : (
    <div className="relative h-16 w-72 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
      {albumImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={albumImageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            WebkitMaskImage: "linear-gradient(to right, black 0%, rgba(0,0,0,0.75) 26%, rgba(0,0,0,0.22) 52%, transparent 82%, transparent 100%)",
            maskImage: "linear-gradient(to right, black 0%, rgba(0,0,0,0.75) 26%, rgba(0,0,0,0.22) 52%, transparent 82%, transparent 100%)",
          }}
          aria-hidden
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/spotify.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            WebkitMaskImage: "linear-gradient(to right, black 0%, rgba(0,0,0,0.75) 26%, rgba(0,0,0,0.22) 52%, transparent 82%, transparent 100%)",
            maskImage: "linear-gradient(to right, black 0%, rgba(0,0,0,0.75) 26%, rgba(0,0,0,0.22) 52%, transparent 82%, transparent 100%)",
          }}
          aria-hidden
        />
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/disc.jpg"
        alt=""
        className="absolute left-2 top-2 h-12 w-12 scale-125 rounded-md border border-zinc-300 object-cover"
        aria-hidden
      />

      <div className="absolute inset-y-0 left-20 right-3 flex flex-col justify-center">
        <div className="mt-1 truncate text-sm font-semibold text-zinc-900">{title}</div>
        {artist && <div className="truncate text-xs text-zinc-500">{artist}</div>}
      </div>
    </div>
  );

  return (
    <a
      href={href ?? undefined}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      aria-label={href ? `Open ${title} on Spotify` : "Spotify now playing"}
      className={href ? "block" : "pointer-events-none block"}
      suppressHydrationWarning
    >
      {content}
    </a>
  );
}
