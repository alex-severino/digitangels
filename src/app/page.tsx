import { ComingSoonHeading } from "@/components/coming-soon-heading";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-1 flex-col">
      <div className="flex-1 bg-background" aria-hidden />
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
      <section className="flex w-full flex-1 flex-col items-center bg-white py-12">
        <ComingSoonHeading />
      </section>
    </main>
  );
}
