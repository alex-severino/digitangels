import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="w-full bg-black px-5 py-10 text-[#e4e4e4] md:px-8">
      <div className="flex items-center justify-between gap-1.5 md:grid md:grid-cols-3 md:gap-4">
        <nav className="flex shrink-0 flex-col items-start gap-1 text-left text-[8px] font-bold uppercase tracking-[0.01em] md:text-[14px] md:tracking-[0.06em]">
          <Link
            href="/terms"
            className="whitespace-nowrap underline-offset-4 hover:underline"
          >
            Terms and Conditions
          </Link>
          <Link
            href="/privacy"
            className="whitespace-nowrap underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
        </nav>
        <p className="shrink-0 whitespace-nowrap text-center text-[8px] leading-relaxed font-bold tracking-[0.01em] text-[#B0B0B0] md:text-[14px] md:tracking-[0.02em]">
          © 2026 Digitangels
        </p>
        <p className="shrink-0 text-right text-[8px] leading-snug font-bold tracking-[0.01em] text-[#B0B0B0] md:text-[14px] md:leading-relaxed md:tracking-[0.02em]">
          <span className="whitespace-nowrap">
            12 Mulberry Place, Pinnell Road
          </span>
          <span className="block whitespace-nowrap">LONDON, SE9 6AR</span>
        </p>
      </div>
    </footer>
  );
}
