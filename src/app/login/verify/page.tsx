'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Verify() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/login/details");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#181A20] relative overflow-x-hidden">
      {/* Background pattern overlay */}
      <div className="fixed inset-0 z-0">
        <Image src="/bg-pattern.png" alt="Background Pattern" fill className="object-cover opacity-40" />
      </div>
      {/* Centered Card */}
      <div className="relative z-10 flex flex-col md:flex-row bg-[#23263A] rounded-xl shadow-2xl overflow-hidden w-full max-w-4xl mx-2 md:mx-4 my-8 md:my-0">
        {/* Left Section */}
        <div className="flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 bg-gradient-to-b from-[#23263A] to-[#181A20] md:w-1/2 w-full">
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
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Enter the code we texted you</h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-2">We&apos;ve sent an SMS to +91 1234 567891</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-0">
              <label htmlFor="sms" className="text-xs text-gray-600">SMS code</label>
              <input
                id="sms"
                type="text"
                placeholder="123 456"
                className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 ring-blue-500 outline-none text-gray-900 text-sm mb-2"
                maxLength={6}
              />
              <p className="text-xs text-gray-400 mb-2">Your 6 digit code is on its way. This can sometimes take a few moments to arrive.</p>
              <a href="#" className="text-xs text-blue-600 underline mb-4 inline-block">Resend code</a>
              <button type="submit" className="w-full mt-2 bg-[#23263A] text-white py-2 rounded-lg font-semibold hover:bg-[#181A20] transition text-sm sm:text-base">Get Started</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
} 