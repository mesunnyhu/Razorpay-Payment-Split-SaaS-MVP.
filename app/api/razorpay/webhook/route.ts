import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  const body = await req.json();

  // ✅ FIX: remove parentheses
  const client = await clientPromise;
  const db = client.db();

  await db.collection("payments").insertOne({
    ...body,
    createdAt: new Date(),
  });

  return new Response("OK", { status: 200 });
}
