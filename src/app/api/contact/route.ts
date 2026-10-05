import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function getTransporter() {
  return nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_SMTP_LOGIN!,
      pass: process.env.BREVO_SMTP_PASSWORD!,
    },
  });
}

function looksLikeGibberish(str: string): boolean {
  if (!str || str.length < 4) return false;
  const letters = str.replace(/[^a-zA-Z]/g, "");
  if (letters.length === 0) return false;
  const upperRatio = (str.match(/[A-Z]/g) ?? []).length / letters.length;
  return upperRatio > 0.6;
}

const DISPOSABLE_DOMAINS = [
  "mailinator.com",
  "guerrillamail.com",
  "trashmail.com",
  "tempmail.com",
  "throwam.com",
  "yopmail.com",
  "sharklasers.com",
  "maildrop.cc",
];

function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  return DISPOSABLE_DOMAINS.some((d) => domain === d || domain.endsWith("." + d));
}

export async function POST(request: NextRequest) {
  if (!process.env.BREVO_SMTP_LOGIN || !process.env.BREVO_SMTP_PASSWORD) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 503 },
    );
  }

  const body = await request.json();
  const { name, email, subject, message, _hp, _t } = body;

  if (_hp && String(_hp).trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (typeof _t === "number" && _t < 800) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (looksLikeGibberish(name) || looksLikeGibberish(subject)) {
    return NextResponse.json({ ok: true });
  }

  if (isDisposableEmail(email)) {
    return NextResponse.json({ ok: true });
  }

  const from = process.env.EMAIL_FROM ?? "hello@digitangels.com";
  const to = process.env.EMAIL_REPLY_TO ?? from;

  try {
    const transporter = getTransporter();

    await transporter.sendMail({
      from: `Digitangels <${from}>`,
      to,
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <hr />
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Brevo SMTP error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
