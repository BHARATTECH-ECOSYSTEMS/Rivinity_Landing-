"use client";

import { useState } from "react";
import {
  HelpCircle,
  Check,
  X,
  Lightbulb,
  ChevronRight,
  Trophy,
  RotateCcw,
  Sparkles,
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  hint: string;
  explanation: string;
}

const sampleQuiz: Question[] = [
  {
    id: 1,
    question:
      "Which planet is known as the Red Planet?",
    options: [
      "Venus",
      "Mars",
      "Jupiter",
      "Saturn",
    ],
    correct: 1,
    hint: "It's named after the Roman god of war.",
    explanation:
      "Mars appears red due to iron oxide (rust) on its surface. It's the fourth planet from the Sun.",
  },
  {
    id: 2,
    question:
      "What is the chemical symbol for Gold?",
    options: [
      "Go",
      "Gd",
      "Au",
      "Ag",
    ],
    correct: 2,
    hint:
      "It comes from the Latin word 'Aurum'.",
    explanation:
      "Au comes from 'Aurum', the Latin word for gold. Silver's symbol Ag comes from 'Argentum'.",
  },
  {
    id: 3,
    question:
      "Who wrote 'Romeo and Juliet'?",
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "Jane Austen",
      "Mark Twain",
    ],
    correct: 1,
    hint:
      "He was born in Stratford-upon-Avon.",
    explanation:
      "William Shakespeare wrote Romeo and Juliet around 1594-1596. It's one of his earliest tragedies.",
  },
];

