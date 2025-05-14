"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    router.push("/");
  };

  return (
    <>
      <div className="flex justify-between items-center px-2 sm:px-4 md:px-8 py-3 sm:py-4 bg-white border-b border-gray-200">
        <div></div>
        <Image src="/logo2.png" alt="NexLearn Logo" width={120} height={36} className="w-28 sm:w-40 h-auto" />
        <button
          className="bg-[#39708A] text-white px-4 sm:px-6 py-2 rounded-md text-sm sm:text-base"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs flex flex-col items-center relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
              onClick={() => setShowLogoutModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="text-lg font-semibold mb-4 text-center text-[#1C3141]">Are you suure you want to logout?</div>
            <div className="flex gap-4 w-full mt-2">
              <button
                className="flex-1 bg-gray-200 text-[#1C3141] py-2 rounded-md font-semibold hover:bg-gray-300 transition"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-[#223040] text-white py-2 rounded-md font-semibold hover:bg-[#1a2530] transition"
                onClick={confirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 