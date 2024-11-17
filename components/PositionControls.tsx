import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const POSITIONS = {
  "top-left": { x: 20, y: 60 },
  "top-center": { x: 120, y: 60 },
  "top-right": { x: 220, y: 60 },
  "middle-left": { x: 20, y: 280 },
  "middle-center": { x: 120, y: 280 },
  "middle-right": { x: 220, y: 280 },
  "bottom-left": { x: 20, y: 500 },
  "bottom-center": { x: 120, y: 500 },
  "bottom-right": { x: 220, y: 500 },
};

interface PositionControlsProps {
  selectedText: string | null;
  selectedImage: string | null;
  handlePositionSelect: (
    position: string,
    elementId: string,
    type: "text" | "image"
  ) => void;
  handleSliderChange: (axis: "x" | "y", value: number[]) => void;
}

export function PositionControls({
  selectedText,
  selectedImage,
  handlePositionSelect,
  handleSliderChange,
}: PositionControlsProps) {
  if (!selectedText && !selectedImage) return null;

  return (
    <div className="flex flex-col gap-6 w-[300px] p-4 bg-white rounded-lg shadow-md">
      <h3 className="font-semibold">Position Controls</h3>

      <div className="grid grid-cols-3 gap-2">
        {Object.keys(POSITIONS).map((position) => (
          <Button
            key={position}
            onClick={() =>
              handlePositionSelect(
                position,
                selectedText || selectedImage!,
                selectedText ? "text" : "image"
              )
            }
            variant="outline"
            className="p-2"
          >
            {position.replace("-", " ")}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="min-w-8">X:</span>
          <Slider
            defaultValue={[0]}
            max={260}
            step={1}
            onValueChange={(value) => handleSliderChange("x", value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="min-w-8">Y:</span>
          <Slider
            defaultValue={[0]}
            max={560}
            step={1}
            onValueChange={(value) => handleSliderChange("y", value)}
          />
        </div>
      </div>
    </div>
  );
}
