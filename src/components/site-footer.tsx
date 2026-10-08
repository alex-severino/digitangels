import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="w-full bg-black px-5 py-10 text-[#e4e4e4] md:px-8">
      <div className="grid grid-cols-3 items-center gap-4">
        <nav className="flex flex-col items-start gap-1 text-left text-[13px] font-bold uppercase tracking-[0.06em] md:text-[14px]">
          <Link href="/terms" className="underline-offset-4 hover:underline">
            Terms and Conditions
          </Link>
          <Link href="/privacy" className="underline-offset-4 hover:underline">
            Privacy Policy
          </Link>
        </nav>
        <p className="text-center text-[13px] leading-relaxed font-bold tracking-[0.02em] text-[#B0B0B0] md:text-[14px]">
          © 2026 Digitangels
        </p>
        <p className="text-right text-[13px] leading-relaxed font-bold tracking-[0.02em] text-[#B0B0B0] md:text-[14px]">
          12 Mulberry Place, Pinnell Road
          <span className="block">LONDON, SE9 6AR</span>
        </p>
      </div>
    </footer>
  );
}
