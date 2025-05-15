"use client"
import Header from "@/components/Header";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { selectBaseUrl } from '@/store/testResultSlice';

function TestResultContent() {
  const params = useSearchParams();
  const examHistoryId = params.get("exam_history_id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [result, setResult] = useState<any>(null);
  const testResult = useSelector((state: RootState) => state.testResult);
  const baseUrl = useSelector(selectBaseUrl);

  // Helper to render the result card
  function renderResultCard({ totalQuestions, correct, incorrect, notAttended, marks }: any) {
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

  useEffect(() => {
    async function fetchResult() {
      setLoading(true);
      setError("");
      // If exam_history_id is 'mock', skip API and show design with query params
      if (examHistoryId === 'mock') {
        setLoading(false);
        setResult(null);
        return;
      }
      try {
        const token = localStorage.getItem("access_token");
        if (!token || !examHistoryId) {
          setError("Missing token or exam history ID");
          setLoading(false);
          return;
        }
        const response = await fetch(`${baseUrl}/answers/result?exam_history_id=${examHistoryId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.message || "Failed to fetch result");
        setResult(data);
      } catch (err: any) {
        // On error, show design with query params if available
        setResult(null);
      } finally {
        setLoading(false);
      }
    }
    fetchResult();
  }, [examHistoryId, baseUrl]);

  if (loading) {
    return <div className="flex-1 flex items-center justify-center">Loading...</div>;
  }

  // If result is null, show design with query params (for mock or API fail)
  if (!result) {
    // Get values from query params
    const totalQuestions = Number(params.get('totalQuestions')) || Number(params.get('questions_count')) || 100;
    const correct = Number(params.get('correct')) || 0;
    const incorrect = Number(params.get('wrong')) || 0;
    const notAttended = Number(params.get('not_attended')) || 0;
    const marks = Number(params.get('score')) || 0;
    return renderResultCard({ totalQuestions, correct, incorrect, notAttended, marks });
  }

  // If Redux has result, use it
  if (testResult && (testResult.examHistoryId === examHistoryId)) {
    return renderResultCard({
      totalQuestions: testResult.totalQuestions,
      correct: testResult.correct,
      incorrect: testResult.incorrect,
      notAttended: testResult.notAttended,
      marks: testResult.marks,
    });
  }

  // If result is available from API
  const totalQuestions = result.questions_count || 100;
  const correct = result.correct || 0;
  const incorrect = result.wrong || 0;
  const notAttended = result.not_attended || 0;
  const marks = result.score || 0;
  return renderResultCard({ totalQuestions, correct, incorrect, notAttended, marks });
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