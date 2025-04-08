'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";

type Split = {
  email: string;
  percentage: string;
};

export default function SplitConfigPage() {
  const { data: session } = useSession();
  const [splits, setSplits] = useState<Split[]>([{ email: "", percentage: "" }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (index: number, field: keyof Split, value: string) => {
    const updatedSplits = [...splits];
    updatedSplits[index][field] = value;
    setSplits(updatedSplits);
  };

  const handleAdd = () => {
    setSplits([...splits, { email: "", percentage: "" }]);
  };

  const handleSave = async () => {
    setLoading(true);
    const res = await fetch("/api/splits", {
      method: "POST",
      body: JSON.stringify({
        userId: session?.user?.email,
        splits,
      }),
    });

    const result = await res.text();
    setMessage(result);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Configure Splits</h1>
      {splits.map((split, i) => (
        <div key={i} className="flex gap-4 mb-2">
          <input
            type="email"
            placeholder="Recipient email"
            value={split.email}
            onChange={(e) => handleChange(i, "email", e.target.value)}
            className="border p-2 w-full"
          />
          <input
            type="number"
            placeholder="%"
            value={split.percentage}
            onChange={(e) => handleChange(i, "percentage", e.target.value)}
            className="border p-2 w-20"
          />
        </div>
      ))}
      <button onClick={handleAdd} className="bg-gray-300 px-4 py-2 rounded">+ Add Recipient</button>
      <br />
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Splits"}
      </button>
      {message && <p className="text-green-600 mt-2">{message}</p>}
    </div>
  );
}
