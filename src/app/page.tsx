import { ComingSoonHeading } from "@/components/coming-soon-heading";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-1 flex-col">
      <div className="flex-1 bg-[#000000]" aria-hidden />
      <div className="w-full shrink-0 leading-[0]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="block h-auto w-full"
          src="/videos/Hands-Halo.mp4"
        />
      </div>
      <div className="flex w-full flex-1 flex-col bg-white">
        <section className="flex flex-1 flex-col items-center justify-center py-12">
          <ComingSoonHeading />
        </section>
        <SiteFooter />
      </div>
    </main>
  );
}
