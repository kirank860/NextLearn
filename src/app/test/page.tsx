"use client";
import Image from "next/image";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

// Generate 100 dummy questions
const questions = Array.from({ length: 100 }, (_, i) => ({
  question: `Q${i + 1}. This is a sample question number ${i + 1}. What is the answer?`,
  image: i === 0 ? "/test-img.jpg" : undefined, // Only first question has an image
  options: [
    `Option A for Q${i + 1}`,
    `Option B for Q${i + 1}`,
    `Option C for Q${i + 1}`,
    `Option D for Q${i + 1}`,
  ],
}));

export default function Test() {
  const [showComprehensiveParagraph, setShowComprehensiveParagraph] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<(string | null)[]>(Array(100).fill(null));
  const [markedForReview, setMarkedForReview] = useState<boolean[]>(Array(100).fill(false));
  const [visited, setVisited] = useState<boolean[]>(() => {
    const arr = Array(100).fill(false);
    arr[0] = true;
    return arr;
  });
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const router = useRouter();

  // Dummy correct answers for demonstration
  const correctAnswers = useMemo(() => Array(100).fill("A"), []); // All correct answers are 'A'

  const toggleComprehensiveParagraph = () => {
    setShowComprehensiveParagraph(!showComprehensiveParagraph);
  };

  const handleOptionChange = (option: string) => {
    const updated = [...selectedOptions];
    updated[currentQuestion] = option;
    setSelectedOptions(updated);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      const updatedVisited = [...visited];
      updatedVisited[currentQuestion + 1] = true;
      setVisited(updatedVisited);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleMarkForReview = () => {
    const updated = [...markedForReview];
    updated[currentQuestion] = !updated[currentQuestion];
    setMarkedForReview(updated);
  };

  const handleGridClick = (i: number) => {
    const updatedVisited = [...visited];
    updatedVisited[i] = true;
    setVisited(updatedVisited);
    setCurrentQuestion(i);
  };

  // Submit modal logic
  const questionsAnswered = useMemo(() => selectedOptions.filter(Boolean).length, [selectedOptions]);
  const questionsMarked = useMemo(() => markedForReview.filter(Boolean).length, [markedForReview]);
  const allAnswered = questionsAnswered === questions.length;

  const q = questions[currentQuestion];
  const selectedOption = selectedOptions[currentQuestion];
  const isMarked = markedForReview[currentQuestion];

  // Helper for grid button color
  function getGridButtonClass(i: number) {
    if (markedForReview[i] && selectedOptions[i]) {
      // Answered and marked for review
      return "bg-[#4CAF50] text-white border-2 border-[#7B2FF2]";
    } else if (markedForReview[i]) {
      // Marked for review only
      return "bg-[#800080] text-white]";
    } else if (selectedOptions[i]) {
      // Answered
      return "bg-[#27AE60] text-white ";
    } else if (visited[i]) {
      // Visited but not answered
      return "bg-[#E74C3C] text-white ";
    } else {
      // Not attended
      return "bg-white border border-gray-300 text-gray-700";
    }
  }

  // Show submit modal automatically if all questions are answered
  if (allAnswered && !showSubmitModal) {
    setShowSubmitModal(true);
  }

  // Submit handler
  const handleSubmitTest = () => {
    const answered = selectedOptions.filter(Boolean).length;
    let correct = 0;
    let incorrect = 0;
    for (let i = 0; i < selectedOptions.length; i++) {
      if (selectedOptions[i]) {
        if (selectedOptions[i] === correctAnswers[i]) correct++;
        else incorrect++;
      }
    }
    const notAttended = selectedOptions.filter((v) => !v).length;
    const marks = correct; // For demo, 1 mark per correct
    router.push(`/test/result?answered=${answered}&correct=${correct}&incorrect=${incorrect}&notAttended=${notAttended}&marks=${marks}`);
  };

  return (
    <main className="min-h-screen bg-[#F5FBFE]">
       <Header />
     

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 p-4 sm:p-6 max-w-[1450px] ">
        {/* Left: Question Area */}
        <div className="w-full lg:flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-[#1c3141]">Ancient Indian History MCQ</h2>
            <div className="text-sm bg-white text-[#1c3141] px-3 py-1 rounded">{String(currentQuestion + 1).padStart(2, '0')}/100</div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
            <button
              className="flex items-center gap-2 bg-[#39708A] text-white px-4 py-2 rounded mb-6 text-sm"
              onClick={toggleComprehensiveParagraph}
            >
              <span></span> Read Comprehensive Paragraph
            </button>

            <div className="mb-6">
              <span className="font-medium text-[#1c3141]">
                {q.question}
              </span>
            </div>

            {q.image && (
              <div className="mb-6">
                <Image src={q.image} alt="Question" width={300} height={160} className="rounded" />
              </div>
            )}

            <div className="mb-3 text-sm text-gray-600">Choose the answer:</div>

            <div className="flex flex-col gap-3 text-[#1c3141]">
              {["A", "B", "C", "D"].map((opt, idx) => (
                <label
                  key={opt}
                  className={`flex items-center border rounded-md px-4 py-3 cursor-pointer ${selectedOption === opt ? "bg-blue-50 border-blue-500" : "bg-white border-gray-300"}`}
                >
                  <input
                    type="radio"
                    name={`option-${currentQuestion}`}
                    className="mr-3"
                    checked={selectedOption === opt}
                    onChange={() => handleOptionChange(opt)}
                  />
                  <span className="flex-1">{opt}. {q.options[idx]}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-wrap gap-4 sm:gap-8">
            <button
              className={`px-20 sm:px-16 py-2 rounded-md font-medium ${isMarked ? 'bg-gray-300 text-[#1C3141]' : 'bg-[#800080] text-white'}`}
              onClick={handleMarkForReview}
            >
              {isMarked ? 'Unmark Review' : 'Mark for review'}
            </button>
            <button
              className="bg-[#CECECE] text-[#1C3141] px-6 sm:px-22 py-2 rounded-md font-medium"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            <button
              className="bg-[#1C3141] text-white px-6 sm:px-22 py-2 rounded-md font-medium"
              onClick={handleNext}
              disabled={currentQuestion === questions.length - 1}
            >
              Next
            </button>
            <button
              className="bg-[#223040] text-white px-6 sm:px-10 py-2 rounded-md font-semibold hover:bg-[#1a2530] transition text-base sm:text-lg"
              onClick={() => setShowSubmitModal(true)}
            >
              Submit Test
            </button>
          </div>
        </div>

        {/* Right: Navigation Panel */}
        <div className="w-full lg:w-[530px]">
          <div className="flex justify-between items-center mb-4">
            <div className="font-medium text-sm text-[#1c3141]">Question No. Sheet:</div>
            <div className="font-medium text-sm flex items-center gap-2 text-[#1c3141]">
              Remaining Time:
              <span className="inline-flex items-center gap-1">
                <span className="material-icons">schedule</span>
                <span>87:13</span>
              </span>
            </div>
          </div>

          {/* Question Number Grid */}
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-4 mb-6">
            {Array.from({ length: 100 }, (_, i) => (
              <button
                key={i}
                className={`rounded h-12 w-12 text-sm font-medium flex items-center justify-center
                  ${getGridButtonClass(i)}
                  ${i === currentQuestion ? 'ring-2 ring-[#1C3141]' : ''}`}
                onClick={() => handleGridClick(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 text-xs text-[#1c3141]">
            <div className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded bg-[#27AE60]"></span> Attended</div>
            <div className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded bg-[#E74C3C]"></span> Not Attended</div>
            <div className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded bg-[#800080]"></span> Marked For Review</div>
            <div className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded border-2 border-[#7B2FF2]"></span> Answered and Marked For Review</div>
          </div>
        </div>
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs sm:max-w-sm flex flex-col items-center relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
              onClick={() => setShowSubmitModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="text-lg font-semibold mb-4 text-center text-[#1C3141]">Are you sure you want to submit the test?</div>
            <div className="flex flex-col gap-3 w-full mb-4 text-[#1C3141]">
              <div className="flex items-center gap-3 text-sm">
                  <Image src="/clock.png" alt="" width={20} height={20} className="mr-2" />
                <span>Remaining Time:</span>
                <span className="font-bold ml-auto">87:13</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
         <Image src="/list.png" alt="" width={20} height={20} className="mr-2" />
                <span>Total Questions:</span>
                <span className="font-bold ml-auto">{questions.length.toString().padStart(3, '0')}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Image src="/check.png" alt="" width={20} height={20} className="mr-2" />
                <span>Questions Answered:</span>
                <span className="font-bold ml-auto">{questionsAnswered.toString().padStart(3, '0')}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
              <Image src="/review.png" alt="" width={20} height={20} className="mr-2" />
                <span>Marked for review:</span>
                <span className="font-bold ml-auto">{questionsMarked.toString().padStart(3, '0')}</span>
              </div>
            </div>
            <button className="w-full bg-[#223040] text-white py-2 rounded-md font-semibold hover:bg-[#1a2530] transition"
              onClick={handleSubmitTest}
            >Submit Test</button>
          </div>
        </div>
      )}

      {/* Paragraph Modal */}
      {showComprehensiveParagraph && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-7xl max-h-[90vh] overflow-y-auto shadow-lg border border-gray-700">
            <div className="p-4 sm:p-6">
              <h3 className="text-lg font-medium mb-4 text-[#1c3141]">Comprehensive Paragraph</h3>

              <div className="prose max-w-none text-gray-800 text-sm sm:text-base">
                <p>Ancient Indian history spans several millennia and offers a profound glimpse into the origins of one of the world's oldest and most diverse civilizations. It begins with the Indus Valley Civilization (c. 2500–1500 BCE), which is renowned for its advanced urban planning, architecture, and water management systems. Cities like Harappa and Mohenjo-Daro were highly developed, with sophisticated drainage systems and well-organized streets, showcasing the early brilliance of Indian civilization.</p>

                <p>Following the Indus Valley Civilization, the Vedic Period (c. 1500–600 BCE) saw the arrival of the Aryans in northern India. This period is characterized by the composition of the Vedas, which laid the foundations of Hinduism and early Indian society.</p>

                <p>The 6th century BCE marked a turning point with the emergence of new religious and philosophical movements. Buddhism and Jainism, led by Gautama Buddha and Mahavira, challenged the existing Vedic orthodoxy and offered alternative paths to spiritual enlightenment.</p>

                <p>The Maurya Empire (c. 322–185 BCE), founded by Chandragupta Maurya, became the first large empire to unify much of the Indian subcontinent. Under Ashoka the Great, the empire reached its zenith, and Buddhism flourished both in India and abroad.</p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={toggleComprehensiveParagraph}
                  className="bg-[#1c3141] text-white px-6 py-2 rounded hover:bg-[#15232f] transition-colors"
                >
                  Minimize
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
