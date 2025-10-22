import nodemailer from "npm:nodemailer@6.9.4";
const smtpHost = Deno.env.get("SMTP_HOST")!;
const smtpPort = Number(Deno.env.get("SMTP_PORT") || 587);
const smtpUser = Deno.env.get("SMTP_USER")!;
const smtpPass = Deno.env.get("SMTP_PASS")!;

export const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});
