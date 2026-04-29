export function Signature({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/signature-1.png" alt="James Weng signature" className="block w-full opacity-0" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "#000000",
          WebkitMaskImage: "url('/signature-1.png')",
          maskImage: "url('/signature-1.png')",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      />
    </div>
  );
}
