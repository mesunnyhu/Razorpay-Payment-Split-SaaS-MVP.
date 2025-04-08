import { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";

// TEMP: Replace this with your own logic or real user ID
const TEMP_USER_ID = "admin@gmail.com";

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.splits) {
    return new Response("Missing split data", { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();

  await db.collection("splits").updateOne(
    { userId: TEMP_USER_ID },
    { $set: { userId: TEMP_USER_ID, splits: body.splits } },
    { upsert: true }
  );

  return new Response("Split configuration saved", { status: 200 });
}

export async function GET() {
  const client = await clientPromise;
  const db = client.db();

  const config = await db.collection("splits").findOne({ userId: TEMP_USER_ID });
  return new Response(JSON.stringify(config?.splits || []), { status: 200 });
}
