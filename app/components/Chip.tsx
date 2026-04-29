import type { ReactNode } from "react";

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="bg-zinc-100 border border-zinc-200 text-zinc-600 px-1.5 py-px text-[10px] mx-0.5 font-mono">
      {children}
    </span>
  );
}
