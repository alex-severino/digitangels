import Image from "next/image";
import { ComingSoonHeading } from "@/components/coming-soon-heading";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-1 flex-col">
      <header className="flex w-full shrink-0 justify-start bg-[#000000] px-6 pt-8 pb-6">
        <Image
          src="/images/digitangels_logo.png"
          alt="Digitangels"
          width={240}
          height={80}
          priority
          className="h-12 w-auto invert"
        />
      </header>
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
      <section className="flex w-full flex-1 flex-col items-center bg-white py-12">
        <ComingSoonHeading />
      </section>
    </main>
  );
}
