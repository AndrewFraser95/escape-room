import { useState } from "react";
import { DigitalLock } from "./DigitalLock";
import { ImagePuzzle } from "./ImagePuzzle";
import { AnagramPuzzle } from "./AnagramPuzzle";
import basementBg from "@/assets/basement-bg.jpg";

export const EscapeRoom = () => {
  const [lockUnlocked, setLockUnlocked] = useState(false);
  const [imageUnlocked, setImageUnlocked] = useState(false);
  const [anagramUnlocked, setAnagramUnlocked] = useState(false);

  const emojiMap = {
    "0": "🍅",
    "1": "🍍",
    "2": "🍑",
    "3": "🍊",
    "4": "🥥",
    "5": "🍇",
    "6": "🥝",
    "7": "🍌",
    "8": "🫒",
    "9": "🍉",
  };

  // FIX ME
  const encodedCode = "🍇 🥝 🍉 🍊"; // Emoji-encoded default

  function decodeCode(encoded: string) {
    const reverseEmojiMap = Object.fromEntries(
      Object.entries(emojiMap).map(([key, value]) => [value, key])
    );

    return encoded
      .split(" ")
      .map((emoji) => reverseEmojiMap[emoji] || "")
      .join("");
  }

  const lighthouseCode = decodeCode(encodedCode);

  const progress = [lockUnlocked, imageUnlocked, anagramUnlocked].filter(
    Boolean
  ).length;
  const totalPuzzles = 3;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${basementBg})` }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-warm-light mb-4 shadow-deep">
            BASEMENT ESCAPE ROOM
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Solve the puzzles to escape from the cellar
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto bg-concrete-dark rounded-full p-1 shadow-deep">
            <div
              className="h-3 bg-gradient-to-r from-primary to-success rounded-full transition-all duration-500 shadow-glow-warm"
              style={{ width: `${(progress / totalPuzzles) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Progress: {progress}/{totalPuzzles} puzzles solved
          </p>
        </div>

        {/* Puzzles Grid */}
        <div className="grid gap-8 max-w-4xl mx-auto">
          {/* Puzzle 1: Digital Lock */}
          <div className="puzzle-container">
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-warm-light">PUZZLE 1</h3>
              <p className="text-sm text-muted-foreground">Security System</p>
            </div>
            <DigitalLock
              correctCode={lighthouseCode}
              onUnlock={() => setLockUnlocked(true)}
              isUnlocked={lockUnlocked}
            />
          </div>

          {/* Puzzle 2: Image Metadata */}
          <div className="puzzle-container">
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-warm-light">PUZZLE 2</h3>
              <p className="text-sm text-muted-foreground">Digital Forensics</p>
            </div>
            <ImagePuzzle
              onSolve={() => setImageUnlocked(true)}
              isUnlocked={imageUnlocked}
              isAvailable={lockUnlocked}
            />
          </div>

          {/* Puzzle 3: Anagram */}
          <div className="puzzle-container">
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-warm-light">PUZZLE 3</h3>
              <p className="text-sm text-muted-foreground">Word Cipher</p>
            </div>
            <AnagramPuzzle
              onSolve={() => setAnagramUnlocked(true)}
              isUnlocked={anagramUnlocked}
              isAvailable={lockUnlocked && imageUnlocked}
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>💡 Hints are available if you're stuck on any puzzle</p>
          <p className="mt-2">🔒 Each puzzle must be completed in order</p>
        </div>
      </div>

      {/* Atmospheric Effects */}
      <div className="absolute top-1/4 left-8 w-4 h-4 bg-primary/80 rounded-full shadow-glow-warm animate-pulse"></div>
      <div className="absolute top-1/3 right-12 w-2 h-2 bg-cool-light/60 rounded-full shadow-glow-cool animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-warning/50 rounded-full shadow-glow-warm animate-pulse delay-2000"></div>
    </div>
  );
};
