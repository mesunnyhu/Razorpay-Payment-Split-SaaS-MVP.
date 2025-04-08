"use client";

import { useState } from "react";

export default function PaymentLinkForm({ userId }: { userId: string }) {
  const [amount, setAmount] = useState("");
  const [link, setLink] = useState("");

  const createPaymentLink = async () => {
    const res = await fetch("/api/payment-link", {
      method: "POST",
      body: JSON.stringify({ amount: parseFloat(amount), userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setLink(data.url);
  };

  return (
    <div className="mt-6">
      <input
        type="number"
        placeholder="Enter amount"
        className="border px-2 py-1"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={createPaymentLink} className="ml-2 bg-black text-white px-3 py-1 rounded">
        Create Link
      </button>

      {link && (
        <div className="mt-4">
          <p>Payment Link:</p>
          <a href={link} target="_blank" className="text-blue-500 underline">
            {link}
          </a>
        </div>
      )}
    </div>
  );
}
