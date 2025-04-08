'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Dummy login validation
    if (email === 'admin@gmail.com' && password === 'admin123') {
      localStorage.setItem('userEmail', email); // save login state
      router.push('/dashboard');
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          className="block w-full mb-2 border p-2"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full mb-4 border p-2"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
