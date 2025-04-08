// app/api/user/payments/route.ts
import { getAuthSession } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const session = await getAuthSession();
  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db();

  const payments = await db.collection("payments")
    .find({ userId: session.user.email })
    .sort({ createdAt: -1 })
    .toArray();

  return new Response(JSON.stringify(payments), { status: 200 });
}
