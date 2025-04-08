import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();

  const payments = await db.collection("payments")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return new Response(JSON.stringify(payments), { status: 200 });
}
