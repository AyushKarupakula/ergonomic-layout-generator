"use client";
import { useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { Group } from "three";

export const IndividualWorkspace = () => {
  const deskRef = useRef<Group>(null);

  // Define desk leg positions with proper typing
  const deskLegPositions: [number, number, number][] = [
    [-0.7, -0.35, 0.35],
    [0.7, -0.35, 0.35],
    [-0.7, -0.35, -0.35],
    [0.7, -0.35, -0.35]
  ];

  return (
    <group position={[0, 0, 0]} scale={1.5}>
      {/* Room Structure */}
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshPhysicalMaterial 
          color="#1a1a1a"
          roughness={0.1}
          metalness={0.8}
          reflectivity={0.7}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Walls */}
      <group position={[0, 1.5, -4]}>
        <mesh receiveShadow>
          <boxGeometry args={[8, 3, 0.1]} />
          <meshStandardMaterial color="#f5f5f5" />
        </mesh>
        {/* Window */}
        <mesh position={[0, 0.2, 0.1]}>
          <boxGeometry args={[3, 2, 0.1]} />
          <meshPhysicalMaterial 
            color="#88ccff"
            transparent
            opacity={0.3}
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
          />
        </mesh>
      </group>

      {/* Side Walls */}
      <mesh position={[-4, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[8, 3, 0.1]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      <mesh position={[4, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[8, 3, 0.1]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>

      {/* Desk Setup */}
      <group ref={deskRef} position={[0, 0.73, 0]}>
        {/* Desk Surface */}
        <RoundedBox args={[1.6, 0.05, 0.8]} radius={0.02} smoothness={4} castShadow>
          <meshPhysicalMaterial 
            color="#8B4513"
            metalness={0.3}
            roughness={0.4}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
          />
        </RoundedBox>

        {/* Desk Legs */}
        {deskLegPositions.map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.7]} />
            <meshPhysicalMaterial color="#303030" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}

        {/* Cable Management */}
        <mesh position={[0, -0.2, -0.35]} castShadow>
          <boxGeometry args={[1.2, 0.1, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>

      {/* Monitors */}
      {[-0.3, 0.3].map((x, i) => (
        <group key={i} position={[x, 1.2, -0.2]}>
          {/* Monitor Frame */}
          <RoundedBox args={[0.55, 0.35, 0.02]} radius={0.01} smoothness={4} castShadow>
            <meshPhysicalMaterial color="#303030" metalness={0.9} roughness={0.1} />
          </RoundedBox>
          {/* Screen */}
          <mesh position={[0, 0, 0.011]}>
            <planeGeometry args={[0.52, 0.32]} />
            <meshBasicMaterial 
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.2}
            />
          </mesh>
          {/* Stand */}
          <mesh position={[0, -0.25, 0.1]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.3]} />
            <meshPhysicalMaterial color="#303030" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* Chair */}
      <group position={[0, 0.5, 0.5]}>
        {/* Seat */}
        <RoundedBox args={[0.5, 0.1, 0.5]} radius={0.05} smoothness={4} castShadow>
          <meshPhysicalMaterial color="#404040" roughness={0.3} metalness={0.7} />
        </RoundedBox>
        {/* Backrest */}
        <group position={[0, 0.3, -0.2]} rotation={[0.2, 0, 0]}>
          <RoundedBox args={[0.45, 0.5, 0.05]} radius={0.05} smoothness={4} castShadow>
            <meshPhysicalMaterial 
              color="#404040"
              roughness={0.5}
              metalness={0.2}
              transparent
              opacity={0.9}
            />
          </RoundedBox>
        </group>
      </group>

      {/* Keyboard & Mouse */}
      <group position={[0, 0.76, 0.1]}>
        <RoundedBox args={[0.45, 0.02, 0.15]} radius={0.01} smoothness={4} castShadow>
          <meshStandardMaterial color="#252525" />
        </RoundedBox>
        <RoundedBox position={[0.3, 0, 0]} args={[0.08, 0.02, 0.12]} radius={0.01} smoothness={4} castShadow>
          <meshStandardMaterial color="#252525" />
        </RoundedBox>
      </group>
    </group>
  );
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