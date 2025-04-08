import { NextRequest } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { amount, userId } = body;

  if (!amount || !userId) {
    return new Response("Missing amount or userId", { status: 400 });
  }

  try {
    const response = await razorpay.paymentLink.create({
      amount: amount * 100, // Razorpay expects paise
      currency: "INR",
      description: `Payment for ${userId}`,
      customer: {
        name: "Customer",
        email: "customer@example.com",
      },
      notify: {
        email: true,
        sms: false,
      },
      notes: {
        userId,
      },
      callback_url: "https://yourdomain.com/payment-success",
      callback_method: "get",
    });

    return new Response(JSON.stringify({ url: response.short_url }), {
      status: 200,
    });
  } catch (err) {
    console.error("Payment Link Error:", err);
    return new Response("Failed to create payment link", { status: 500 });
  }
}
