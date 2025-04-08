import { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  const client = await clientPromise;
  const db = client.db();

  const payouts = await db.collection("payouts").find({ recipient: email }).toArray();

  return new Response(JSON.stringify(payouts), {
    headers: { "Content-Type": "application/json" },
  });
}