const QuizzesView = () => {
  const [currentQ, setCurrentQ] =
    useState(0);

  const [selected, setSelected] =
    useState<number | null>(null);

  const [showHint, setShowHint] =
    useState(false);

  const [showExplanation, setShowExplanation] =
    useState(false);

  const [score, setScore] =
    useState(0);

  const [answered, setAnswered] =
    useState(false);

  const [completed, setCompleted] =
    useState(false);

  const question = sampleQuiz[currentQ];

  const progress =
    ((currentQ + 1) / sampleQuiz.length) *
    100;

  /* =========================================================
     SELECT ANSWER
  ========================================================= */

  const handleSelect = (index: number) => {
    if (answered) return;

    setSelected(index);
    setAnswered(true);
    setShowExplanation(true);

    if (index === question.correct) {
      setScore((previous) => previous + 1);
    }
  };

  /* =========================================================
     NEXT QUESTION
  ========================================================= */

  const nextQuestion = () => {
    if (
      currentQ >=
      sampleQuiz.length - 1
    ) {
      setCompleted(true);
      return;
    }

    setCurrentQ(
      (previous) => previous + 1
    );

    setSelected(null);
    setShowHint(false);
    setShowExplanation(false);
    setAnswered(false);
  };

  /* =========================================================
     RESTART
  ========================================================= */

  const restart = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowHint(false);
    setShowExplanation(false);
    setAnswered(false);
    setScore(0);
    setCompleted(false);
  };

  /* =========================================================
     COMPLETED SCREEN
  ========================================================= */

  if (completed) {
    const percentage = Math.round(
      (score / sampleQuiz.length) * 100
    );

    return (
      <div
        className="
          flex
          h-full
          min-h-0
          w-full
          flex-col
          bg-white
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-3
            border-b
            border-gray-200/70
            bg-white/80
            px-5
            py-3
            backdrop-blur-sm
            sm:px-7
          "
        >

          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-gray-50
            "
          >
            <HelpCircle
              className="
                h-4.5
                w-4.5
                text-gray-500
              "
            />
          </div>

          <div>
            <h1
              className="
                text-[14px]
                font-semibold
                text-[#242631]
              "
            >
              Quiz Complete
            </h1>

            <p
              className="
                text-[11px]
                text-gray-400
              "
            >
              Here's how you performed
            </p>
          </div>
        </div>

        {/* RESULT */}

        <div
          className="
            flex
            min-h-0
            flex-1
            items-center
            justify-center
            overflow-y-auto
            px-5
            py-10
          "
        >
          <div
            className="
              w-full
              max-w-[520px]
              text-center
            "
          >
            {/* TROPHY */}

            <div
              className="
                mx-auto
                mb-6
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-orange-50
                ring-8
                ring-orange-50/50
              "
            >
              <Trophy
                className="
                  h-9
                  w-9
                  text-[#FF5500]
                "
                strokeWidth={1.8}
              />
            </div>

            <h2
              className="
                text-[26px]
                font-semibold
                tracking-[-0.02em]
                text-[#30313D]
              "
            >
              Quiz Complete!
            </h2>

            <p
              className="
                mt-2
                text-[13px]
                text-gray-500
              "
            >
              You scored{" "}
              <span className="font-semibold text-gray-700">
                {score}
              </span>{" "}
              out of{" "}
              <span className="font-semibold text-gray-700">
                {sampleQuiz.length}
              </span>{" "}
              ({percentage}%)
            </p>

            {/* SCORE INDICATORS */}

            <div
              className="
                my-7
                flex
                items-center
                justify-center
                gap-2
              "
            >
              {sampleQuiz.map(
                (questionItem, index) => (
                  <div
                    key={questionItem.id}
                    className={`
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full

                      ${
                        index < score
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-500"
                      }
                    `}
                  >
                    {index < score ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <X className="h-4 w-4" />
                    )}
                  </div>
                )
              )}
            </div>

            {/* RESULT CARD */}

            <div
              className="
                mb-7
                rounded-[18px]
                border
                border-gray-200/80
                bg-white
                p-5
                shadow-[0_2px_12px_rgba(0,0,0,0.035)]
              "
            >
              <div className="flex items-center justify-between">
                <span
                  className="
                    text-[11px]
                    text-gray-400
                  "
                >
                  Accuracy
                </span>

                <span
                  className="
                    text-[14px]
                    font-semibold
                    text-[#FF5500]
                  "
                >
                  {percentage}%
                </span>
              </div>

              <div
                className="
                  mt-3
                  h-2
                  overflow-hidden
                  rounded-full
                  bg-gray-100
                "
              >
                <div
                  className="
                    h-full
                    rounded-full
                    bg-[#FF5500]
                    transition-all
                  "
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>

            {/* ACTIONS */}

            <div
              className="
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <button
                type="button"
                onClick={restart}
                className="
                  flex
                  h-10
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-5
                  text-[11px]
                  font-medium
                  text-gray-600
                  shadow-sm
                  transition-all
                  hover:border-gray-300
                  hover:text-gray-900
                "
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Retry
              </button>

              <button
                type="button"
                onClick={restart}
                className="
                  flex
                  h-10
                  items-center
                  gap-2
                  rounded-xl
                  bg-[#FF5500]
                  px-5
                  text-[11px]
                  font-semibold
                  text-white
                  shadow-[0_3px_10px_rgba(255,85,0,0.15)]
                  transition-all
                  hover:bg-[#E64D00]
                "
              >
                <Sparkles className="h-3.5 w-3.5" />
                New Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     QUIZ PAGE
  ========================================================= */

  return (
    <div
      className="
        flex
        h-full
        min-h-0
        w-full
        flex-col
        bg-white
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          flex
          shrink-0
          items-center
          justify-between
          border-b
          border-gray-200/70
          bg-white/80
          px-5
          py-3
          backdrop-blur-sm
          sm:px-7
        "
      >
        <div className="flex items-center gap-3">
          

          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-gray-50
            "
          >
            <HelpCircle
              className="
                h-4.5
                w-4.5
                text-gray-500
              "
              strokeWidth={2}
            />
          </div>

          <div>
            <h1
              className="
                text-[14px]
                font-semibold
                text-[#242631]
              "
            >
              Quizzes
            </h1>

            <p
              className="
                text-[11px]
                text-gray-400
              "
            >
              Test your knowledge and learn as you go
            </p>
          </div>
        </div>

        {/* SCORE */}

        <div
          className="
            rounded-xl
            border
            border-gray-200
            bg-white
            px-3
            py-1.5
          "
        >
          <span
            className="
              text-[10px]
              text-gray-400
            "
          >
            Score
          </span>

          <span
            className="
              ml-1.5
              text-[11px]
              font-semibold
              text-[#FF5500]
            "
          >
            {score}
          </span>
        </div>
      </div>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div
        className="
          min-h-0
          flex-1
          overflow-y-auto
          px-4
          py-6
          sm:px-6
          sm:py-8
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[650px]
          "
        >
          {/* =================================================
              PROGRESS
          ================================================= */}

          <div className="mb-7">
            <div
              className="
                mb-2
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-[11px]
                  font-medium
                  text-gray-500
                "
              >
                Question {currentQ + 1} of{" "}
                {sampleQuiz.length}
              </span>

              <span
                className="
                  text-[10px]
                  font-medium
                  text-gray-400
                "
              >
                {Math.round(progress)}%
              </span>
            </div>

            <div
              className="
                h-1.5
                overflow-hidden
                rounded-full
                bg-gray-200
              "
            >
              <div
                className="
                  h-full
                  rounded-full
                  bg-[#FF5500]
                  transition-all
                  duration-300
                "
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {/* =================================================
              QUESTION
          ================================================= */}

          <div
            className="
              mb-5
              rounded-[20px]
              border
              border-gray-200/80
              bg-white
              p-6
              shadow-[0_3px_16px_rgba(0,0,0,0.035)]
              sm:p-7
            "
          >
            <div
              className="
                mb-4
                flex
                items-center
                gap-2
              "
            >
              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-lg
                  bg-orange-50
                  text-[10px]
                  font-bold
                  text-[#FF5500]
                "
              >
                {currentQ + 1}
              </span>

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.1em]
                  text-gray-400
                "
              >
                Question
              </span>
            </div>

            <p
              className="
                text-[17px]
                font-semibold
                leading-[1.55]
                tracking-[-0.01em]
                text-[#30313D]
                sm:text-[18px]
              "
            >
              {question.question}
            </p>
          </div>

          {/* =================================================
              OPTIONS
          ================================================= */}

          <div className="mb-5 space-y-2.5">
            {question.options.map(
              (option, index) => {
                const isCorrect =
                  index === question.correct;

                const isSelected =
                  index === selected;

                let containerStyle =
                  "border-gray-200 bg-white hover:border-orange-200 hover:bg-orange-50/20";

                if (answered) {
                  if (isCorrect) {
                    containerStyle =
                      "border-green-200 bg-green-50/70";
                  } else if (isSelected) {
                    containerStyle =
                      "border-red-200 bg-red-50/70";
                  } else {
                    containerStyle =
                      "border-gray-200 bg-gray-50 opacity-55";
                  }
                }

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      handleSelect(index)
                    }
                    disabled={answered}
                    className={`
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-[15px]
                      border
                      px-4
                      py-3.5
                      text-left
                      transition-all
                      duration-200

                      ${containerStyle}
                    `}
                  >
                    {/* LETTER */}

                    <span
                      className={`
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        text-[11px]
                        font-bold

                        ${
                          answered &&
                          isCorrect
                            ? "bg-green-500 text-white"
                            : answered &&
                              isSelected
                            ? "bg-red-500 text-white"
                            : "bg-gray-100 text-gray-500"
                        }
                      `}
                    >
                      {String.fromCharCode(
                        65 + index
                      )}
                    </span>

                    {/* TEXT */}

                    <span
                      className="
                        min-w-0
                        flex-1
                        text-[13px]
                        leading-relaxed
                        text-gray-700
                      "
                    >
                      {option}
                    </span>

                    {/* RESULT ICON */}

                    {answered &&
                      isCorrect && (
                        <Check
                          className="
                            h-4
                            w-4
                            shrink-0
                            text-green-600
                          "
                        />
                      )}

                    {answered &&
                      isSelected &&
                      !isCorrect && (
                        <X
                          className="
                            h-4
                            w-4
                            shrink-0
                            text-red-500
                          "
                        />
                      )}
                  </button>
                );
              }
            )}
          </div>

          {/* =================================================
              HINT
          ================================================= */}

          {!answered && (
            <div className="mb-5">
              <button
                type="button"
                onClick={() =>
                  setShowHint(!showHint)
                }
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-amber-100
                  bg-amber-50
                  px-3.5
                  py-2.5
                  text-[11px]
                  font-medium
                  text-amber-700
                  transition-colors
                  hover:bg-amber-100
                "
              >
                <Lightbulb className="h-3.5 w-3.5" />

                {showHint
                  ? question.hint
                  : "Show Hint"}
              </button>
            </div>
          )}

          {/* =================================================
              EXPLANATION
          ================================================= */}

          {showExplanation && (
            <div
              className="
                mb-5
                rounded-[16px]
                border
                border-orange-100
                bg-orange-50/40
                p-4
              "
            >
              <div
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                "
              >
                <Sparkles
                  className="
                    h-3.5
                    w-3.5
                    text-[#FF5500]
                  "
                />

                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.1em]
                    text-[#D94A00]
                  "
                >
                  Explanation
                </p>
              </div>

              <p
                className="
                  text-[12px]
                  leading-[1.75]
                  text-gray-600
                "
              >
                {question.explanation}
              </p>
            </div>
          )}

          {/* =================================================
              NEXT
          ================================================= */}

          {answered && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={nextQuestion}
                className="
                  flex
                  h-10
                  items-center
                  gap-2
                  rounded-xl
                  bg-[#FF5500]
                  px-5
                  text-[11px]
                  font-semibold
                  text-white
                  shadow-[0_3px_10px_rgba(255,85,0,0.15)]
                  transition-all
                  hover:bg-[#E64D00]
                "
              >
                {currentQ <
                sampleQuiz.length - 1
                  ? "Next Question"
                  : "See Results"}

                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizzesView;