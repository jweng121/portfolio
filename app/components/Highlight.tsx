import type { ReactNode } from "react";

export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span
      className="text-zinc-800"
      style={{
        textDecoration: "underline",
        textDecorationColor: "#a1a1aa",
        textDecorationThickness: "1px",
        textUnderlineOffset: "3px",
      }}
    >
      {children}
    </span>
  );
}
