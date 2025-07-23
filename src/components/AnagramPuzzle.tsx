import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface AnagramPuzzleProps {
  onSolve: () => void;
  isUnlocked: boolean;
  isAvailable: boolean;
}

export const AnagramPuzzle = ({
  onSolve,
  isUnlocked,
  isAvailable,
}: AnagramPuzzleProps) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const { toast } = useToast();

  const anagram = "chorused TV wire";
  const solution = "Curve is the word";
  const finalCode = "1337root";

  const handleSubmit = () => {
    const normalizedAnswer = userAnswer.toLowerCase().replace(/[^a-z]/g, "");
    const normalizedSolution = solution.toLowerCase().replace(/[^a-z]/g, "");

    if (normalizedAnswer === normalizedSolution) {
      onSolve();
      toast({
        title: "Anagram Solved!",
        description: `Correct! Your victory code is: ${finalCode}`,
      });
    } else {
      setAttempts((prev) => prev + 1);
      toast({
        title: "Incorrect",
        description: "That's not the right answer. Keep trying!",
        variant: "destructive",
      });

      if (attempts >= 2) {
        setShowHint(true);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  if (!isAvailable) {
    return (
      <Card className="p-8 bg-gradient-concrete border-muted/30 shadow-deep opacity-50">
        <div className="text-center">
          <div className="text-2xl font-bold text-muted-foreground mb-4">
            🔒 ANAGRAM PUZZLE
          </div>
          <p className="text-muted-foreground">
            Complete the previous puzzles first
          </p>
        </div>
      </Card>
    );
  }

  if (isUnlocked) {
    return (
      <Card className="p-8 bg-gradient-concrete border-success/50 shadow-glow-cool">
        <div className="text-center">
          <div className="text-4xl font-bold text-success mb-4">
            🎉 ESCAPE COMPLETE!
          </div>
          <p className="text-success mb-4">"{solution}"</p>
          <div className="bg-metal/20 border border-success/50 rounded p-4 mt-4">
            <h3 className="font-bold text-success mb-2">VICTORY CODE:</h3>
            <p className="text-2xl font-mono text-warm-light font-bold tracking-wider">
              {finalCode}
            </p>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Congratulations! You've escaped the basement. Present this code to
            claim your victory!
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-gradient-concrete border-rust/50 shadow-deep">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-warm-light mb-2">
          FINAL ANAGRAM
        </h2>
        <p className="text-muted-foreground">
          Unscramble these words to find the phrase
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-metal/20 border border-metal/50 rounded p-6 text-center">
          <div className="text-3xl font-mono text-cool-light font-bold tracking-wider mb-2">
            "{anagram}"
          </div>
          <p className="text-sm text-muted-foreground">
            Rearrange these letters into a phrase
          </p>
        </div>

        {showHint && (
          <div className="bg-warning/10 border border-warning/30 rounded p-4">
            <h3 className="font-bold text-warning mb-2">💡 Hint:</h3>
            <p className="text-sm text-foreground">
              Think about mathematical concepts and geometric shapes. The phrase
              describes something about a specific type of line.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <Input
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter the unscrambled phrase..."
            className="bg-metal border-rust/30 text-warm-light placeholder-muted-foreground text-center"
          />

          <Button
            onClick={handleSubmit}
            disabled={!userAnswer.trim()}
            className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold shadow-glow-warm"
          >
            SUBMIT SOLUTION
          </Button>
        </div>

        {attempts > 0 && (
          <div className="text-center text-destructive">
            Attempts: {attempts}
            {attempts >= 2 &&
              !showHint &&
              " (Hint will appear after 3 attempts)"}
          </div>
        )}

        <div className="text-xs text-center text-muted-foreground">
          Hint: KPMG Peter Griffin
        </div>
      </div>
    </Card>
  );
};
