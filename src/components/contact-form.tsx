"use client";

import { useEffect, useRef, useState } from "react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const fieldClass =
  "w-full border-0 border-b border-[#e4e4e4]/30 bg-transparent py-3 text-[16px] text-[#e4e4e4] outline-none transition-colors duration-300 focus:border-[#cff63a] md:text-[18px]";

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [honeypot, setHoneypot] = useState("");
  const loadedAt = useRef(Date.now());

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
          ...form,
          _hp: honeypot,
          _t: Date.now() - loadedAt.current,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mx-auto mt-12 flex w-full max-w-xl flex-col gap-8"
    >
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute -left-[9999px] opacity-0"
      />

      <label className="flex flex-col gap-2">
        <span className="text-[11px] font-semibold tracking-[0.16em] text-[#e4e4e4]/55">
          NAME
        </span>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          className={fieldClass}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[11px] font-semibold tracking-[0.16em] text-[#e4e4e4]/55">
          EMAIL
        </span>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
          className={fieldClass}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[11px] font-semibold tracking-[0.16em] text-[#e4e4e4]/55">
          SUBJECT
        </span>
        <input
          type="text"
          required
          value={form.subject}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, subject: e.target.value }))
          }
          className={fieldClass}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[11px] font-semibold tracking-[0.16em] text-[#e4e4e4]/55">
          MESSAGE
        </span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, message: e.target.value }))
          }
          className={`${fieldClass} resize-y`}
        />
      </label>

      {status === "success" ? (
        <p className="text-[14px] text-[#e4e4e4]">Thank you. We’ll be in touch soon.</p>
      ) : null}
      {status === "error" ? (
        <p className="text-[14px] text-[#e4e4e4]/70">
          Something went wrong. Please try again or email hello@digitangels.com
          directly.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start bg-[#cff63a] px-10 py-3 text-[13px] font-semibold tracking-[0.16em] text-[#121713] transition-transform duration-500 hover:-translate-y-0.5 disabled:opacity-40"
      >
        {status === "sending" ? "SENDING…" : "SEND"}
      </button>
    </form>
  );
}
