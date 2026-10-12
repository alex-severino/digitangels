"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Magnetic } from "@/components/chrome/fx";
import { Scene } from "@/components/chrome/scene";
import { LazyVideo } from "@/components/lazy-video";
import { EMAIL } from "./data";

const FIELDS = [
  { name: "name", label: "Your name", type: "text", autoComplete: "name" },
  { name: "email", label: "Your email", type: "email", autoComplete: "email" },
  { name: "message", label: "What should we talk about?", type: "textarea", autoComplete: "off" },
] as const;

type Field = (typeof FIELDS)[number]["name"];

function EnrolmentForm() {
  const [form, setForm] = useState<Record<Field, string>>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [honeypot, setHoneypot] = useState("");
  const loadedAt = useRef(0);

  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: "Designwise",
          inbox: "designwise",
          message: form.message,
          _hp: honeypot,
          _t: Date.now() - loadedAt.current,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative grid gap-8 md:gap-10"
    >
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden
        className="absolute -left-[9999px] opacity-0"
      />
      {FIELDS.map((field, i) => {
        const id = `dw-${field.name}`;
        const shared = {
          id,
          name: field.name,
          required: true,
          autoComplete: field.autoComplete,
          value: form[field.name],
          onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setForm((prev) => ({ ...prev, [field.name]: event.target.value })),
          className: "dw-input",
        };
        return (
          <div key={field.name} className="dw-field">
            <label htmlFor={id} className="dw-field-label mb-2 block font-mono text-[10px] tracking-[0.2em] uppercase md:text-[11px]">
              {String(i + 1).padStart(2, "0")} — {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea rows={3} {...shared} />
            ) : (
              <input type={field.type} {...shared} />
            )}
          </div>
        );
      })}

      <div className="flex flex-wrap items-center justify-between gap-6">
        <p className="max-w-[18rem] text-[14px] leading-snug text-[#9eaca2]" aria-live="polite">
          {status === "success"
            ? "Thank you. We'll be in touch."
            : status === "error"
              ? `Something went wrong. Email us at ${EMAIL}.`
              : "Three questions. No homework."}
        </p>
        <Magnetic strength={0.4}>
          <button
            type="submit"
            disabled={status === "sending"}
            className="dw-send grid aspect-square w-[120px] place-items-center rounded-full bg-[#cff63a] text-[20px] font-semibold text-[#121713] italic disabled:opacity-60 md:w-[150px] md:text-[24px]"
          >
            <span className="dw-pill-label">{status === "sending" ? "SENDING" : "SEND ↗"}</span>
          </button>
        </Magnetic>
      </div>
    </form>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative bg-[#121713] px-5 pt-20 pb-32 text-[#e4e4e4] md:px-16 md:pt-32 md:pb-36">
      <Scene mode="view" className="dw-contact-head">
        <h2 className="text-[clamp(3rem,11.5vw,12rem)] leading-[0.86] font-semibold tracking-[-0.045em]">
          <span className="dw-slide dw-slide-l block">LET&apos;S GET</span>
          <span className="dw-slide dw-slide-r block text-right text-[#cff63a] italic">TO KNOW</span>
          <span className="dw-slide dw-slide-l block">EACH OTHER</span>
        </h2>
      </Scene>

      <p className="mt-10 max-w-[38rem] text-[clamp(1.1rem,1.8vw,1.6rem)] leading-snug md:mt-14">
        Drop us a line on{" "}
        <a href={`mailto:${EMAIL}`} className="dt-underline text-[#cff63a]">
          {EMAIL}
        </a>{" "}
        or fill a short form below:
      </p>

      <div className="mt-12 grid items-center gap-12 md:mt-16 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-20">
        <LazyVideo
          src="/designwise/videos/contact.mp4"
          className="mx-auto block aspect-square h-auto w-full max-w-[460px] object-contain"
        />
        <EnrolmentForm />
      </div>

      <footer className="mt-24 flex flex-col gap-4 border-t border-[#9eaca2]/20 pt-6 font-mono text-[10px] tracking-[0.18em] text-[#9eaca2] uppercase md:mt-32 md:flex-row md:items-center md:justify-between md:text-[11px]">
        <a href="https://digitangels.com" className="flex items-center gap-2">
          Designwise — the educational wing of
          <img src="/designwise/images/digitangels-wordmark.png" alt="digitangels" className="h-3.5 w-auto opacity-70" />
        </a>
        <span className="flex gap-6">
          <Link href="/privacy" className="dt-underline">Privacy</Link>
          <Link href="/terms" className="dt-underline">Terms</Link>
        </span>
      </footer>
    </section>
  );
}
