import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="w-full bg-black px-5 py-10 text-center text-white">
      <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13px] font-medium uppercase tracking-[0.06em] md:text-[14px]">
        <Link href="/terms" className="underline-offset-4 hover:underline">
          Terms and Conditions
        </Link>
        <Link href="/privacy" className="underline-offset-4 hover:underline">
          Privacy Policy
        </Link>
      </nav>
      <p className="mt-5 text-[13px] tracking-[0.04em] text-white/70 md:text-[14px]">
        © Digitangels 2026
      </p>
    </footer>
  );
}
