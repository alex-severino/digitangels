import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Art Britannia Ltd, trading as Digitangels.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        Art Britannia Ltd, trading as Digitangels (“Digitangels”, “we”, “us”),
        is committed to protecting your privacy. This policy explains how we
        collect, use, and look after personal information when you visit
        digitangels.com or contact us.
      </p>
      <h2 className="pt-4 text-[13px] font-semibold tracking-[0.18em] text-black">
        WHO WE ARE
      </h2>
      <p>
        For data protection purposes, Art Britannia Ltd is the controller of
        personal data collected through this website. You can reach us at{" "}
        <a
          href="mailto:hello@digitangels.com"
          className="underline-offset-4 hover:underline"
        >
          hello@digitangels.com
        </a>
        .
      </p>
      <h2 className="pt-4 text-[13px] font-semibold tracking-[0.18em] text-black">
        WHAT WE COLLECT
      </h2>
      <p>
        If you email us or send a message through the contact form, we process
        the information you send — typically your name, email address, subject,
        and the contents of your message. Our website may also collect limited
        technical data such as IP address, browser type, and pages visited,
        through analytics tools used to understand how the site is used.
      </p>
      <h2 className="pt-4 text-[13px] font-semibold tracking-[0.18em] text-black">
        HOW WE USE IT
      </h2>
      <p>
        We use personal information to respond to enquiries, provide our
        services, operate and improve this website, and meet legal obligations.
        We do not sell your personal data.
      </p>
      <h2 className="pt-4 text-[13px] font-semibold tracking-[0.18em] text-black">
        LEGAL BASIS
      </h2>
      <p>
        We process personal data on the basis of our legitimate interests in
        running a design advisory and communicating with people who contact us;
        to take steps at your request before entering a contract; or where
        required by law. Where we use non-essential analytics cookies, we do so
        with your consent where that is required.
      </p>
      <h2 className="pt-4 text-[13px] font-semibold tracking-[0.18em] text-black">
        SHARING
      </h2>
      <p>
        We may share information with trusted service providers who host this
        website, provide email, or run analytics on our behalf. They may only
        process data as instructed by us. We may also disclose information if
        required by law.
      </p>
      <h2 className="pt-4 text-[13px] font-semibold tracking-[0.18em] text-black">
        RETENTION
      </h2>
      <p>
        We keep correspondence and related records only as long as needed for
        the purpose it was collected, including to meet legal, accounting, or
        reporting requirements, and then delete or anonymise it.
      </p>
      <h2 className="pt-4 text-[13px] font-semibold tracking-[0.18em] text-black">
        YOUR RIGHTS
      </h2>
      <p>
        Depending on your location, you may have the right to access, correct,
        delete, or restrict the use of your personal data, to object to
        processing, and to data portability. You may also lodge a complaint
        with the Information Commissioner’s Office (ICO) in the UK. To exercise
        your rights, email{" "}
        <a
          href="mailto:hello@digitangels.com"
          className="underline-offset-4 hover:underline"
        >
          hello@digitangels.com
        </a>
        .
      </p>
      <h2 className="pt-4 text-[13px] font-semibold tracking-[0.18em] text-black">
        COOKIES AND ANALYTICS
      </h2>
      <p>
        This site may use analytics (including Google Analytics) to understand
        traffic and improve the experience. You can control cookies through
        your browser settings.
      </p>
      <h2 className="pt-4 text-[13px] font-semibold tracking-[0.18em] text-black">
        CHANGES
      </h2>
      <p>
        We may update this policy from time to time. The latest version will
        always be published on this page.
      </p>
      <p className="pt-2 text-black/55">Last updated: October 2026</p>
    </LegalPage>
  );
}
