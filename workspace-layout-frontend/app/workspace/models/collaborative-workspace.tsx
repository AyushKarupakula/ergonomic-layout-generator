"use client";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";

export const CollaborativeWorkspace = () => {
  return (
    <group position={[0, 0, 0]} scale={1.5}>
      {/* Implementation of collaborative workspace */}
      <group>
        {/* Multiple Desks */}
        {[-1.2, 1.2].map((x) => (
          <mesh key={x} position={[x, 0.4, 0]}>
            <boxGeometry args={[1.6, 0.05, 0.8]} />
            <meshStandardMaterial color="#4a5568" />
          </mesh>
        ))}
        {/* Meeting Table */}
        <mesh position={[0, 0.4, -1.5]}>
          <cylinderGeometry args={[1, 1, 0.05, 32]} />
          <meshStandardMaterial color="#2d3748" />
        </mesh>
        {/* Chairs */}
        {[-1.2, 0, 1.2].map((x) => (
          <mesh key={`chair-${x}`} position={[x, 0.3, -1.5]}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="#2d3748" />
          </mesh>
        ))}
      </group>
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