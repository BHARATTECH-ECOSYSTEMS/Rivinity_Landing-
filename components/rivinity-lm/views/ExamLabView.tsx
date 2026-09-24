"use client";

import { useState } from "react";
import {
  GraduationCap,
  Clock,
  Target,
  Play,
  Sparkles,
  ChevronDown,
  BarChart3,
  Check,
} from "lucide-react";

interface ExamTemplate {
  id: string;
  name: string;
  subject: string;
  questions: number;
  duration: string;
  difficulty: string;
}

const templates: ExamTemplate[] = [
  {
    id: "sat",
    name: "SAT Practice",
    subject: "Math + English",
    questions: 50,
    duration: "60 min",
    difficulty: "Medium",
  },
  {
    id: "ap-bio",
    name: "AP Biology",
    subject: "Biology",
    questions: 40,
    duration: "45 min",
    difficulty: "Hard",
  },
  {
    id: "gcse-math",
    name: "GCSE Mathematics",
    subject: "Mathematics",
    questions: 30,
    duration: "30 min",
    difficulty: "Medium",
  },
  {
    id: "custom",
    name: "Custom Exam",
    subject: "Any",
    questions: 0,
    duration: "Custom",
    difficulty: "Custom",
  },
];

const pastResults = [
  {
    name: "SAT Math Practice",
    score: 85,
    total: 100,
    date: "2 days ago",
    grade: "A",
  },
  {
    name: "Physics Quiz",
    score: 18,
    total: 20,
    date: "1 week ago",
    grade: "A+",
  },
  {
    name: "AP Chemistry",
    score: 32,
    total: 40,
    date: "2 weeks ago",
    grade: "B+",
  },
];

const difficultyOptions = ["Easy", "Medium", "Hard", "Expert"];

