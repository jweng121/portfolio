import type { ReactNode } from "react";

export function BulletItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm text-black leading-relaxed">
      <span className="text-black mt-0.5 shrink-0">♦</span>
      <span>{children}</span>
    </li>
  );
}
