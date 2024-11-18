"use client";

import React, { useRef, useState } from "react";
import {
  Volume2,
  Power,
  Download,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import { Button } from "@/components/ui/button";
import { useGradient } from "@/contexts/GradientContext";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
const SCREENSHOT_SIZES = [
  { width: 1290, height: 2796, name: '6.7"' }, // iPhone 14 Pro Max
  { width: 1179, height: 2556, name: '6.1"' }, // iPhone 14 Pro
  { width: 1170, height: 2532, name: '6.1"' }, // iPhone 14
  { width: 750, height: 1334, name: '4.7"' }, // iPhone SE (3rd Gen)
];
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

export default function Component() {
  const {
    selectedGradient,
    textElements,
    imageElements,
    selectedText,
    setSelectedText,
    selectedImage,
    setSelectedImage,
    updateElementPosition,
    deleteElementFromContext,
    updateTextElement,
  } = useGradient();

  const phoneContentRef = useRef<HTMLDivElement>(null);
  const phoneMockupContentRef = useRef<HTMLDivElement>(null);
  const [usePhoneMockup, setusePhoneMockup] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);
  const [textAlignment, setTextAlignment] = useState<
    "left" | "center" | "right"
  >("left");
  const [zIndex, setZIndex] = useState<number>(1);

  const handlePositionSelect = (
    position: string,
    elementId: string,
    type: "text" | "image"
  ) => {
    const newPosition = POSITIONS[position as keyof typeof POSITIONS];
    updateElementPosition(elementId, newPosition, type);
  };

  const captureScreenshots = async () => {
    if (!phoneContentRef.current || isCapturing) return;
    setIsCapturing(true);

    try {
      const zip = new JSZip();

      const containerRef = usePhoneMockup
        ? phoneMockupContentRef
        : phoneContentRef;
      if (!containerRef.current) return;

      // Configure canvas to include transparency
      const canvas = await html2canvas(containerRef.current, {
        backgroundColor: null, // Ensures the background is transparent
      });
      const baseImage = canvas.toDataURL("image/png");

      for (const size of SCREENSHOT_SIZES) {
        const img = new Image();
        img.src = baseImage;
        await new Promise((resolve) => (img.onload = resolve));

        const resizedCanvas = document.createElement("canvas");
        resizedCanvas.width = size.width;
        resizedCanvas.height = size.height;
        const ctx = resizedCanvas.getContext("2d");
        if (!ctx) continue;

        // Ensures transparency for resized canvases
        ctx.clearRect(0, 0, size.width, size.height);
        ctx.drawImage(img, 0, 0, size.width, size.height);

        const resizedImage = resizedCanvas.toDataURL("image/png");
        zip.file(
          `screenshot_${size.name}.png`,
          resizedImage.split("base64,")[1],
          { base64: true }
        );
      }

      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = "screenshots.zip";
      link.click();
    } catch (error) {
      console.error("Error capturing screenshots:", error);
      alert("Error creating screenshots. Please try again.");
    } finally {
      setIsCapturing(false);
    }
  };

  const handleSliderChange = (axis: "x" | "y" | "z", value: number[]) => {
    const selectedId = selectedText || selectedImage;
    const type = selectedText ? "text" : "image";

    if (selectedId) {
      const currentElement =
        type === "text"
          ? textElements.find((el) => el.id === selectedId)
          : imageElements.find((el) => el.id === selectedId);

      if (currentElement) {
        if (axis === "z") {
          setZIndex(value[0]);
          const newPosition = {
            ...currentElement.position,
            zIndex: value[0],
          };
          updateElementPosition(selectedId, newPosition, type);
        } else {
          const newPosition = {
            ...currentElement.position,
            x: axis === "x" ? value[0] : currentElement.position.x,
            y: axis === "y" ? value[0] : currentElement.position.y,
          };
          updateElementPosition(selectedId, newPosition, type);
        }
      }
    }
  };

  function deleteElement(idToDelete: string, type: "text" | "image") {
    deleteElementFromContext(idToDelete, type);
  }

  const handleTextAlignmentChange = (
    alignment: "left" | "center" | "right"
  ) => {
    setTextAlignment(alignment);
    if (selectedText) {
      const currentElement = textElements.find((el) => el.id === selectedText);
      if (currentElement) {
        const updatedPosition = {
          ...currentElement.position,
          textAlign: alignment,
        };
        updateElementPosition(selectedText, updatedPosition, "text");
      }
    }
  };

  const handleTextEdit = (newText: string) => {
    if (selectedText) {
      const currentElement = textElements.find((el) => el.id === selectedText);
      if (currentElement) {
        updateTextElement(selectedText, { text: newText });
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 min-h-screen mx-auto w-full bg-gray-100 pt-10">
      {/* Top section with phone and controls */}
      <div className="flex items-start justify-center gap-8">
        {/* Phone */}
        <div
          ref={phoneMockupContentRef}
          className={`relative w-[300px] h-[600px] ${
            usePhoneMockup ? " bg-black shadow-xl rounded-[55px]" : ""
          } overflow-hidden`}
        >
          {/* Grid overlay */}
          {(selectedText || selectedImage) && (
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            ></div>
          )}

          {/* Content */}
          <div
            ref={phoneContentRef}
            className={`absolute inset-3 ${
              usePhoneMockup ? "rounded-[48px]" : "rounded-2xl"
            } overflow-hidden ${
              !selectedGradient.startsWith("#") ? selectedGradient : ""
            }`}
            style={{
              backgroundColor: selectedGradient.startsWith("#")
                ? selectedGradient
                : "transparent",
            }}
          >
            {/* Notch */}
            {usePhoneMockup && (
              <div
                style={{ zIndex: 100 }}
                className="absolute  top-2 left-1/2 transform -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-full z-10"
              ></div>
            )}

            {/* Text elements */}
            {textElements.map((element) => (
              <p
                key={element.id}
                onClick={() => {
                  setSelectedImage(null);
                  setSelectedText(
                    selectedText === element.id ? null : element.id
                  );
                }}
                className="tracking-tight"
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  left: `${element.position.x}px`,
                  top: `${element.position.y}px`,
                  fontSize: element.fontSize,
                  fontFamily: element.fontFamily,
                  color: element.color,
                  fontWeight: element.bold ? "bold" : "normal",
                  fontStyle: element.italic ? "italic" : "normal",
                  textDecoration: element.underline ? "underline" : "none",
                  border:
                    selectedText === element.id ? "2px dashed #0000FF" : "none",
                  textAlign: textAlignment,
                  zIndex: element.position.zIndex || 1,
                }}
              >
                {element.text}
              </p>
            ))}

            {/* Image elements */}
            {imageElements.map((image) => (
              <div
                key={image.id}
                onClick={() => {
                  setSelectedText(null);
                  setSelectedImage(
                    selectedImage === image.id ? null : image.id
                  );
                }}
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  left: `${image.position.x}px`,
                  top: `${image.position.y}px`,

                  width: image.width,
                  height: image.height,
                  border:
                    selectedImage === image.id ? "2px dashed #0000FF" : "none",
                  zIndex: image.position.zIndex || 1,
                }}
              >
                <img
                  src={image.url}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    pointerEvents: "none",
                    borderRadius: `${image.borderRadius}px`,
                  }}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        {(selectedText || selectedImage) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: selectedText || selectedImage ? 1 : 0,
              y: selectedText || selectedImage ? 0 : -20,
            }}
            transition={{ duration: 0.5 }}
            className="w-[300px] mt-10 p-4 ml-20 bg-white rounded-lg shadow-md space-y-6"
          >
            <h3 className="font-semibold">
              Position Controls ({selectedText ? "Text" : "Image"})
            </h3>
            {selectedText && (
              <div className="space-y-2">
                <Label>Edit Text</Label>
                <div className="flex gap-2">
                  <Input
                    defaultValue={
                      textElements.find((el) => el.id === selectedText)?.text
                    }
                    onChange={(e) => handleTextEdit(e.target.value)}
                    placeholder="Edit text"
                  />
                </div>
              </div>
            )}
            {/* Text Alignment Buttons */}
            {selectedText && (
              <div className="flex gap-2">
                <Button
                  variant={textAlignment === "left" ? "default" : "outline"}
                  onClick={() => handleTextAlignmentChange("left")}
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant={textAlignment === "center" ? "default" : "outline"}
                  onClick={() => handleTextAlignmentChange("center")}
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                  variant={textAlignment === "right" ? "default" : "outline"}
                  onClick={() => handleTextAlignmentChange("right")}
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Delete Button */}
            <Button
              onClick={() => {
                const idToDelete = selectedText || selectedImage;
                if (idToDelete) {
                  deleteElement(idToDelete, selectedText ? "text" : "image");
                  setSelectedText(null);
                  setSelectedImage(null);
                }
              }}
              variant="outline"
            >
              Delete Element
            </Button>

            {/* Bring to Front Button */}
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  const selectedId = selectedText || selectedImage;
                  const type = selectedText ? "text" : "image";
                  if (selectedId) {
                    const currentElement =
                      type === "text"
                        ? textElements.find((el) => el.id === selectedId)
                        : imageElements.find((el) => el.id === selectedId);

                    if (currentElement) {
                      const newPosition = {
                        ...currentElement.position,
                        zIndex: 10, // Set to maximum z-index
                      };
                      updateElementPosition(selectedId, newPosition, type);
                    }
                  }
                }}
                variant="outline"
              >
                Bring to Front
              </Button>
              <Button
                onClick={() => {
                  const selectedId = selectedText || selectedImage;
                  const type = selectedText ? "text" : "image";
                  if (selectedId) {
                    const currentElement =
                      type === "text"
                        ? textElements.find((el) => el.id === selectedId)
                        : imageElements.find((el) => el.id === selectedId);

                    if (currentElement) {
                      const newPosition = {
                        ...currentElement.position,
                        zIndex: 1, // Set to minimum z-index
                      };
                      updateElementPosition(selectedId, newPosition, type);
                    }
                  }
                }}
                variant="outline"
              >
                Send to Back
              </Button>
            </div>

            {/* Position Buttons */}
            <div className="grid grid-cols-2 gap-2">
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
                >
                  {position.replace("-", " ")}
                </Button>
              ))}
            </div>

            {/* Sliders */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span>X:</span>
                <Slider
                  defaultValue={[0]}
                  min={-100}
                  max={260}
                  step={1}
                  onValueChange={(value) => handleSliderChange("x", value)}
                />
              </div>
              <div className="flex items-center gap-4">
                <span>Y:</span>
                <Slider
                  defaultValue={[0]}
                  min={-100}
                  max={560}
                  step={1}
                  onValueChange={(value) => handleSliderChange("y", value)}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Download Button */}
      <div className="flex justify-center space-x-5 items-center">
        <Button
          onClick={captureScreenshots}
          disabled={isCapturing}
          variant="default"
        >
          {isCapturing ? "Processing..." : "Download Screenshots"}
        </Button>
        <div className="flex items-center space-x-2">
          <Switch
            className=""
            checked={usePhoneMockup}
            onCheckedChange={() => setusePhoneMockup(!usePhoneMockup)}
          />
          <p className="text-xs text-gray-400">(incl phone mockup)</p>
        </div>
      </div>
    </div>
  );
}
