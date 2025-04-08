import { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, splits } = body;

  // Validate percentage total
  const total = splits.reduce((sum: number, s: any) => sum + s.percentage, 0);
  if (total > 100) {
    return new Response("Total percentage cannot exceed 100%", { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();

  await db.collection("splits").updateOne(
    { userId },
    { $set: { splits } },
    { upsert: true }
  );

  return new Response("Split config saved", { status: 200 });
}
