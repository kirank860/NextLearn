'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!phoneNumber || phoneNumber.length !== 10) {
        setError('Please enter a valid 10-digit phone number');
        return;
      }

      // Send OTP using your backend API
      const formData = new FormData();
      formData.append('mobile', `+91${phoneNumber}`);

      const response = await fetch('https://nexlearn.noviindusdemosites.in/auth/send-otp', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to send OTP');
      }

      // Store phone number for the verify page
      localStorage.setItem('phoneNumber', phoneNumber);

      // Navigate to verify page
      router.push("/login/verify");
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-x-hidden p-4 md:p-0" style={{  
      backgroundImage: 'url("/bg-pattern.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Centered Card */}
      <div className="relative z-10 flex flex-col md:flex-row bg-[#23263A] rounded-xl shadow-2xl overflow-hidden w-full max-w-4xl mx-2 md:mx-4 my-8 md:my-0">
        {/* Left Section */}
        <div className="flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 bg-gradient-to-r from-[#1C3141] to-[#2A4961] md:w-1/2 w-full">
          <div className="flex items-center gap-3 mb-4">
            <Image src="/logo.png" alt="NexLearn Logo" width={248} height={248} className=" " />
            <div></div>
          </div>
          <div className="my-6 sm:my-8 w-full flex justify-center">
            <Image src="/illustration.png" alt="Learning Illustration" width={220} height={180} className="w-40 h-auto sm:w-56" />
          </div>
        </div>
        {/* Right Section */}
        <div className="flex flex-col justify-center p-6 sm:p-8 md:p-12 bg-white md:w-1/2 w-full min-w-[0]">
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Enter your phone number</h2>
            <p className="text-xs sm:text-sm text-gray-500">We use your mobile number to identify your account</p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label htmlFor="phone" className="text-xs text-gray-600">Phone number</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 ring-blue-500">
              <span className="text-gray-500 mr-2"> 🇮🇳  +91</span>
              <input
                id="phone"
                type="tel"
                placeholder="1234 567891"
                className="flex-1 bg-transparent outline-none text-gray-900 text-sm"
                maxLength={10}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                disabled={loading}
              />
            </div>
            {error && (
              <p className="text-xs text-red-500 mt-1">{error}</p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              By tapping Get started, you agree to the <a href="#" className="underline">Terms & Conditions</a>
            </p>
            <button 
              type="submit" 
              className="mt-2 bg-[#1C3141] text-white py-2 rounded-lg font-semibold transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Get Started'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
