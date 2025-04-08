import Link from "next/link";

export default function DashboardPage() {
  const tempEmail = "admin@gmail.com"; // Replace with actual dynamic user ID/email later

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Welcome</h1>
      <p className="text-gray-700">User ID: {tempEmail}</p>

      <Link href="/dashboard/payments" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        View Payment Splits
      </Link>

      <Link href="/dashboard/splits" className="block text-blue-600 underline mt-2">
        Manage Split Config
      </Link>

      <Link href="/dashboard/payouts" className="block text-blue-600 underline mt-2">
        View Payouts
      </Link>
    </div>
  );
}
