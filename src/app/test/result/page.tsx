"use client"
import Header from "@/components/Header";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function TestResultContent() {
  const params = useSearchParams();
  const examHistoryId = params.get("exam_history_id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    async function fetchResult() {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("access_token");
        if (!token || !examHistoryId) {
          setError("Missing token or exam history ID");
          setLoading(false);
          return;
        }
        const response = await fetch(`https://nexlearn.noviindusdemosites.in/answers/result?exam_history_id=${examHistoryId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.message || "Failed to fetch result");
        setResult(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchResult();
  }, [examHistoryId]);

  if (loading) {
    return <div className="flex-1 flex items-center justify-center">Loading...</div>;
  }
  if (error) {
    return <div className="flex-1 flex items-center justify-center text-red-600">{error}</div>;
  }
  if (!result) {
    return <div className="flex-1 flex items-center justify-center">No result found.</div>;
  }

  const totalQuestions = result.questions_count || 100;
  const correct = result.correct || 0;
  const incorrect = result.wrong || 0;
  const notAttended = result.not_attended || 0;
  const marks = result.score || 0;

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-6 sm:py-8 px-2">
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto">
        <div className="bg-gradient-to-r from-[#39708A] to-[#223040] rounded-xl text-white text-center py-6 sm:py-8 mb-6 sm:mb-8 px-2 sm:px-0">
          <div className="text-base sm:text-lg mb-2">Marks Obtained:</div>
          <div className="text-3xl sm:text-5xl font-bold">{marks} / {totalQuestions}</div>
        </div>
        <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 text-[#1C3141] text-sm sm:text-base">
            <Image src="/list.png" alt="" width={24} height={24} className="w-6 h-6" />
            <span>Total Questions:</span>
            <span className="font-bold ml-auto">{totalQuestions.toString().padStart(3, '0')}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-[#1C3141] text-sm sm:text-base">
            <Image src="/check.png" alt="" width={24} height={24} className="w-6 h-6" />
            <span>Correct Answers:</span>
            <span className="font-bold ml-auto">{correct.toString().padStart(3, '0')}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-[#1C3141] text-sm sm:text-base">
            <Image src="/wrong.png" alt="" width={24} height={24} className="w-6 h-6" />
            <span>Incorrect Answers:</span>
            <span className="font-bold ml-auto">{incorrect.toString().padStart(3, '0')}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-[#1C3141] text-sm sm:text-base">
            <Image src="/notattended.png" alt="" width={24} height={24} className="w-6 h-6" />
            <span>Not Attended Questions:</span>
            <span className="font-bold ml-auto">{notAttended.toString().padStart(3, '0')}</span>
          </div>
        </div>
        <button className="w-full bg-[#1C3141] text-white py-2 sm:py-3 rounded-md font-semibold hover:bg-[#1a2530] transition text-base sm:text-lg">Done</button>
      </div>
    </div>
  );
}

export default function TestResult() {
  return (
    <main className="min-h-screen bg-[#F5FBFE] flex flex-col">
      <Header />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
        <TestResultContent />
      </Suspense>
    </main>
  );
} 