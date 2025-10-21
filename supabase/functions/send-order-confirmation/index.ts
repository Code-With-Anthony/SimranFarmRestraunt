import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  item_name: string;
  quantity: number;
  price_at_time: number;
  item_category: string;
}

interface OrderConfirmationRequest {
  customerName: string;
  customerEmail: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  totalAmount: number;
  couponCode?: string;
  deliveryAddress: string;
  deliveryMobile: string;
  deliveryPincode: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const orderData: OrderConfirmationRequest = await req.json();
    
    console.log("Sending order confirmation to:", orderData.customerEmail);

    // Generate items HTML
    const itemsHtml = orderData.items.map(item => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px 8px;">${item.item_name}</td>
        <td style="padding: 12px 8px; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px 8px; text-align: right;">₹${item.price_at_time.toFixed(2)}</td>
        <td style="padding: 12px 8px; text-align: right;">₹${(item.quantity * item.price_at_time).toFixed(2)}</td>
      </tr>
    `).join('');

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">Order Confirmed!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for your order</p>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #eee; border-top: none;">
          <p>Hi ${orderData.customerName},</p>
          <p>Your order has been confirmed and is being prepared. Here are your order details:</p>
          
          <div style="background: #f9f9f9; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 5px 0;"><strong>Order Number:</strong> ${orderData.orderNumber}</p>
            <p style="margin: 5px 0;"><strong>Delivery Address:</strong> ${orderData.deliveryAddress}</p>
            <p style="margin: 5px 0;"><strong>Pincode:</strong> ${orderData.deliveryPincode}</p>
            <p style="margin: 5px 0;"><strong>Contact:</strong> ${orderData.deliveryMobile}</p>
          </div>

          <h3 style="margin-top: 30px;">Order Summary</h3>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background: #f5f5f5; border-bottom: 2px solid #ddd;">
                <th style="padding: 12px 8px; text-align: left;">Item</th>
                <th style="padding: 12px 8px; text-align: center;">Qty</th>
                <th style="padding: 12px 8px; text-align: right;">Price</th>
                <th style="padding: 12px 8px; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee;">
            <div style="display: flex; justify-content: space-between; margin: 10px 0;">
              <span>Subtotal:</span>
              <span>₹${orderData.subtotal.toFixed(2)}</span>
            </div>
            ${orderData.discountAmount > 0 ? `
              <div style="display: flex; justify-content: space-between; margin: 10px 0; color: #4CAF50;">
                <span>Discount ${orderData.couponCode ? `(${orderData.couponCode})` : ''}:</span>
                <span>-₹${orderData.discountAmount.toFixed(2)}</span>
              </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; margin: 20px 0 0 0; padding-top: 15px; border-top: 1px solid #eee; font-size: 18px; font-weight: bold;">
              <span>Total Amount:</span>
              <span style="color: #667eea;">₹${orderData.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div style="margin-top: 30px; padding: 20px; background: #f0f7ff; border-left: 4px solid #667eea; border-radius: 4px;">
            <p style="margin: 0; color: #555;">We'll notify you when your order is ready for delivery. If you have any questions, please contact us.</p>
          </div>

          <p style="margin-top: 30px;">Thank you for choosing us!</p>
          <p>Best regards,<br><strong>The Restaurant Team</strong></p>
        </div>

        <div style="background: #f5f5f5; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; color: #666; font-size: 12px;">
          <p style="margin: 0;">This is an automated email. Please do not reply.</p>
        </div>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "Restaurant <onboarding@resend.dev>",
      to: [orderData.customerEmail],
      subject: `Order Confirmation - ${orderData.orderNumber}`,
      html: emailHtml,
    });

    console.log("Order confirmation sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Order confirmation sent successfully" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-order-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
