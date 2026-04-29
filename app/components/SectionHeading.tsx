import type { ReactNode } from "react";

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2
      className="inline-block bg-white text-zinc-900 text-4xl px-4 py-1"
      style={{
        fontFamily: '"MangaTB", sans-serif',
        border: "2.5px solid black",
        lineHeight: 1.1,
      }}
    >
      {children}
    </h2>
  );
}
