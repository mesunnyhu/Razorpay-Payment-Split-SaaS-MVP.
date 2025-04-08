import { NextRequest } from "next/server";
import { MongoClient } from "mongodb";

const clientPromise = (async () => {
  const client = new MongoClient(process.env.MONGODB_URI || "");
  await client.connect();
  return client;
})();

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  const client = await clientPromise;
  const db = client.db();

  const payouts = await db.collection("payouts").find({ recipient: email }).toArray();

  return new Response(JSON.stringify(payouts), {
    headers: { "Content-Type": "application/json" },
  });
}
