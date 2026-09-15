import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Digitangels is a Design Transformation advisory focused on reshaping how businesses connect with their users.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
        <h1 className="sr-only">About</h1>

        <div className="space-y-8 text-[16px] leading-7 text-black/80 md:text-[18px] md:leading-8">
          <p>
            As a strategic advisor and consultant, I partner with organisations,
            startups, and scale-ups to pivot design from a siloed service into a
            formidable driver of business growth. By integrating design at the
            foundational level, I help leadership teams evolve product maturity
            and unlock untapped commercial value through rigorous, structured,
            data-driven craft.
          </p>

          <div>
            <h2 className="mb-4 text-[13px] font-semibold tracking-[0.18em] text-black">
              GET IN TOUCH
            </h2>
            <p>
              I founded Digitangels, a Design Transformation advisory focused on
              reshaping how businesses connect with their users. Whether we are
              working with high-growth startups or big organisations, our mission
              is to make Design Excellence the leading force for business
              success. By moving design to the centre of the business, we create
              customer-first cultures where senior-level Design Leadership
              becomes a massive competitive advantage. We operate exclusively on
              a referral basis, ensuring a zero-surprises delivery through an
              elite circle of hand-picked, trusted experts.
            </p>
          </div>

          <p className="pt-4">
            <Link
              href="/contact"
              className="text-[15px] font-semibold tracking-[0.08em] text-black underline-offset-4 hover:underline"
            >
              Contact →
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
