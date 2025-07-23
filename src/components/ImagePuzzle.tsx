import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface ImagePuzzleProps {
  onSolve: () => void;
  isUnlocked: boolean;
  isAvailable: boolean;
}

export const ImagePuzzle = ({
  onSolve,
  isUnlocked,
  isAvailable,
}: ImagePuzzleProps) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extractedLocation, setExtractedLocation] = useState<string>("");
  const [userAnswer, setUserAnswer] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUploadedImage(result);

      // Simulate metadata extraction - in a real scenario, you'd use EXIF.js or similar
      // For the puzzle, we'll check if the filename contains 'pupil' or if it's a specific test image
      const fileName = file.name.toLowerCase();
      if (
        fileName.includes("pupil") ||
        fileName.includes("eye") ||
        fileName.includes("student")
      ) {
        setExtractedLocation("EyeOfTheStorm");
        toast({
          title: "Metadata Extracted",
          description: "Location data found in image!",
        });
      } else {
        // For demo purposes, let's say any image has the location after a delay
        setTimeout(() => {
          setExtractedLocation("This doesn't look like the right image");
          toast({
            title: "Metadata Extracted",
            description: "That's not quite right",
          });
        }, 2000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (userAnswer.trim() === "EyeOfTheStorm") {
      onSolve();
      toast({
        title: "Puzzle Solved!",
        description: "Correct! The eye's pupil was the key.",
      });
    } else {
      toast({
        title: "Incorrect",
        description:
          "That's not the right answer. Check the image metadata again.",
        variant: "destructive",
      });
    }
  };

  if (!isAvailable) {
    return (
      <Card className="p-8 bg-gradient-concrete border-muted/30 shadow-deep opacity-50">
        <div className="text-center">
          <div className="text-2xl font-bold text-muted-foreground mb-4">
            🔒 IMAGE PUZZLE
          </div>
          <p className="text-muted-foreground">
            Complete the digital lock first
          </p>
        </div>
      </Card>
    );
  }

  if (isUnlocked) {
    return (
      <Card className="p-8 bg-gradient-concrete border-success/50 shadow-glow-cool">
        <div className="text-center">
          <div className="text-4xl font-bold text-success mb-4">✓ SOLVED</div>
          <p className="text-success">
            Image metadata revealed: "EyeOfTheStorm"
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-gradient-concrete border-rust/50 shadow-deep">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-warm-light mb-2">
          FORENSICS PUZZLE
        </h2>
        <p className="text-muted-foreground">
          Upload an image and review if eye would approve
        </p>
      </div>

      <div className="space-y-6">
        <div className="border-2 border-dashed border-rust/30 rounded-lg p-8 text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          {uploadedImage ? (
            <div className="space-y-4">
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="max-w-full max-h-64 mx-auto rounded border-2 border-metal"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="border-rust text-rust hover:bg-rust/10"
              >
                Upload Different Image
              </Button>
            </div>
          ) : (
            <div style={{ textAlign: "-webkit-center" }}>
              <div className="text-4xl mb-4">
                <img
                  src="placeholder.webp"
                  style={{ width: "40px", textAlign: "center" }}
                ></img>
              </div>
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-primary hover:bg-primary/80 text-primary-foreground shadow-glow-warm"
              >
                Upload Image
              </Button>
            </div>
          )}
        </div>

        {extractedLocation && (
          <div className="bg-metal/20 border border-metal/50 rounded p-4">
            <h3 className="font-bold text-warm-light mb-2">
              Extracted Metadata:
            </h3>
            <p className="text-cool-light font-mono">
              Message: {extractedLocation}
            </p>
          </div>
        )}

        {extractedLocation && (
          <div className="space-y-4">
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter the 5-character word from the metadata"
              className="bg-metal border-rust/30 text-warm-light placeholder-muted-foreground"
              maxLength={13}
            />

            <Button
              onClick={handleSubmit}
              disabled={userAnswer.length !== 13}
              className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold shadow-glow-warm"
            >
              SUBMIT ANSWER
            </Button>
          </div>
        )}

        <div className="text-xs text-center text-muted-foreground">
          Hint: What info could this image contain?
        </div>
      </div>
    </Card>
  );
};
