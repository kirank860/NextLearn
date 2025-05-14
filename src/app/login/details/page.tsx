'use client';

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Details() {
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handlePhotoClick() {
    fileInputRef.current?.click();
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhoto(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push('/instructions');
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
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Add Your Details</h2>
            <div className="flex flex-col items-center mb-4">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg w-32 h-32 flex flex-col items-center justify-center text-gray-400 cursor-pointer mb-2 overflow-hidden bg-gray-50 hover:bg-gray-100 transition"
                onClick={handlePhotoClick}
              >
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <span className="text-3xl">📷</span>
                    <span className="text-xs">Add Your Profile picture</span>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>
            </div>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <label htmlFor="name" className="text-xs text-gray-600">Name*</label>
              <input id="name" type="text" placeholder="Enter your Full Name" className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 ring-blue-500 outline-none text-gray-900 text-sm" />
              <label htmlFor="email" className="text-xs text-gray-600">Email</label>
              <input id="email" type="email" placeholder="Enter your Email Address" className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 ring-blue-500 outline-none text-gray-900 text-sm" />
              <label htmlFor="qualification" className="text-xs text-gray-600">Your qualification*</label>
              <input id="qualification" type="text" placeholder="Your qualification" className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 ring-blue-500 outline-none text-gray-900 text-sm" />
              <button type="submit" className="w-full mt-2 bg-[#23263A] text-white py-2 rounded-lg font-semibold hover:bg-[#181A20] transition text-sm sm:text-base">Get Started</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
} 