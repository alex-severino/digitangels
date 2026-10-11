import { ChromeHalo } from "@/components/chrome/chrome-halo";
import { Magnetic } from "@/components/chrome/fx";
import { Scene } from "@/components/chrome/scene";
import { ContactForm } from "@/components/contact-form";

export function Contact() {
  return (
    <Scene
      as="section"
      mode="view"
      id="contact"
      className="relative scroll-mt-0 overflow-hidden bg-black text-white"
    >
      <div className="absolute inset-0 opacity-60">
        <ChromeHalo mode="field" scale={0.7} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />

      <div className="relative z-10 px-4 pb-24 pt-28 md:px-8 md:pb-36 md:pt-40">
        <div className="mb-10 flex justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/50 md:text-[11px]">
          <span>(06) — Contact</span>
          <span>London — Worldwide</span>
        </div>

        <h2 className="font-semibold uppercase leading-[0.8] tracking-[-0.07em]">
          <span className="block text-[20vw] md:text-[16vw]">Let&apos;s</span>
          <span className="dt-italic dt-chrome-text block pl-[10vw] text-[20vw] normal-case tracking-[-0.04em] md:text-[16vw]">
            talk.
          </span>
        </h2>

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-2 md:gap-10">
          <div className="flex flex-col justify-between gap-10">
            <Magnetic strength={0.2}>
              <a
                href="mailto:hello@digitangels.com"
                data-cursor="Write"
                className="dt-underline block text-[clamp(1.8rem,4.4vw,4.4rem)] font-semibold leading-none tracking-[-0.05em]"
              >
                hello@digitangels.com
              </a>
            </Magnetic>
            <p className="max-w-[24rem] font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-white/50">
              Brand. Digital Product. Design systems. Design orgs. Tell us about
              the unknown you are facing.
            </p>
          </div>
          <div className="dt-glass p-6 md:p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </Scene>
  );
}
