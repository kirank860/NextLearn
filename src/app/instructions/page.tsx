"use client";
import Header from "@/components/Header";
// import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Instructions() {
  const router = useRouter();
  function handleStartTest() {
    router.push('/test');
  }
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#23262F]">
    <div className="w-full">
    <Header />
    </div>
      <div className="w-full bg-[#F5FBFE] p-0 overflow-hidden">
        {/* Content */}
        <div className="flex flex-col items-center px-4 sm:px-10 py-10">
          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 text-gray-800">
            Ancient Indian History MCQ
          </h2>

          {/* Info Cards */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-0 mb-8 w-full max-w-2xl">
            <div className="bg-[#223040] text-white rounded-t-md sm:rounded-l-md sm:rounded-tr-none px-6 sm:px-10 py-4 sm:py-6 flex flex-col items-center flex-1 border-b sm:border-b-0 sm:border-r border-[#F5FBFE] w-full sm:w-auto">
              <span className="text-sm sm:text-base mb-1 font-medium">Total MCQ&apos;s:</span>
              <span className="text-2xl sm:text-4xl font-bold">100</span>
            </div>
            <div className="bg-[#223040] text-white px-6 sm:px-10 py-4 sm:py-6 flex flex-col items-center flex-1 border-b sm:border-b-0 sm:border-r border-[#F5FBFE] w-full sm:w-auto">
              <span className="text-sm sm:text-base mb-1 font-medium">Total marks:</span>
              <span className="text-2xl sm:text-4xl font-bold">100</span>
            </div>
            <div className="bg-[#223040] text-white rounded-b-md sm:rounded-r-md sm:rounded-bl-none px-6 sm:px-10 py-4 sm:py-6 flex flex-col items-center flex-1 w-full sm:w-auto">
              <span className="text-sm sm:text-base mb-1 font-medium">Total time:</span>
              <span className="text-2xl sm:text-4xl font-bold">90:00</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="w-full max-w-2xl mx-auto">
            <h3 className="font-semibold mb-2 text-gray-800 text-base sm:text-lg">Instructions:</h3>
            <ol className="list-decimal list-inside text-gray-700 text-sm sm:text-base mb-10 pl-4 space-y-1">
              <li>You have 100 minutes to complete the test.</li>
              <li>Test consists of 100 multiple-choice q&apos;s.</li>
              <li>You are allowed 2 retest attempts if you do not pass on the first try.</li>
              <li>Each incorrect answer will incur a negative mark of -1/4.</li>
              <li>Ensure you are in a quiet environment and have a stable internet connection.</li>
              <li>Keep an eye on the timer, and try to answer all questions within the given time.</li>
              <li>Do not use any external resources such as dictionaries, websites, or assistance.</li>
              <li>Complete the test honestly to accurately assess your proficiency level.</li>
              <li>Check answers before submitting.</li>
              <li>
                Your test results will be displayed immediately after submission, indicating whether you have
                passed or need to retake the test.
              </li>
            </ol>

            {/* Start Button */}
            <div className="flex justify-center">
              <button onClick={handleStartTest} className="bg-[#223040] text-white px-6 sm:px-10 py-3 rounded-md font-semibold hover:bg-[#1a2530] transition text-base sm:text-lg">
                Start Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
