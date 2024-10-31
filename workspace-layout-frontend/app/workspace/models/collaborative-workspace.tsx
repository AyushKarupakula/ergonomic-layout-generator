"use client";
import { useRef } from "react";
import { RoundedBox } from "@react-three/drei";

export const CollaborativeWorkspace = () => {
  return (
    <group position={[0, 0, 0]} scale={1.5}>
      // ... rest of the code remains the same
    </group>
  );
};

export const collaborativeConfig = {
  title: "Collaborative Workspace",
  description: "Designed for team interaction and group work",
  dimensions: {
    recommended: "6.0m x 4.8m (20' x 16')",
    minimum: "4.8m x 3.6m (16' x 12')",
    ceiling: "2.7m (9') minimum"
  },
  specs: {
    workstations: {
      quantity: "4-6 stations",
      spacing: "1.5m minimum",
      arrangement: "Pod configuration"
    },
    meeting: {
      table: "180cm x 120cm",
      seating: "6-8 people",
      clearance: "90cm per person"
    },
    environment: {
      lighting: "Zone-controlled LED",
      acoustics: "Sound dampening",
      climate: "Multi-zone control"
    }
  }
}; 