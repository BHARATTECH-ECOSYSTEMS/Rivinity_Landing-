"use client";

import { useState } from "react";
import {
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
  X,
  Shuffle,
  Layers,
} from "lucide-react";

interface Flashcard {
  id: number;
  front: string;
  back: string;
  difficulty: "easy" | "medium" | "hard";
  mastered: boolean;
}

const sampleCards: Flashcard[] = [
  {
    id: 1,
    front: "What is the powerhouse of the cell?",
    back: "The mitochondria. It generates most of the cell's ATP through oxidative phosphorylation.",
    difficulty: "easy",
    mastered: false,
  },
  {
    id: 2,
    front: "Define Newton's Second Law",
    back: "F = ma (Force equals mass times acceleration). The net force on an object is equal to its mass multiplied by its acceleration.",
    difficulty: "medium",
    mastered: false,
  },
  {
    id: 3,
    front: "What is the Pythagorean theorem?",
    back: "a² + b² = c², where c is the hypotenuse of a right triangle and a, b are the other sides.",
    difficulty: "easy",
    mastered: true,
  },
  {
    id: 4,
    front: "Explain the concept of Supply and Demand",
    back: "When supply exceeds demand, prices fall. When demand exceeds supply, prices rise. Equilibrium is where supply equals demand.",
    difficulty: "hard",
    mastered: false,
  },
  {
    id: 5,
    front: "What causes seasons on Earth?",
    back: "Earth's axial tilt of 23.5° causes different parts of the planet to receive varying amounts of direct sunlight throughout the year.",
    difficulty: "medium",
    mastered: false,
  },
];

