import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and Conditions for Art Britannia Ltd, trading as Digitangels.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms and Conditions">
      <p>
        These Terms and Conditions govern the use of this website and the
        services provided by Art Britannia Ltd, trading as Digitangels
        (“Digitangels”, “we”, “us”). By using this website or engaging our
        services, you agree to these terms.
      </p>
      <h2 className="pt-4 text-[13px] font-semibold tracking-[0.18em] text-black">
        WHO WE ARE
      </h2>
      <p>
        Digitangels is a trading name of Art Britannia Ltd. We provide design
        transformation advisory, branding, and related consulting services. For
        any enquiry, contact us at{" "}
        <a
          href="mailto:hello@digitangels.com"
          className="underline-offset-4 hover:underline"
        >
          hello@digitangels.com
        </a>
        .
      </p>
      <h2 className="pt-4 text-[13px] font-semibold tracking-[0.18em] text-black">
        WEBSITE
      </h2>
      <p>
        The content of this website is for general information only. We take
        care to keep it accurate, but we do not warrant that it is complete or
        current. We may change, suspend, or withdraw any part of the site
        without notice.
      </p>
      <h2 className="pt-4 text-[13px] font-semibold tracking-[0.18em] text-black">
        INTELLECTUAL PROPERTY
      </h2>
      <p>
        Unless otherwise stated, the design, text, images, video, and other
        materials on this website are owned by Art Britannia Ltd or used with
        permission. You may not copy, reproduce, or distribute them without our
        prior written consent, except for personal, non-commercial viewing.
      </p>
      <h2 className="pt-4 text-[13px] font-semibold tracking-[0.18em] text-black">
        SERVICES
      </h2>
      <p>
        Work we undertake for clients is governed by a separate proposal,
        statement of work, or contract. Where those documents conflict with
        these website terms, the client agreement prevails. Fees, timelines,
        and deliverables are as set out in that agreement.
      </p>
      <h2 className="pt-4 text-[13px] font-semibold tracking-[0.18em] text-black">
        LIABILITY
      </h2>
      <p>
        To the fullest extent permitted by law, we exclude liability for any
        loss or damage arising from use of this website, including any reliance
        on its content. Nothing in these terms excludes or limits liability for
        death or personal injury caused by negligence, fraud, or any other
        liability that cannot be excluded under English law.
      </p>
      <h2 className="pt-4 text-[13px] font-semibold tracking-[0.18em] text-black">
        THIRD-PARTY LINKS
      </h2>
      <p>
        This website may contain links to other sites. We are not responsible
        for their content or practices.
      </p>
      <h2 className="pt-4 text-[13px] font-semibold tracking-[0.18em] text-black">
        GOVERNING LAW
      </h2>
      <p>
        These terms are governed by the laws of England and Wales. The courts of
        England and Wales have exclusive jurisdiction over any dispute arising
        from them.
      </p>
      <p className="pt-2 text-black/55">Last updated: October 2026</p>
    </LegalPage>
  );
}
