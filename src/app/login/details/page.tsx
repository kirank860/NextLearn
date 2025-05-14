'use client';

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Details() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [qualification, setQualification] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Get phone number from localStorage (should be set during login flow)
  const phoneNumber = typeof window !== 'undefined' ? localStorage.getItem('phoneNumber') : '';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!phoneNumber) {
        setError('Phone number not found. Please login again.');
        return;
      }
      if (!name || !email || !qualification || !profileImage) {
        setError('All fields are required.');
        return;
      }

      const formData = new FormData();
      formData.append('mobile', phoneNumber && phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('qualification', qualification);
      formData.append('profile_image', profileImage);

      const response = await fetch('https://nexlearn.noviindusdemosites.in/auth/create-profile', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to create profile');
      }
      // Store tokens and user info
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token || '');
      }
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      // Redirect to home or dashboard
      router.push('/instructions');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-4 md:p-0 flex items-center justify-center bg-[#181A20] relative overflow-x-hidden" style={{  backgroundImage: 'url("/bg-pattern.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'}}>
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
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Add Your Details</h2>
            <div className="flex flex-col items-center mb-4">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg w-32 h-32 flex flex-col items-center justify-center text-gray-400 cursor-pointer mb-2 overflow-hidden bg-gray-50 hover:bg-gray-100 transition"
              >
                {profileImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={URL.createObjectURL(profileImage)} alt="Profile Preview" className="w-full h-full object-cover" />
                )}
              </div>
            </div>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <label htmlFor="name" className="text-xs text-gray-600">Name*</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your Full Name"
                className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 ring-blue-500 outline-none text-gray-900 text-sm"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={loading}
              />
              <label htmlFor="email" className="text-xs text-gray-600">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your Email Address"
                className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 ring-blue-500 outline-none text-gray-900 text-sm"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
              />
              <label htmlFor="qualification" className="text-xs text-gray-600">Your qualification*</label>
              <input
                id="qualification"
                type="text"
                placeholder="Your qualification"
                className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 ring-blue-500 outline-none text-gray-900 text-sm"
                value={qualification}
                onChange={e => setQualification(e.target.value)}
                disabled={loading}
              />
              <input
                type="file"
                accept="image/*"
                className="border rounded-lg px-3 py-2"
                onChange={e => setProfileImage(e.target.files?.[0] || null)}
                disabled={loading}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full mt-2 bg-[#1C3141] text-white py-2 rounded-lg font-semibold transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save & Continue'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
} 