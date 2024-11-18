"use client";

import React, { createContext, useContext, useState } from "react";

interface Position {
  x: number;
  y: number;
  zIndex?: number;
  textAlign?: string;
}

interface TextElement {
  id: string;
  text: string;
  fontSize: string;
  fontFamily: string;
  color: string;
  position: Position;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  zIndex: number;
}

interface ImageElement {
  id: string;
  url: string;
  borderRadius: number;
  height: number;
  width: number;
  position: Position;
}

interface GradientContextType {
  selectedGradient: string;
  setSelectedGradient: (gradient: string) => void;
  textElements: TextElement[];
  setTextElements: any;
  setImageElements: any;
  addTextElement: (text: string) => void;
  updateTextElement: (id: string, updates: Partial<TextElement>) => void;
  deleteElement: (idToDelete: string, type: "text" | "image") => void;
  selectedText: string | null;
  setSelectedText: (id: string | null) => void;
  imageElements: ImageElement[];
  addImageElement: (file: File) => void;
  updateImageElement: (id: string, updates: Partial<ImageElement>) => void;
  selectedImage: string | null;
  setSelectedImage: (id: string | null) => void;
  updateElementPosition: (
    id: string,
    position: Position,
    type: "text" | "image"
  ) => void;
  deleteElementFromContext: (
    idToDelete: string,
    type: "text" | "image"
  ) => void;
}

const GradientContext = createContext<GradientContextType | undefined>(
  undefined
);

export function GradientProvider({ children }: { children: React.ReactNode }) {
  const [selectedGradient, setSelectedGradient] = useState<string>(
    "bg-gradient-to-r from-purple-500 to-pink-500"
  );
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [newTextElement, setNewTextElement] = useState<string>("");
  const [imageElements, setImageElements] = useState<ImageElement[]>([]);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addTextElement = (text: string) => {
    const newElement: TextElement = {
      id: generateId(),
      text,
      fontSize: "14px",
      fontFamily: "Arial",
      color: "#000000",
      position: { x: 50, y: 50, zIndex: 100 },
      bold: false,
      italic: false,
      underline: false,
      zIndex: 10,
    };
    setTextElements([...textElements, newElement]);
    setNewTextElement("");
  };

  const updateTextElement = (id: string, updates: Partial<TextElement>) => {
    setTextElements(
      textElements.map((element) =>
        element.id === id ? { ...element, ...updates } : element
      )
    );
  };

  const deleteElement = (idToDelete: string, type: "text" | "image") => {
    if (type === "text") {
      setTextElements(textElements.filter((el) => el.id !== idToDelete));
    } else if (type === "image") {
      setImageElements(imageElements.filter((el) => el.id !== idToDelete));
    }
  };

  const addImageElement = (file: File) => {
    const newImage: ImageElement = {
      id: generateId(),
      url: URL.createObjectURL(file),
      borderRadius: 0,
      height: 200,
      width: 200,
      position: { x: 50, y: 50, zIndex: 10 },
    };
    setImageElements([...imageElements, newImage]);
  };

  const updateImageElement = (id: string, updates: Partial<ImageElement>) => {
    setImageElements(
      imageElements.map((element) =>
        element.id === id ? { ...element, ...updates } : element
      )
    );
  };

  const updateElementPosition = (
    id: string,
    position: Position,
    type: "text" | "image"
  ) => {
    if (type === "text") {
      setTextElements(
        textElements.map((element) =>
          element.id === id ? { ...element, position } : element
        )
      );
    } else {
      setImageElements(
        imageElements.map((element) =>
          element.id === id ? { ...element, position } : element
        )
      );
    }
  };

  const deleteElementFromContext = (
    idToDelete: string,
    type: "text" | "image"
  ) => {
    if (type === "text") {
      setTextElements(textElements.filter((el) => el.id !== idToDelete));
    } else if (type === "image") {
      setImageElements(imageElements.filter((el) => el.id !== idToDelete));
    }
  };

  return (
    <GradientContext.Provider
      value={{
        selectedGradient,
        setSelectedGradient,
        textElements,
        addTextElement,
        updateTextElement,
        deleteElement,
        selectedText,
        setSelectedText,
        imageElements,
        addImageElement,
        updateImageElement,
        selectedImage,
        setSelectedImage,
        updateElementPosition,
        deleteElementFromContext,
        setTextElements,
        setImageElements,
      }}
    >
      {children}
    </GradientContext.Provider>
  );
}

export function useGradient() {
  const context = useContext(GradientContext);
  if (context === undefined) {
    throw new Error("useGradient must be used within a GradientProvider");
  }
  return context;
}
