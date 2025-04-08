import { getAuthSession } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

export default async function PaymentsPage() {
  const session = await getAuthSession();
  if (!session?.user?.email) {
    return <div className="p-6 text-red-500">You must be logged in.</div>;
  }

  const client = await clientPromise;
  const db = client.db();
  const payments = await db
    .collection("payments")
    .find({ userId: session.user.email })
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Payment Split History</h2>

      {payments.length === 0 && <p>No payments found.</p>}

      {payments.map((payment) => (
        <div key={payment._id.toString()} className="mb-4 border p-4 rounded bg-gray-100">
          <p><strong>Payment ID:</strong> {payment.razorpayPaymentId}</p>
          <p><strong>Amount:</strong> ₹{payment.amount} {payment.currency}</p>
          <p><strong>Date:</strong> {new Date(payment.createdAt).toLocaleString()}</p>
          <h4 className="mt-2 font-semibold">Splits:</h4>
          <ul className="list-disc pl-5">
            {payment.splits.map((split: any, idx: number) => (
              <li key={idx}>
                {split.recipient} - ₹{split.amount} ({split.percentage}%)
                {split.status === "failed" ? (
                  <span className="text-red-500 ml-2">[FAILED]</span>
                ) : (
                  <span className="text-green-600 ml-2">[✔]</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
