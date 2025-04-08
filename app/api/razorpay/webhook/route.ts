import { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const razorpayPaymentId = body.payload?.payment?.entity?.id;
  const userId = body.payload?.payment?.entity?.notes?.userId;

  if (!razorpayPaymentId || !userId) {
    return new Response("Invalid webhook data", { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();

  const splitConfig = await db.collection("splits").findOne({ userId });

  const amount = Number(body.payload.payment.entity.amount) / 100;

  const splitDetails = splitConfig?.splits?.map((split: any) => ({
    recipient: split.email,
    percentage: split.percentage,
    amount: (amount * split.percentage) / 100,
  })) || [];

  // Save payment
  await db.collection("payments").insertOne({
    userId,
    razorpayPaymentId,
    amount,
    currency: body.payload.payment.entity.currency,
    splitDetails,
    createdAt: new Date(),
  });

  // Simulate payouts
  for (const detail of splitDetails) {
    await db.collection("payouts").insertOne({
      paymentId: razorpayPaymentId,
      recipient: detail.recipient,
      amount: detail.amount,
      status: "simulated", // change to "success" after real payout
      createdAt: new Date(),
    });
  }

  return new Response("Payment split + payouts logged", { status: 200 });
}
