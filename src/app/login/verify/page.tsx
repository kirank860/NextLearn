'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Verify() {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  useEffect(() => {
    // Get phone number from localStorage
    const storedPhone = localStorage.getItem('phoneNumber');
    if (!storedPhone) {
      router.push('/login');
      return;
    }
    setPhoneNumber(storedPhone);
  }, [router]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendDisabled && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setResendDisabled(false);
      setResendTimer(30);
    }
    return () => clearInterval(timer);
  }, [resendDisabled, resendTimer]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!otp || otp.length !== 6) {
        setError('Please enter a valid 6-digit code');
        return;
      }

      // Verify OTP using your backend API
      const formData = new FormData();
      formData.append('mobile', phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`);
      formData.append('otp', otp);

      const response = await fetch('https://nexlearn.noviindusdemosites.in/auth/verify-otp', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to verify OTP');
      }

      // Store tokens if login is successful
      if (data.login && data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token || '');
        localStorage.setItem('token_type', data.token_type || 'Bearer');
      }

      // Do NOT remove phone number here; keep it for the details page
      // localStorage.removeItem('phoneNumber');
      
      // Navigate to details page or next step
      router.push("/login/details");
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  async function handleResendOTP() {
    setError('');
    setResendDisabled(true);
    setResendTimer(30);

    try {
      const formData = new FormData();
      formData.append('mobile', phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`);
      const response = await fetch('https://nexlearn.noviindusdemosites.in/auth/send-otp', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to resend OTP');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend OTP');
      setResendDisabled(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center p-4 md:p-0 justify-center relative overflow-x-hidden" style={{  
      backgroundImage: 'url("/bg-pattern.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Background pattern overlay */}
     
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
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Enter the code we texted you</h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-2">We&apos;ve sent an SMS to {phoneNumber}</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-0">
              <label htmlFor="sms" className="text-xs text-gray-600">SMS code</label>
              <input
                id="sms"
                type="text"
                placeholder="123 456"
                className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 ring-blue-500 outline-none text-gray-900 text-sm mb-2"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                disabled={loading}
              />
              {error && (
                <p className="text-xs text-red-500 mb-2">{error}</p>
              )}
              <p className="text-xs text-gray-400 mb-2">Your 6 digit code is on its way. This can sometimes take a few moments to arrive.</p>
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={resendDisabled}
                className="text-xs text-blue-600 underline mb-4 inline-block disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resendDisabled ? `Resend code in ${resendTimer}s` : 'Resend code'}
              </button>
              <button 
                type="submit" 
                className="w-full mt-2 bg-[#1C3141] text-white py-2 rounded-lg font-semibold transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Get Started'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
} 