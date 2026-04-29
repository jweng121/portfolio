import { Signature } from "./Signature";
import { BulletItem } from "./BulletItem";
import { Highlight } from "./Highlight";
import { SubBulletItem } from './SubBulletItem';

export function MeSection({ onSkeyesClick }: { onSkeyesClick: () => void }) {
  return (
    <div className="relative pt-2">
      <div className="relative flex items-end gap-4">
        <div
          className="absolute pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-70%, -40%)",
            width: "430px",
            opacity: 0.9,
            zIndex: -1,
          }}
        >
          <Signature />
        </div>
        <h1
          className="relative z-10 leading-[0.86] tracking-tight text-zinc-950 whitespace-nowrap"
          style={{ fontSize: "clamp(2.8rem, 6vw, 6.5rem)", fontFamily: '"ZTNature", sans-serif' }}
        >
         james weng
        </h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/skeyes.png"
          alt="skeyes"
          data-custom-click-sound
          onClick={onSkeyesClick}
          className="relative z-10 cursor-pointer"
          style={{ height: "5.4rem", transform: "translateY(2.25rem) translateX(-1rem) rotate(-9deg)" }}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="text-black text-xl font-mono">Computer Science at the University of Waterloo</span>
      </div>

      <p className="text-xl text-black leading-7">
        i&apos;m looking to innovate in <Highlight>finance</Highlight>,{" "}
        <Highlight>machine learning</Highlight>, and <Highlight>sustainability</Highlight>
      </p>

      <ul className="mt-8 space-y-1.5">
        <BulletItem>
          <span className="inline-flex items-center gap-1">
            incoming at{" "}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/revvo-logo.png" alt="Revvo Technologies" className="inline-block invert" style={{ height: "1.5em", width: "auto", verticalAlign: "middle" }} />
            {" "}Revvo Technologies
          </span>
        </BulletItem>
        <BulletItem>
          recently:
          <ul className="mt-1 space-y-1">
            <SubBulletItem>won best use of eleven labs at UofThacks</SubBulletItem>
          </ul>
        </BulletItem>
        <BulletItem>
          previously founded The Traction Initiative, a grassroots non-profit aimed at addressing tire pollution
        </BulletItem>
        <BulletItem>
          fun facts: 
          <ul className="mt-1 space-y-1">
            <SubBulletItem>used to be a barber</SubBulletItem>
            <SubBulletItem>passionate about fitness and sport</SubBulletItem>
          </ul>
        </BulletItem>
        <BulletItem>
          <a href="/resume-04272026.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
            resume ↗
          </a>
        </BulletItem>
       

      </ul>
    </div>
  );
}
