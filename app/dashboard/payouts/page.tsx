'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function PayoutHistory() {
  const { data: session } = useSession();
  const [payouts, setPayouts] = useState([]);

  useEffect(() => {
    const fetchPayouts = async () => {
      const res = await fetch(`/api/payouts?email=${session?.user?.email}`);
      const data = await res.json();
      setPayouts(data);
    };

    if (session?.user?.email) fetchPayouts();
  }, [session]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Payout History</h1>
      {payouts.length === 0 ? (
        <p>No payouts yet.</p>
      ) : (
        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Recipient</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((p: any, i: number) => (
              <tr key={i} className="border-t">
                <td className="p-2">{p.recipient}</td>
                <td className="p-2">₹{p.amount.toFixed(2)}</td>
                <td className="p-2">{p.status}</td>
                <td className="p-2">{new Date(p.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
