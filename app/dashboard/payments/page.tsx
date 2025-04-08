"use client";

import { useEffect, useState } from "react";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const res = await fetch("/api/user/payments");
        const data = await res.json();
        setPayments(data);
      } catch (err) {
        console.error("Failed to load payments:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPayments();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Payment Split History</h2>

      {payments.length === 0 && <p>No payments found.</p>}

      {payments.map((payment) => (
        <div key={payment._id} className="mb-4 border p-4 rounded bg-gray-100">
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
