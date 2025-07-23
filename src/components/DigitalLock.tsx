import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface DigitalLockProps {
  correctCode: string;
  onUnlock: () => void;
  isUnlocked: boolean;
}

export const DigitalLock = ({
  correctCode,
  onUnlock,
  isUnlocked,
}: DigitalLockProps) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [attempts, setAttempts] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value) || value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = () => {
    const enteredCode = code.join("");
    if (enteredCode === correctCode) {
      onUnlock();
    } else {
      setAttempts((prev) => prev + 1);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setCode(["", "", "", ""]);
      document.getElementById("digit-0")?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`digit-${index - 1}`);
      prevInput?.focus();
    }
  };

  if (isUnlocked) {
    return (
      <Card className="p-8 bg-gradient-concrete border-success/50 shadow-glow-cool">
        <div className="text-center">
          <div className="text-4xl font-bold text-success mb-4">✓ UNLOCKED</div>
          <p className="text-success">Lighthouse scores accepted!</p>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={`p-8 bg-gradient-concrete border-rust/50 shadow-deep transition-all duration-300 ${
        isShaking ? "animate-pulse" : ""
      }`}
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-warm-light mb-2">
          DIGITAL LOCK
        </h2>
        <p className="text-muted-foreground">Enter the 4-digit code</p>
      </div>

      <div className="flex justify-center gap-3 mb-6">
        {code.map((digit, index) => (
          <input
            key={index}
            id={`digit-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleDigitChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, index)}
            className="w-12 h-16 text-center text-2xl font-mono bg-metal border-2 border-rust/30 
                     rounded focus:border-primary focus:shadow-glow-warm transition-all
                     text-warm-light placeholder-muted-foreground"
            maxLength={1}
            placeholder="0"
          />
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <Button
          onClick={handleSubmit}
          disabled={code.some((d) => !d)}
          className="bg-primary hover:bg-primary/80 text-primary-foreground font-bold px-8 shadow-glow-warm"
        >
          UNLOCK
        </Button>
        <Button
          onClick={() => setCode(["", "", "", ""])}
          variant="outline"
          className="border-rust text-rust hover:bg-rust/10"
        >
          CLEAR
        </Button>
      </div>

      {attempts > 0 && (
        <div className="text-center mt-4 text-destructive">
          Incorrect code. Attempts: {attempts}
        </div>
      )}

      <div className="mt-6 text-xs text-center text-muted-foreground">
        Hint: If you want to Perform, you need to be on the lookout
      </div>
    </Card>
  );
};
