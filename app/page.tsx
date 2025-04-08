import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-6 sm:p-12 font-sans bg-white text-black dark:bg-black dark:text-white">
      <main className="flex flex-col items-center gap-8 row-start-2 w-full max-w-3xl text-center sm:text-left">
        <Image
          className="dark:invert"
          src="/logo.svg" // You can add your own logo here
          alt="SplitIt Logo"
          width={160}
          height={40}
          priority
        />

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Effortless Payment Splits for Creators and Teams
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
          Automatically split incoming payments between multiple recipients based on custom percentages. Perfect for agencies, creators, or partners.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center sm:justify-start">
          <Link href="/dashboard">
            <button className="rounded-full bg-black text-white dark:bg-white dark:text-black px-6 py-3 text-sm sm:text-base hover:opacity-80 transition">
              Go to Dashboard
            </button>
          </Link>

          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border px-6 py-3 text-sm sm:text-base hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition"
          >
            View GitHub Repo
          </a>
        </div>
      </main>

      <footer className="row-start-3 mt-10 flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
          Built with Next.js
        </a>
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hosted on Vercel
        </a>
        <a
          href="https://razorpay.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Razorpay
        </a>
      </footer>
    </div>
  );
}
