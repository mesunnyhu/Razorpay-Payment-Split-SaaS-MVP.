// app/api/user/split-config/route.ts
import { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getAuthSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getAuthSession();
  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const client = await clientPromise;
  const db = client.db();

  // Save or update split config
  await db.collection("splits").updateOne(
    { userId: session.user.email },
    { $set: { userId: session.user.email, splits: body.splits } },
    { upsert: true }
  );

  return new Response("Split configuration saved", { status: 200 });
}

export async function GET() {
  const session = await getAuthSession();
  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db();

  const config = await db.collection("splits").findOne({ userId: session.user.email });
  return new Response(JSON.stringify(config?.splits || []), { status: 200 });
}