const FlashcardsView = () => {
  const [cards] = useState<Flashcard[]>(sampleCards);
  const [currentIndex, setCurrentIndex] =
    useState(0);
  const [flipped, setFlipped] =
    useState(false);
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] =
    useState(false);
  const [masteredCards, setMasteredCards] =
    useState<number[]>(
      sampleCards
        .filter((card) => card.mastered)
        .map((card) => card.id)
    );

  const currentCard = cards[currentIndex];

  const progress =
    ((currentIndex + 1) / cards.length) * 100;

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const next = () => {
    setFlipped(false);

    setTimeout(() => {
      setCurrentIndex((index) =>
        Math.min(index + 1, cards.length - 1)
      );
    }, 120);
  };

  const prev = () => {
    setFlipped(false);

    setTimeout(() => {
      setCurrentIndex((index) =>
        Math.max(index - 1, 0)
      );
    }, 120);
  };

  /* =========================================================
     MASTER CARD
  ========================================================= */

  const markKnown = () => {
    setMasteredCards((previous) =>
      previous.includes(currentCard.id)
        ? previous
        : [...previous, currentCard.id]
    );

    next();
  };

  /* =========================================================
     SHUFFLE
  ========================================================= */

  const shuffleCards = () => {
    const randomIndex = Math.floor(
      Math.random() * cards.length
    );

    setFlipped(false);
    setCurrentIndex(randomIndex);
  };

  /* =========================================================
     GENERATE
  ========================================================= */

  const generateCards = () => {
    if (!topic.trim() || generating) return;

    setGenerating(true);

    setTimeout(() => {
      setGenerating(false);
      setTopic("");
    }, 1500);
  };

  const masteredCount =
    masteredCards.length;

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
            <Layers
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
              Flashcards
            </h1>

            <p
              className="
                text-[11px]
                text-gray-400
              "
            >
              Spaced repetition for better retention
            </p>
          </div>
        </div>

        {/* HEADER STATS */}

        <div
          className="
            hidden
            items-center
            gap-3
            sm:flex
          "
        >
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
            <span className="text-[10px] text-gray-400">
              Mastered
            </span>

            <span
              className="
                ml-1.5
                text-[11px]
                font-semibold
                text-[#FF5500]
              "
            >
              {masteredCount}/{cards.length}
            </span>
          </div>

          <button
            type="button"
            onClick={shuffleCards}
            className="
              flex
              h-8
              items-center
              gap-1.5
              rounded-xl
              border
              border-gray-200
              bg-white
              px-3
              text-[11px]
              font-medium
              text-gray-600
              shadow-sm
              transition-all
              hover:border-gray-300
              hover:text-gray-900
            "
          >
            <Shuffle className="h-3.5 w-3.5" />
            Shuffle
          </button>
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
          py-5
          sm:px-6
          sm:py-6
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[780px]
          "
        >
          {/* =================================================
              PROGRESS HEADER
          ================================================= */}

          <div
            className="
              mb-5
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                h-1.5
                flex-1
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

            <span
              className="
                shrink-0
                text-[11px]
                font-medium
                text-gray-400
              "
            >
              {currentIndex + 1}/{cards.length}
            </span>
          </div>

          {/* =================================================
              CARD HEADER
          ================================================= */}

          <div
            className="
              mb-3
              flex
              items-center
              justify-between
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.1em]
                  text-gray-400
                "
              >
                Flashcard {currentIndex + 1}
              </p>

              <p
                className="
                  mt-1
                  text-[11px]
                  text-gray-400
                "
              >
                Click the card to reveal the answer
              </p>
            </div>

            {/* DIFFICULTY */}

            <span
              className={`
                rounded-full
                px-2.5
                py-1
                text-[10px]
                font-semibold

                ${
                  currentCard.difficulty ===
                  "easy"
                    ? "bg-green-50 text-green-600"
                    : currentCard.difficulty ===
                      "medium"
                    ? "bg-amber-50 text-amber-600"
                    : "bg-red-50 text-red-500"
                }
              `}
            >
              {currentCard.difficulty}
            </span>
          </div>

          {/* =================================================
              FLASHCARD
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              setFlipped(!flipped)
            }
            className="
              group
              relative
              flex
              min-h-[320px]
              w-full
              cursor-pointer
              flex-col
              items-center
              justify-center
              overflow-hidden
              rounded-[24px]
              border
              border-gray-200/80
              bg-white
              p-8
              text-center
              shadow-[0_4px_20px_rgba(0,0,0,0.045)]
              transition-all
              duration-200
              hover:border-orange-100
              hover:shadow-[0_8px_28px_rgba(0,0,0,0.06)]
              sm:min-h-[350px]
              sm:p-12
            "
          >
            {/* SMALL ORANGE ACCENT */}

            <div
              className="
                absolute
                left-1/2
                top-0
                h-1
                w-20
                -translate-x-1/2
                rounded-b-full
                bg-[#FF5500]
              "
            />

            {/* CARD ICON */}

            <div
              className={`
                mb-5
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl

                ${
                  flipped
                    ? "bg-orange-50"
                    : "bg-gray-50"
                }
              `}
            >
              {flipped ? (
                <Sparkles
                  className="
                    h-5
                    w-5
                    text-[#FF5500]
                  "
                />
              ) : (
                <Layers
                  className="
                    h-5
                    w-5
                    text-gray-400
                  "
                />
              )}
            </div>

            {/* LABEL */}

            <p
              className="
                mb-4
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-gray-400
              "
            >
              {flipped
                ? "Answer"
                : "Question"}
            </p>

            {/* CONTENT */}

            <p
              className="
                max-w-[570px]
                text-[18px]
                font-semibold
                leading-[1.55]
                tracking-[-0.01em]
                text-[#30313D]
                sm:text-[20px]
              "
            >
              {flipped
                ? currentCard.back
                : currentCard.front}
            </p>

            {/* HINT */}

            <p
              className="
                absolute
                bottom-6
                text-[10px]
                text-gray-400
                transition-colors
                group-hover:text-[#FF5500]
              "
            >
              {flipped
                ? "Click to see question"
                : "Click to reveal answer"}
            </p>
          </button>

          {/* =================================================
              CARD CONTROLS
          ================================================= */}

          <div
            className="
              mt-5
              flex
              items-center
              justify-center
              gap-2
              sm:gap-3
            "
          >
            {/* PREVIOUS */}

            <button
              type="button"
              onClick={prev}
              disabled={currentIndex === 0}
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-gray-200
                bg-white
                text-gray-500
                shadow-sm
                transition-all
                hover:border-gray-300
                hover:text-gray-900
                disabled:cursor-default
                disabled:opacity-30
              "
              title="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* DIDN'T KNOW */}

            <button
              type="button"
              onClick={next}
              className="
                flex
                h-10
                items-center
                gap-1.5
                rounded-xl
                border
                border-red-100
                bg-red-50
                px-3
                text-[11px]
                font-medium
                text-red-500
                transition-all
                hover:bg-red-100
                sm:px-4
              "
            >
              <X className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                Didn't know
              </span>
            </button>

            {/* FLIP */}

            <button
              type="button"
              onClick={() =>
                setFlipped(!flipped)
              }
              className="
                flex
                h-10
                items-center
                gap-1.5
                rounded-xl
                border
                border-gray-200
                bg-white
                px-3
                text-[11px]
                font-medium
                text-gray-600
                shadow-sm
                transition-all
                hover:border-gray-300
                hover:text-gray-900
                sm:px-4
              "
            >
              <RotateCcw className="h-3.5 w-3.5" />

              <span className="hidden sm:inline">
                Flip
              </span>
            </button>

            {/* GOT IT */}

            <button
              type="button"
              onClick={markKnown}
              className="
                flex
                h-10
                items-center
                gap-1.5
                rounded-xl
                bg-[#FF5500]
                px-3
                text-[11px]
                font-semibold
                text-white
                shadow-[0_3px_10px_rgba(255,85,0,0.16)]
                transition-all
                hover:bg-[#E64D00]
                sm:px-4
              "
            >
              <Check className="h-3.5 w-3.5" />

              <span className="hidden sm:inline">
                Got it!
              </span>
            </button>

            {/* NEXT */}

            <button
              type="button"
              onClick={next}
              disabled={
                currentIndex === cards.length - 1
              }
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-gray-200
                bg-white
                text-gray-500
                shadow-sm
                transition-all
                hover:border-gray-300
                hover:text-gray-900
                disabled:cursor-default
                disabled:opacity-30
              "
              title="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* =================================================
              GENERATE FLASHCARDS
          ================================================= */}

          <div
            className="
              mt-8
              rounded-[20px]
              border
              border-gray-200/80
              bg-white
              p-4
              shadow-[0_2px_12px_rgba(0,0,0,0.035)]
              sm:p-5
            "
          >
            <div
              className="
                mb-3
                flex
                items-center
                gap-2
              "
            >
              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-xl
                  bg-orange-50
                "
              >
                <Sparkles
                  className="
                    h-4
                    w-4
                    text-[#FF5500]
                  "
                />
              </div>

              <div>
                <p
                  className="
                    text-[12px]
                    font-semibold
                    text-[#30313D]
                  "
                >
                  Generate Flashcards
                </p>

                <p
                  className="
                    text-[10px]
                    text-gray-400
                  "
                >
                  Create a new study deck from any topic
                </p>
              </div>
            </div>

            <div
              className="
                flex
                flex-col
                gap-2
                sm:flex-row
              "
            >
              <input
                value={topic}
                onChange={(e) =>
                  setTopic(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    generateCards();
                  }
                }}
                placeholder="Enter topic (e.g., Organic Chemistry)"
                className="
                  h-10
                  min-w-0
                  flex-1
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50/60
                  px-3.5
                  text-[11px]
                  text-gray-700
                  outline-none
                  placeholder:text-gray-400
                  focus:border-orange-200
                  focus:bg-white
                "
              />

              <button
                type="button"
                onClick={generateCards}
                disabled={generating}
                className="
                  flex
                  h-10
                  shrink-0
                  items-center
                  justify-center
                  gap-1.5
                  rounded-xl
                  bg-[#FF5500]
                  px-5
                  text-[11px]
                  font-semibold
                  text-white
                  shadow-[0_3px_10px_rgba(255,85,0,0.15)]
                  transition-all
                  hover:bg-[#E64D00]
                  disabled:cursor-default
                  disabled:opacity-60
                "
              >
                <Sparkles className="h-3.5 w-3.5" />

                {generating
                  ? "Creating..."
                  : "Generate"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsView;