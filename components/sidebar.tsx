"use client";

import React, { useState } from "react";
import {
  Plus,
  ImageIcon,
  Palette,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useGradient } from "@/contexts/GradientContext";
import { ScrollArea } from "@/components/ui/scroll-area";

const gradients = [
  "bg-gradient-to-r from-red-500 to-yellow-500",
  "bg-gradient-to-r from-green-400 to-blue-500",
  "bg-gradient-to-r from-purple-500 to-pink-500",
  "bg-gradient-to-r from-yellow-400 to-orange-500",
  "bg-gradient-to-r from-blue-500 to-indigo-500",
  "bg-gradient-to-r from-indigo-500 to-purple-500",
  "bg-gradient-to-r from-pink-500 to-red-500",
  "bg-gradient-to-r from-teal-400 to-blue-500",
  "bg-gradient-to-r from-orange-500 to-red-500",
  "bg-gradient-to-r from-green-500 to-teal-500",
  "bg-gradient-to-b from-[#1380FF] to-[#50B1FE]",
];

const fontFamilies = ["Arial", "Times New Roman", "Helvetica", "Verdana"];
const fontSizes = [
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "30px",
  "32px",
  "40px",
];

export function AppSidebar() {
  const {
    selectedGradient,
    setSelectedGradient,
    addTextElement,
    textElements,
    updateTextElement,
    addImageElement,
    imageElements,
    updateImageElement,
    selectedText,
    selectedImage,
  } = useGradient();

  const [text, setText] = useState("");
  const [customStartColor, setCustomStartColor] = useState("#000000");
  const [customEndColor, setCustomEndColor] = useState("#000000");
  const [solidColor, setSolidColor] = useState("#000000");
  const [textAlignment, setTextAlignment] = useState<
    "left" | "center" | "right"
  >("left");

  const handleAddText = () => {
    if (text.trim()) {
      addTextElement(text);
      setText("");
    }
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        addImageElement(file);
        e.target.value = "";
      } else {
        alert("Please select an image file");
      }
    }
  };

  const handleFontSizeChange = (size: string) => {
    if (selectedText) {
      updateTextElement(selectedText, { fontSize: size });
    }
  };

  const handleFontFamilyChange = (font: string) => {
    if (selectedText) {
      updateTextElement(selectedText, { fontFamily: font });
    }
  };

  const handleTextColorChange = (color: string) => {
    if (selectedText) {
      updateTextElement(selectedText, { color });
    }
  };

  const handleBorderRadiusChange = (value: number[]) => {
    if (selectedImage) {
      updateImageElement(selectedImage, { borderRadius: value[0] });
    }
  };

  const handleSizeChange = (dimension: "height" | "width", value: number[]) => {
    if (selectedImage) {
      updateImageElement(selectedImage, { [dimension]: value[0] });
    }
  };

  const handleCustomGradient = () => {
    const customGradient = `bg-gradient-to-b from-[${customStartColor}] to-[${customEndColor}]`;
    setSelectedGradient(customGradient);
  };

  const handleSolidColor = () => {
    setSelectedGradient(solidColor);
  };

  const handleSolidColorChange = (value: string) => {
    setSolidColor(value);
  };

  const handleTextStyleChange = (
    style: "bold" | "italic" | "underline",
    value: boolean
  ) => {
    if (selectedText) {
      updateTextElement(selectedText, { [style]: value });
    }
  };

  const selectedTextElement = selectedText
    ? textElements.find((el) => el.id === selectedText)
    : null;

  const selectedImageElement = selectedImage
    ? imageElements.find((img) => img.id === selectedImage)
    : null;

  return (
    <aside className="w-80 border-r h-screen overflow-hidden bg-background top-0 sticky">
      <ScrollArea className="h-full pt-4">
        <div className="p-6 space-y-6">
          <div className="space-y-4 border-b pb-6">
            <div className="space-y-4 border-b pb-6">
              <div>
                <Label htmlFor="add-text">AddText</Label>
                <div className="flex mt-1.5">
                  <Input
                    id="add-text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text"
                  />
                  <Button onClick={handleAddText} size="icon" className="ml-2">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {selectedText && selectedTextElement && (
                <div className="space-y-4">
                  <div>
                    <Label>Font Family</Label>
                    <Select
                      onValueChange={handleFontFamilyChange}
                      value={selectedTextElement.fontFamily}
                    >
                      <SelectTrigger className="w-full mt-1.5">
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        {fontFamilies.map((font) => (
                          <SelectItem key={font} value={font}>
                            {font}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Font Size</Label>
                    <Select
                      onValueChange={handleFontSizeChange}
                      value={selectedTextElement.fontSize}
                    >
                      <SelectTrigger className="w-full mt-1.5">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        {fontSizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Text Color</Label>
                    <div className="flex mt-1.5 items-center gap-2">
                      <Input
                        type="color"
                        value={selectedTextElement.color}
                        onChange={(e) => handleTextColorChange(e.target.value)}
                        className="w-12 h-8 p-0 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={selectedTextElement.color}
                        onChange={(e) => handleTextColorChange(e.target.value)}
                        placeholder="#000000"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Text Style</Label>
                    <div className="flex gap-2 mt-1.5">
                      <Button
                        size="icon"
                        variant={
                          selectedTextElement.bold ? "default" : "outline"
                        }
                        onClick={() =>
                          handleTextStyleChange(
                            "bold",
                            !selectedTextElement.bold
                          )
                        }
                      >
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant={
                          selectedTextElement.italic ? "default" : "outline"
                        }
                        onClick={() =>
                          handleTextStyleChange(
                            "italic",
                            !selectedTextElement.italic
                          )
                        }
                      >
                        <Italic className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant={
                          selectedTextElement.underline ? "default" : "outline"
                        }
                        onClick={() =>
                          handleTextStyleChange(
                            "underline",
                            !selectedTextElement.underline
                          )
                        }
                      >
                        <Underline className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <Label>Solid Background Color</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  type="color"
                  value={solidColor}
                  onChange={(e) => handleSolidColorChange(e.target.value)}
                  className="w-12 h-8 p-0 cursor-pointer"
                />
                <Input
                  type="text"
                  value={solidColor}
                  onChange={(e) => handleSolidColorChange(e.target.value)}
                  placeholder="Color (#hex)"
                  className="flex-1"
                />
                <Button onClick={handleSolidColor} size="icon">
                  <Palette className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label>Gradient Background</Label>
              <div className="grid grid-cols-5 gap-2 mt-1.5">
                {gradients.map((gradient) => (
                  <div
                    key={gradient}
                    className={`h-8 rounded-md cursor-pointer ${gradient} ${
                      selectedGradient === gradient ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedGradient(gradient)}
                  />
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <Label>Custom Gradient</Label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      type="color"
                      value={customStartColor}
                      onChange={(e) => setCustomStartColor(e.target.value)}
                      className="w-12 h-8 p-0 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={customStartColor}
                      onChange={(e) => setCustomStartColor(e.target.value)}
                      placeholder="Start color (#hex)"
                      className="mt-1"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      type="color"
                      value={customEndColor}
                      onChange={(e) => setCustomEndColor(e.target.value)}
                      className="w-12 h-8 p-0 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={customEndColor}
                      onChange={(e) => setCustomEndColor(e.target.value)}
                      placeholder="End color (#hex)"
                      className="mt-1"
                    />
                  </div>
                </div>
                <Button onClick={handleCustomGradient} className="w-full mt-2">
                  Apply Custom Gradient
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Add Image</Label>
              <div className="flex mt-1.5">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleAddImage}
                  className="hidden"
                  id="image-upload"
                />
                <Button
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                  className="w-full"
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Choose Image
                </Button>
              </div>
            </div>

            {selectedImage && selectedImageElement && (
              <div className="space-y-4">
                <div>
                  <Label>Border Radius</Label>
                  <Slider
                    value={[selectedImageElement.borderRadius]}
                    max={50}
                    step={1}
                    className="mt-2"
                    onValueChange={handleBorderRadiusChange}
                  />
                </div>

                <div>
                  <Label>Image Height (px)</Label>
                  <Slider
                    value={[selectedImageElement.height]}
                    min={50}
                    max={500}
                    step={10}
                    className="mt-2"
                    onValueChange={(value) => handleSizeChange("height", value)}
                  />
                </div>

                <div>
                  <Label>Image Width (px)</Label>
                  <Slider
                    value={[selectedImageElement.width]}
                    min={50}
                    max={500}
                    step={10}
                    className="mt-2"
                    onValueChange={(value) => handleSizeChange("width", value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <footer className="p-4 border-t">
          <div className="text-sm text-muted-foreground">
            Customize your design
          </div>
        </footer>
      </ScrollArea>
    </aside>
  );
}