const ExamLabView = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(
    null
  );
  const [customTopic, setCustomTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [showDiffDropdown, setShowDiffDropdown] = useState(false);
  const [examStarted, setExamStarted] = useState(false);

  const selectedExam = templates.find(
    (template) => template.id === selectedTemplate
  );

  return (
    <div className="min-h-full bg-white text-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200/70 bg-white/85 backdrop-blur-xl">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-gray-500" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[15px] font-semibold text-gray-900">
                  ExamLab
                </h1>

                <span className="px-2 py-0.5 rounded-full bg-orange-50 text-[#FF5500] text-[9px] font-semibold">
                  AI EXAM
                </span>
              </div>

              <p className="text-[11px] text-gray-400 mt-0.5">
                Simulate exams and get instant performance feedback
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-gray-400">
            <BarChart3 className="w-3.5 h-3.5 text-[#FF5500]" />
            Practice & performance
          </div>
        </div>
      </div>

      <div className="max-w-[850px] mx-auto px-5 py-7">
        {/* Exam Templates */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-[12px] font-semibold text-gray-800">
                Choose an Exam
              </h2>
              <p className="text-[9px] text-gray-400 mt-0.5">
                Select a template or create a custom practice exam
              </p>
            </div>

            <span className="text-[9px] text-gray-400">
              {templates.length} templates
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 sm:grid-cols-2 gap-3">
            {templates.map((template) => {
              const selected = selectedTemplate === template.id;

              return (
                <button
                  key={template.id}
                  onClick={() => {
                    setSelectedTemplate(template.id);
                    setExamStarted(false);
                  }}
                  className={`text-left p-4 rounded-2xl border transition-all ${
                    selected
                      ? "bg-orange-50/60 border-orange-200 shadow-[0_4px_16px_rgba(255,85,0,0.06)]"
                      : "bg-white border-gray-200/80 hover:border-orange-200 hover:shadow-[0_3px_12px_rgba(0,0,0,0.035)]"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        selected
                          ? "bg-[#FF5500]"
                          : "bg-orange-50"
                      }`}
                    >
                      <GraduationCap
                        className={`w-5 h-5 ${
                          selected ? "text-white" : "text-[#FF5500]"
                        }`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-gray-900 truncate">
                        {template.name}
                      </p>

                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {template.subject}
                      </p>
                    </div>

                    {selected && (
                      <div className="w-5 h-5 rounded-full bg-[#FF5500] flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-[9px] text-gray-400">
                      <Target className="w-3 h-3" />
                      {template.questions || "Custom"} Qs
                    </span>

                    <span className="flex items-center gap-1 text-[9px] text-gray-400">
                      <Clock className="w-3 h-3" />
                      {template.duration}
                    </span>

                    <span className="ml-auto text-[9px] text-gray-400">
                      {template.difficulty}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Configure Exam */}
        {selectedTemplate && (
          <section className="bg-white border border-orange-100 rounded-2xl p-5 mb-6 shadow-[0_4px_16px_rgba(255,85,0,0.05)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-[#FF5500]" />
              </div>

              <div>
                <p className="text-[12px] font-semibold text-gray-900">
                  Configure Exam
                </p>

                <p className="text-[9px] text-gray-400 mt-0.5">
                  {selectedExam?.name}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <input
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="Specific topic or chapter (optional)"
                className="flex-1 h-10 bg-white border border-gray-200
                  rounded-xl px-3.5 text-[11px] text-gray-800
                  placeholder:text-gray-400 outline-none
                  focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
              />

              <div className="relative">
                <button
                  onClick={() =>
                    setShowDiffDropdown(!showDiffDropdown)
                  }
                  className="w-full sm:w-[130px] h-10 flex items-center
                    justify-between gap-2 px-3.5 rounded-xl
                    bg-white border border-gray-200
                    text-[10px] font-medium text-gray-600
                    hover:border-gray-300 transition-colors"
                >
                  {difficulty}
                  <ChevronDown className="w-3 h-3" />
                </button>

                {showDiffDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-[130px] bg-white rounded-xl border border-gray-200 shadow-[0_8px_24px_rgba(0,0,0,0.08)] overflow-hidden z-50">
                    {difficultyOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setDifficulty(option);
                          setShowDiffDropdown(false);
                        }}
                        className={`w-full px-3 py-2.5 text-[10px] text-left transition-colors ${
                          option === difficulty
                            ? "bg-orange-50 text-[#FF5500] font-medium"
                            : "text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setExamStarted(true)}
              className="w-full h-11 flex items-center justify-center gap-2
                rounded-xl bg-[#FF5500] text-white text-[11px]
                font-semibold shadow-[0_4px_12px_rgba(255,85,0,0.16)]
                hover:bg-[#e94d00] transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              Start Exam
            </button>

            {examStarted && (
              <div className="mt-3 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-orange-50 text-[#FF5500]">
                <Check className="w-3.5 h-3.5" />
                <span className="text-[10px] font-medium">
                  Exam session started
                </span>
              </div>
            )}
          </section>
        )}

        {/* Past Results */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-[12px] font-semibold text-gray-800">
                Past Results
              </h2>

              <p className="text-[9px] text-gray-400 mt-0.5">
                Review your previous practice performance
              </p>
            </div>

            <span className="text-[9px] text-gray-400">
              {pastResults.length} results
            </span>
          </div>

          <div className="space-y-2">
            {pastResults.map((result, index) => {
              const percentage =
                (result.score / result.total) * 100;
              const isHighGrade = result.grade.startsWith("A");

              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200/80
                    rounded-xl p-4 flex items-center gap-4
                    hover:border-gray-300 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isHighGrade
                        ? "bg-emerald-50"
                        : "bg-amber-50"
                    }`}
                  >
                    <span
                      className={`text-[13px] font-bold ${
                        isHighGrade
                          ? "text-emerald-600"
                          : "text-amber-600"
                      }`}
                    >
                      {result.grade}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-gray-800 truncate">
                      {result.name}
                    </p>

                    <p className="text-[9px] text-gray-400 mt-1">
                      {result.date}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[12px] font-semibold text-gray-800">
                      {result.score}/{result.total}
                    </p>

                    <div className="w-20 h-1.5 rounded-full bg-gray-100 mt-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#FF5500]"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExamLabView;