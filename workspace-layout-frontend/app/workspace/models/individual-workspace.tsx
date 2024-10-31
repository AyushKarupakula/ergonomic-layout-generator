"use client";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export const IndividualWorkspace = () => {
  const spotLight = useRef();
  const deskRef = useRef();
  const [hovered, setHovered] = useState<string | null>(null);

  // Enhanced materials with more realistic properties
  const materials = {
    floor: new THREE.MeshPhysicalMaterial({ 
      color: '#2a2a2a',
      roughness: 0.1,
      metalness: 0.8,
      reflectivity: 0.7,
      clearcoat: 1,
      clearcoatRoughness: 0.1
    }),
    wall: new THREE.MeshStandardMaterial({ 
      color: '#e0e0e0',
      roughness: 0.9,
      metalness: 0.1 
    }),
    window: new THREE.MeshPhysicalMaterial({
      color: '#a8c5ff',
      transparent: true,
      opacity: 0.3,
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1
    }),
    desk: new THREE.MeshPhysicalMaterial({
      color: '#8B4513', // Wood color
      metalness: 0.3,
      roughness: 0.4,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2
    }),
    deskFrame: new THREE.MeshPhysicalMaterial({
      color: '#303030',
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1
    }),
    monitor: new THREE.MeshPhysicalMaterial({
      color: '#303030',
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1
    }),
    screen: new THREE.MeshBasicMaterial({
      color: '#ffffff',
      opacity: 0.95,
      transparent: true,
      emissive: '#ffffff',
      emissiveIntensity: 0.2
    }),
    chair: new THREE.MeshPhysicalMaterial({
      color: '#404040',
      roughness: 0.3,
      metalness: 0.7,
      clearcoat: 0.5
    }),
    chairMesh: new THREE.MeshPhysicalMaterial({
      color: '#505050',
      roughness: 0.5,
      metalness: 0.2,
      transparent: true,
      opacity: 0.9
    })
  };

  return (
    <group position={[0, 0, 0]} scale={1.5}> {/* Increased overall scale */}
      {/* Room Structure */}
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshPhysicalMaterial {...materials.floor} />
      </mesh>

      {/* Walls */}
      {/* Back Wall with Window */}
      <group position={[0, 1.5, -4]}>
        <mesh receiveShadow>
          <boxGeometry args={[8, 3, 0.1]} />
          <meshStandardMaterial {...materials.wall} />
        </mesh>
        {/* Window */}
        <mesh position={[0, 0.2, 0.1]}>
          <boxGeometry args={[3, 2, 0.1]} />
          <meshPhysicalMaterial {...materials.window} />
        </mesh>
      </group>

      {/* Side Walls */}
      <mesh position={[-4, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[8, 3, 0.1]} />
        <meshStandardMaterial {...materials.wall} />
      </mesh>
      <mesh position={[4, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[8, 3, 0.1]} />
        <meshStandardMaterial {...materials.wall} />
      </mesh>

      {/* Enhanced Desk Setup */}
      <group ref={deskRef} position={[0, 0.73, 1]}>
        {/* Desk Surface with Beveled Edges */}
        <RoundedBox args={[2, 0.05, 1]} radius={0.02} smoothness={4} castShadow receiveShadow>
          <meshPhysicalMaterial {...materials.desk} />
        </RoundedBox>

        {/* Desk Frame */}
        <group position={[0, -0.35, 0]}>
          {/* Legs with cable management */}
          {[[-0.9, 0, 0.45], [0.9, 0, 0.45], [-0.9, 0, -0.45], [0.9, 0, -0.45]].map((pos, i) => (
            <group key={i} position={pos}>
              <mesh castShadow>
                <cylinderGeometry args={[0.03, 0.03, 0.7]} />
                <meshPhysicalMaterial {...materials.deskFrame} />
              </mesh>
              {/* Leg connectors */}
              <mesh position={[0, -0.35, 0]} castShadow>
                <boxGeometry args={[0.1, 0.02, 0.1]} />
                <meshPhysicalMaterial {...materials.deskFrame} />
              </mesh>
            </group>
          ))}
          {/* Cross supports */}
          <mesh position={[0, -0.3, 0]} castShadow>
            <boxGeometry args={[1.8, 0.05, 0.05]} />
            <meshPhysicalMaterial {...materials.deskFrame} />
          </mesh>
        </group>

        {/* Cable Management Tray */}
        <mesh position={[0, -0.1, -0.45]} castShadow>
          <boxGeometry args={[1.5, 0.1, 0.15]} />
          <meshStandardMaterial color="#202020" />
        </mesh>
      </group>

      {/* Enhanced Monitor Setup */}
      {[-0.4, 0.4].map((x, i) => (
        <group key={i} position={[x, 1.3, 0.6]}>
          {/* Monitor Frame */}
          <RoundedBox args={[0.65, 0.4, 0.02]} radius={0.01} smoothness={4} castShadow>
            <meshPhysicalMaterial {...materials.monitor} />
          </RoundedBox>
          {/* Screen */}
          <mesh position={[0, 0, 0.011]}>
            <planeGeometry args={[0.62, 0.37]} />
            <meshBasicMaterial {...materials.screen} />
          </mesh>
          {/* Monitor Arm */}
          <group position={[0, -0.3, 0.1]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.02, 0.02, 0.4]} />
              <meshPhysicalMaterial {...materials.deskFrame} />
            </mesh>
            {/* Base */}
            <mesh position={[0, -0.2, 0.05]} castShadow>
              <cylinderGeometry args={[0.1, 0.1, 0.02]} />
              <meshPhysicalMaterial {...materials.deskFrame} />
            </mesh>
          </group>
        </group>
      ))}

      {/* Enhanced Ergonomic Chair */}
      <group position={[0, 0.6, 1.5]}>
        {/* Seat */}
        <RoundedBox args={[0.6, 0.1, 0.6]} radius={0.05} smoothness={4} castShadow>
          <meshPhysicalMaterial {...materials.chair} />
        </RoundedBox>
        {/* Backrest */}
        <group position={[0, 0.4, -0.25]} rotation={[0.2, 0, 0]}>
          <RoundedBox args={[0.55, 0.7, 0.05]} radius={0.05} smoothness={4} castShadow>
            <meshPhysicalMaterial {...materials.chairMesh} />
          </RoundedBox>
          {/* Lumbar Support */}
          <mesh position={[0, -0.15, 0.02]} castShadow>
            <boxGeometry args={[0.5, 0.2, 0.03]} />
            <meshPhysicalMaterial {...materials.chair} />
          </mesh>
        </group>
        {/* Chair Base */}
        <group position={[0, -0.3, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.3, 0.3, 0.05]} />
            <meshPhysicalMaterial {...materials.deskFrame} />
          </mesh>
          {/* Wheels */}
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <group key={i} rotation={[0, (angle * Math.PI) / 180, 0]} position={[0.25, -0.05, 0]}>
              <mesh castShadow>
                <sphereGeometry args={[0.05]} />
                <meshPhysicalMaterial {...materials.deskFrame} />
              </mesh>
            </group>
          ))}
        </group>
      </group>

      {/* Keyboard & Mouse with Enhanced Detail */}
      <group position={[0, 0.76, 0.8]}>
        {/* Keyboard */}
        <RoundedBox args={[0.5, 0.02, 0.2]} radius={0.01} smoothness={4} castShadow>
          <meshPhysicalMaterial color="#252525" metalness={0.8} roughness={0.2} />
        </RoundedBox>
        {/* Mouse */}
        <RoundedBox position={[0.35, 0, 0]} args={[0.08, 0.02, 0.15]} radius={0.01} smoothness={4} castShadow>
          <meshPhysicalMaterial color="#252525" metalness={0.8} roughness={0.2} />
        </RoundedBox>
        {/* Mouse Pad */}
        <mesh position={[0.35, -0.01, 0]} receiveShadow>
          <boxGeometry args={[0.25, 0.01, 0.3]} />
          <meshStandardMaterial color="#151515" roughness={0.8} />
        </mesh>
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