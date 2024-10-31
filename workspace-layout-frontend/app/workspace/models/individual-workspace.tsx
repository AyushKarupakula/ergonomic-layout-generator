"use client";
import { useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export const IndividualWorkspace = () => {
  const deskRef = useRef();

  // ... rest of the code remains the same
};

export const individualConfig = {
  title: "Individual Workspace",
  description: "A personalized workspace optimized for your specific needs and preferences",
  highlights: [
    {
      title: "Workspace Setup",
      items: [
        "Standing desk capability",
        "Ergonomic monitor placement",
        "Premium task chair",
        "Integrated storage solutions"
      ]
    },
    {
      title: "Physical Comfort",
      items: [
        "Ergonomic accessories",
        "Anti-fatigue solutions",
        "Adjustable equipment",
        "Health-focused design"
      ]
    },
    {
      title: "Technology",
      items: [
        "Multiple power points",
        "High-speed connectivity",
        "Video conferencing ready",
        "Cable management"
      ]
    }
  ],
  dimensions: {
    width: "3.0m",
    length: "2.4m",
    height: "2.7m"
  },
  specs: {
    workstation: {
      desk: "Height-adjustable standing desk",
      chair: "Ergonomic task chair",
      monitors: "Dual 27\" setup"
    },
    ergonomics: {
      keyboard: "Split ergonomic design",
      mouse: "Vertical grip support",
      lighting: "Adjustable task lighting"
    },
    environment: {
      lighting: "Natural + task lighting",
      acoustics: "Sound dampening",
      climate: "Temperature controlled"
    }
  }
}; 