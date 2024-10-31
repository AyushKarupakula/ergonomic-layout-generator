"use client";
import * as THREE from "three";

export const HybridWorkspace = () => {
  return (
    <group position={[0, 0, 0]} scale={1.5}>
      {/* Implementation of hybrid workspace */}
      <group>
        {/* Hot Desks */}
        {[-2, 0, 2].map((x) => (
          <mesh key={x} position={[x, 0.4, 0]}>
            <boxGeometry args={[1.6, 0.05, 0.8]} />
            <meshStandardMaterial color="#4a5568" />
          </mesh>
        ))}
        {/* Collaboration Space */}
        <mesh position={[0, 0.4, -2]}>
          <boxGeometry args={[3, 0.05, 1.5]} />
          <meshStandardMaterial color="#2d3748" />
        </mesh>
        {/* Privacy Booths */}
        {[-2.5, 2.5].map((x) => (
          <group key={`booth-${x}`} position={[x, 0.8, -3]}>
            <mesh>
              <boxGeometry args={[1.2, 1.6, 1.2]} />
              <meshStandardMaterial color="#1a202c" opacity={0.5} transparent />
            </mesh>
          </group>
        ))}
      </group>
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