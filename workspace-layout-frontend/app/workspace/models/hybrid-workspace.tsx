"use client";
import { useRef } from "react";
import { RoundedBox } from "@react-three/drei";

export const HybridWorkspace = () => {
  return (
    <group position={[0, 0, 0]} scale={1.5}>
      // ... rest of the code remains the same
    </group>
  );
};

export const hybridConfig = {
  title: "Hybrid Workspace",
  description: "Flexible space supporting various work modes",
  dimensions: {
    recommended: "9.0m x 6.0m",
    minimum: "6.0m x 4.8m",
    ceiling: "3.0m"
  },
  specs: {
    workstations: {
      hotDesks: "6-8 stations",
      focusPods: "2-3 units",
      phoneBooths: "2 units"
    },
    collaboration: {
      meetingArea: "8-person",
      display: "85-inch screen",
      breakout: "6-8 person"
    },
    environment: {
      lighting: "Multi-zone LED",
      acoustics: "Mixed treatment",
      climate: "Zone control"
    }
  }
}; 