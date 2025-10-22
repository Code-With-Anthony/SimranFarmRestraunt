import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const EMAIL_WEBHOOK_URL = Deno.env.get("EMAIL_WEBHOOK_URL")!;
const EMAIL_WEBHOOK_SECRET = Deno.env.get("EMAIL_WEBHOOK_SECRET")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SendOTPRequest {
  email: string;
  mobile: string;
  customerName: string;
}

function bad(message: string, status = 400) {
  return new Response(JSON.stringify({ success: false, message }), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, mobile, customerName }: SendOTPRequest = await req.json();

    if (!email && !mobile) return bad("Provide either email or mobile");
    if (email && typeof email !== "string") return bad("Invalid email");
    if (mobile && typeof mobile !== "string") return bad("Invalid mobile");

    //1. Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    //2. Store in DB
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Clean up any expired OTPs
    await supabase.rpc("cleanup_expired_otps");

    // Store OTP in database
    const { error: dbError } = await supabase.from("otp_verifications").insert({
      email,
      mobile,
      otp_code: otpCode,
      expires_at: expiresAt.toISOString(),
      verified: false,
    });

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to store OTP");
    }

    // Send OTP via email calling vercel email hook
    const emailResponse = await await fetch(EMAIL_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-email-secret": EMAIL_WEBHOOK_SECRET,
      },
      body: JSON.stringify({
        to: email,
        subject: "Your Order Verification Code",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Order Verification</h1>
          <p>Hi ${customerName},</p>
          <p>Thank you for placing an order with us! Please use the following OTP to verify your order:</p>
          <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
            <h2 style="color: #4CAF50; font-size: 32px; margin: 0; letter-spacing: 5px;">${otpCode}</h2>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't place this order, please ignore this email.</p>
          <p>Best regards,<br>The Restaurant Team</p>
        </div>
      `,
      }),
    });

    if (!emailResponse.ok) {
      const msg = await emailResponse.text().catch(() => "");
      console.error("Email webhook failed:", emailResponse.status, msg);
      return bad("Failed to send email", 502);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "OTP sent successfully",
        expiresAt: expiresAt.toISOString(),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-otp function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
