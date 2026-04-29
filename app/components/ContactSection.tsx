import { SectionHeading } from "./SectionHeading";

export function ContactSection() {
  return (
    <div>
      <SectionHeading>contact</SectionHeading>
      <div className="mt-8 max-w-md">
        <p className="text-black text-sm leading-7">
          always open to having a chat about startups, AI research, software, and just about anything else!
        </p>
        <div className="mt-8 space-y-1">
          {[
            { label: "email", display: "jqweng [at] uwaterloo.ca", href: "mailto:jqweng@uwaterloo.ca" },
            { label: "linkedin", display: "/in/jamesweng", href: "https://www.linkedin.com/in/james-weng-25b759317/" },
          ].map(({ label, display, href }) => (
            <a
              key={label}
              href={href}
              className="group flex items-center gap-6 py-3.5 border-b border-zinc-100 hover:border-zinc-300 transition-colors"
            >
              <span className="text-zinc-300 text-[9px] font-mono tracking-[0.25em] uppercase w-20 shrink-0">
                {label}
              </span>
              <span className="text-zinc-500 text-xs font-mono group-hover:text-zinc-800 transition-colors">
                {display}
              </span>
              <span className="ml-auto text-zinc-300 group-hover:text-zinc-600 transition-colors text-sm">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
