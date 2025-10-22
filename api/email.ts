import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ ok: false, message: "Method not allowed" });

  try {
    // Simple auth via shared secret header
    const secret = req.headers["x-email-secret"];
    if (!secret || secret !== process.env.EMAIL_WEBHOOK_SECRET) {
      return res.status(401).json({ ok: false, message: "Unauthorized" });
    }

    const { to, subject, html } = req.body || {};
    if (!to || !subject || !html) {
      return res
        .status(400)
        .json({ ok: false, message: "Missing to/subject/html" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT || 587),
      secure:
        (process.env.SMTP_SECURE ?? "false") === "true" ||
        Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });

    await transporter.sendMail({
      from: process.env.FROM_EMAIL ?? "anthonydourado111@gmail.com",
      to,
      subject,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error("email route error:", err);
    return res
      .status(500)
      .json({ ok: false, message: err?.message ?? "Unexpected error" });
  }
}
