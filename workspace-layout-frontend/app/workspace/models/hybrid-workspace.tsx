"use client";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export const HybridWorkspace = () => {
  const spotLight = useRef();
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
      color: '#8B4513',
      metalness: 0.3,
      roughness: 0.4,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      transparent: true,
      opacity: 0.2,
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
    accent: new THREE.MeshPhysicalMaterial({
      color: '#4a90e2',
      metalness: 0.5,
      roughness: 0.3,
      clearcoat: 1
    })
  };

  return (
    <group position={[0, 0, 0]} scale={1.5}>
      {/* Room Structure */}
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshPhysicalMaterial {...materials.floor} />
      </mesh>

      {/* Walls */}
      <group position={[0, 1.5, -7.5]}>
        <mesh receiveShadow>
          <boxGeometry args={[15, 3, 0.1]} />
          <meshStandardMaterial {...materials.wall} />
        </mesh>
        {/* Windows */}
        {[-3, 0, 3].map((x) => (
          <mesh key={x} position={[x, 0.2, 0.1]}>
            <boxGeometry args={[2, 2, 0.1]} />
            <meshPhysicalMaterial {...materials.window} />
          </mesh>
        ))}
      </group>

      {/* Side Walls */}
      <mesh position={[-7.5, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[15, 3, 0.1]} />
        <meshStandardMaterial {...materials.wall} />
      </mesh>
      <mesh position={[7.5, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[15, 3, 0.1]} />
        <meshStandardMaterial {...materials.wall} />
      </mesh>

      {/* Hot Desking Area */}
      {[[-3, 0], [0, 0], [3, 0]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          {/* Adjustable Desk */}
          <RoundedBox args={[1.6, 0.05, 0.8]} radius={0.02} smoothness={4} position={[0, 0.73, 0]} castShadow>
            <meshPhysicalMaterial {...materials.desk} />
          </RoundedBox>
          
          {/* Monitor */}
          <group position={[0, 1.2, -0.3]}>
            <RoundedBox args={[0.55, 0.35, 0.02]} radius={0.01} smoothness={4} castShadow>
              <meshPhysicalMaterial {...materials.screen} />
            </RoundedBox>
            <mesh position={[0, -0.25, 0.1]} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 0.3]} />
              <meshPhysicalMaterial color="#303030" />
            </mesh>
          </group>

          {/* Task Chair */}
          <group position={[0, 0.5, 0.5]}>
            <RoundedBox args={[0.5, 0.1, 0.5]} radius={0.05} smoothness={4} castShadow>
              <meshPhysicalMaterial {...materials.chair} />
            </RoundedBox>
            <group position={[0, 0.3, -0.2]} rotation={[0.2, 0, 0]}>
              <RoundedBox args={[0.45, 0.5, 0.05]} radius={0.05} smoothness={4} castShadow>
                <meshPhysicalMaterial {...materials.chair} />
              </RoundedBox>
            </group>
          </group>
        </group>
      ))}

      {/* Private Focus Pods */}
      {[-5, 5].map((x) => (
        <group key={x} position={[x, 0, -3]}>
          {/* Pod Structure */}
          <RoundedBox args={[2, 2.4, 2]} radius={0.1} smoothness={4} position={[0, 1.2, 0]}>
            <meshPhysicalMaterial {...materials.glass} />
          </RoundedBox>
          
          {/* Desk */}
          <RoundedBox args={[1.4, 0.05, 0.7]} radius={0.02} smoothness={4} position={[0, 0.73, 0]} castShadow>
            <meshPhysicalMaterial {...materials.desk} />
          </RoundedBox>
          
          {/* Chair */}
          <group position={[0, 0.5, 0.5]}>
            <RoundedBox args={[0.5, 0.1, 0.5]} radius={0.05} smoothness={4} castShadow>
              <meshPhysicalMaterial {...materials.chair} />
            </RoundedBox>
          </group>
        </group>
      ))}

      {/* Collaboration Zone */}
      <group position={[0, 0, -5]}>
        {/* Meeting Table */}
        <RoundedBox args={[2.5, 0.05, 1.2]} radius={0.02} smoothness={4} position={[0, 0.73, 0]} castShadow>
          <meshPhysicalMaterial {...materials.desk} />
        </RoundedBox>

        {/* Chairs */}
        {[[-0.8, 0.5], [0, 0.5], [0.8, 0.5], [-0.8, -0.5], [0, -0.5], [0.8, -0.5]].map(([x, z], i) => (
          <group key={i} position={[x, 0.5, z - 5]}>
            <RoundedBox args={[0.5, 0.1, 0.5]} radius={0.05} smoothness={4} castShadow>
              <meshPhysicalMaterial {...materials.chair} />
            </RoundedBox>
          </group>
        ))}

        {/* Display Screen */}
        <group position={[0, 1.5, -6]}>
          <RoundedBox args={[2, 1.2, 0.1]} radius={0.02} smoothness={4} castShadow>
            <meshPhysicalMaterial {...materials.screen} />
          </RoundedBox>
        </group>
      </group>

      {/* Phone Booths */}
      {[-6, 6].map((x) => (
        <group key={x} position={[x, 0, -5.5]}>
          {/* Booth Structure */}
          <RoundedBox args={[1.2, 2.2, 1.2]} radius={0.1} smoothness={4} position={[0, 1.1, 0]}>
            <meshPhysicalMaterial {...materials.glass} />
          </RoundedBox>
          
          {/* Small Desk */}
          <RoundedBox args={[0.8, 0.05, 0.5]} radius={0.02} smoothness={4} position={[0, 1, 0]} castShadow>
            <meshPhysicalMaterial {...materials.desk} />
          </RoundedBox>
          
          {/* Stool */}
          <mesh position={[0, 0.6, 0.3]} castShadow>
            <cylinderGeometry args={[0.2, 0.2, 0.1]} />
            <meshPhysicalMaterial {...materials.chair} />
          </mesh>
        </group>
      ))}

      {/* Breakout Area */}
      <group position={[0, 0, -7]}>
        {/* Soft Seating */}
        {[-1.2, 0, 1.2].map((x) => (
          <RoundedBox key={x} args={[1, 0.5, 1]} radius={0.1} smoothness={4} position={[x, 0.25, 0]} castShadow>
            <meshPhysicalMaterial {...materials.accent} />
          </RoundedBox>
        ))}
        
        {/* Coffee Tables */}
        {[-0.6, 0.6].map((x) => (
          <RoundedBox key={x} args={[0.6, 0.4, 0.6]} radius={0.05} smoothness={4} position={[x, 0.2, -1]} castShadow>
            <meshPhysicalMaterial {...materials.desk} />
          </RoundedBox>
        ))}
      </group>
    </group>
  );
};

export const hybridConfig = {
  title: "Hybrid Workspace",
  description: "A flexible environment that supports various work styles and activities",
  highlights: [
    {
      title: "Work Zones",
      items: [
        "Hot desking area",
        "Private focus pods",
        "Collaboration space",
        "Phone booths"
      ]
    },
    {
      title: "Flexibility",
      items: [
        "Multiple seating options",
        "Bookable spaces",
        "Adaptable furniture",
        "Activity-based zones"
      ]
    },
    {
      title: "Technology",
      items: [
        "Wireless connectivity",
        "Digital booking system",
        "AV equipment",
        "Smart environmental controls"
      ]
    }
  ],
  dimensions: {
    width: "12.0m",
    length: "15.0m",
    height: "3.0m"
  },
  specs: {
    workstations: {
      hotDesks: "6-8 adjustable stations",
      focusPods: "4 private booths",
      phoneBooths: "2 soundproof units"
    },
    collaboration: {
      meetingArea: "8-person capacity",
      display: "85-inch interactive screen",
      breakout: "Casual seating for 6-8"
    },
    environment: {
      zoning: "Activity-based layout",
      acoustics: "Mixed treatment zones",
      lighting: "Zone-specific control"
    }
  }
}; 