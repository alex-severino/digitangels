import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
        <h1 className="mb-8 text-[40px] font-normal tracking-tight md:text-[56px]">
          Contact
        </h1>
        <p className="mb-10 max-w-xl text-[16px] leading-7 text-black/75 md:text-[18px] md:leading-8">
          Ready to talk about a project, partnership, or idea? Reach out and
          we’ll get back to you.
        </p>
        <a
          href="mailto:hello@digitangels.com"
          className="text-[20px] font-medium tracking-tight text-black underline-offset-4 hover:underline md:text-[28px]"
        >
          hello@digitangels.com
        </a>
      </section>
    </main>
  );
}
