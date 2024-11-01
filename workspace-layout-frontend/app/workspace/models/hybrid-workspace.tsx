"use client";
import { useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { Group } from "three";

export const HybridWorkspace = () => {
  const deskRef = useRef<Group>(null);

  return (
    <group position={[0, 0, 0]} scale={1.5}>
      {/* Room Structure */}
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <planeGeometry args={[15, 15]} />
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
      <group position={[0, 1.5, -7.5]}>
        <mesh receiveShadow>
          <boxGeometry args={[15, 3, 0.1]} />
          <meshStandardMaterial color="#f5f5f5" />
        </mesh>
        {/* Windows */}
        {[-3, 0, 3].map((x) => (
          <mesh key={x} position={[x, 0.2, 0.1]}>
            <boxGeometry args={[2, 2, 0.1]} />
            <meshPhysicalMaterial 
              color="#88ccff"
              transparent
              opacity={0.3}
              metalness={0.9}
              roughness={0.1}
              clearcoat={1}
            />
          </mesh>
        ))}
      </group>

      {/* Side Walls */}
      <mesh position={[-7.5, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[15, 3, 0.1]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      <mesh position={[7.5, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[15, 3, 0.1]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>

      {/* Hot Desking Area */}
      {[-3, 0, 3].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          {/* Adjustable Desk */}
          <RoundedBox args={[1.6, 0.05, 0.8]} radius={0.02} smoothness={4} position={[0, 0.73, 0]} castShadow>
            <meshPhysicalMaterial 
              color="#8B4513"
              metalness={0.3}
              roughness={0.4}
              clearcoat={0.8}
              clearcoatRoughness={0.2}
            />
          </RoundedBox>
          
          {/* Monitor */}
          <group position={[0, 1.2, -0.3]}>
            <RoundedBox args={[0.55, 0.35, 0.02]} radius={0.01} smoothness={4} castShadow>
              <meshPhysicalMaterial color="#303030" metalness={0.9} roughness={0.1} />
            </RoundedBox>
            <mesh position={[0, 0, 0.011]}>
              <planeGeometry args={[0.52, 0.32]} />
              <meshStandardMaterial 
                color="#ffffff"
                emissive="#ffffff"
                emissiveIntensity={0.2}
                toneMapped={false}
              />
            </mesh>
          </group>

          {/* Chair */}
          <group position={[0, 0.5, 0.5]}>
            <RoundedBox args={[0.5, 0.1, 0.5]} radius={0.05} smoothness={4} castShadow>
              <meshPhysicalMaterial color="#404040" roughness={0.3} metalness={0.7} />
            </RoundedBox>
            <group position={[0, 0.3, -0.2]} rotation={[0.2, 0, 0]}>
              <RoundedBox args={[0.45, 0.5, 0.05]} radius={0.05} smoothness={4} castShadow>
                <meshPhysicalMaterial color="#404040" roughness={0.5} metalness={0.2} />
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
            <meshPhysicalMaterial 
              color="#ffffff"
              transparent
              opacity={0.2}
              metalness={0.9}
              roughness={0.1}
              clearcoat={1}
            />
          </RoundedBox>
          
          {/* Desk */}
          <RoundedBox args={[1.4, 0.05, 0.7]} radius={0.02} smoothness={4} position={[0, 0.73, 0]} castShadow>
            <meshPhysicalMaterial 
              color="#8B4513"
              metalness={0.3}
              roughness={0.4}
              clearcoat={0.8}
              clearcoatRoughness={0.2}
            />
          </RoundedBox>

          {/* Monitor */}
          <group position={[0, 1.2, -0.2]}>
            <RoundedBox args={[0.55, 0.35, 0.02]} radius={0.01} smoothness={4} castShadow>
              <meshPhysicalMaterial color="#303030" metalness={0.9} roughness={0.1} />
            </RoundedBox>
            <mesh position={[0, 0, 0.011]}>
              <planeGeometry args={[0.52, 0.32]} />
              <meshStandardMaterial 
                color="#ffffff"
                emissive="#ffffff"
                emissiveIntensity={0.2}
                toneMapped={false}
              />
            </mesh>
          </group>
          
          {/* Chair */}
          <group position={[0, 0.5, 0.3]}>
            <RoundedBox args={[0.5, 0.1, 0.5]} radius={0.05} smoothness={4} castShadow>
              <meshPhysicalMaterial color="#404040" roughness={0.3} metalness={0.7} />
            </RoundedBox>
            <group position={[0, 0.3, -0.2]} rotation={[0.2, 0, 0]}>
              <RoundedBox args={[0.45, 0.5, 0.05]} radius={0.05} smoothness={4} castShadow>
                <meshPhysicalMaterial color="#404040" roughness={0.5} metalness={0.2} />
              </RoundedBox>
            </group>
          </group>
        </group>
      ))}

      {/* Phone Booths */}
      {[-6, 6].map((x) => (
        <group key={x} position={[x, 0, -5.5]}>
          {/* Booth Structure */}
          <RoundedBox args={[1.2, 2.2, 1.2]} radius={0.1} smoothness={4} position={[0, 1.1, 0]}>
            <meshPhysicalMaterial 
              color="#ffffff"
              transparent
              opacity={0.2}
              metalness={0.9}
              roughness={0.1}
              clearcoat={1}
            />
          </RoundedBox>
          
          {/* Small Desk */}
          <RoundedBox args={[0.8, 0.05, 0.5]} radius={0.02} smoothness={4} position={[0, 1, 0]} castShadow>
            <meshPhysicalMaterial 
              color="#8B4513"
              metalness={0.3}
              roughness={0.4}
              clearcoat={0.8}
              clearcoatRoughness={0.2}
            />
          </RoundedBox>
          
          {/* Stool */}
          <RoundedBox args={[0.4, 0.05, 0.4]} radius={0.02} smoothness={4} position={[0, 0.6, 0.3]} castShadow>
            <meshPhysicalMaterial color="#404040" roughness={0.3} metalness={0.7} />
          </RoundedBox>
        </group>
      ))}

      {/* Collaboration Area */}
      <group position={[0, 0, -7]}>
        {/* Meeting Table */}
        <RoundedBox args={[3, 0.05, 1.4]} radius={0.02} smoothness={4} position={[0, 0.73, 0]} castShadow>
          <meshPhysicalMaterial 
            color="#8B4513"
            metalness={0.3}
            roughness={0.4}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
          />
        </RoundedBox>

        {/* Chairs */}
        {[...Array(6)].map((_, i) => {
          const angle = (i * Math.PI) / 3;
          const radius = 1;
          return (
            <group key={i} position={[Math.sin(angle) * radius, 0.5, Math.cos(angle) * radius - 7]}>
              <RoundedBox args={[0.5, 0.1, 0.5]} radius={0.05} smoothness={4} castShadow>
                <meshPhysicalMaterial color="#404040" roughness={0.3} metalness={0.7} />
              </RoundedBox>
              <group position={[0, 0.3, -0.2]} rotation={[0.2, 0, 0]}>
                <RoundedBox args={[0.45, 0.5, 0.05]} radius={0.05} smoothness={4} castShadow>
                  <meshPhysicalMaterial color="#404040" roughness={0.5} metalness={0.2} />
                </RoundedBox>
              </group>
            </group>
          );
        })}

        {/* Display Screen */}
        <group position={[0, 1.5, -8]}>
          <RoundedBox args={[2.5, 1.4, 0.1]} radius={0.02} smoothness={4} castShadow>
            <meshPhysicalMaterial color="#303030" metalness={0.9} roughness={0.1} />
          </RoundedBox>
          <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[2.3, 1.2]} />
            <meshStandardMaterial 
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.2}
              toneMapped={false}
            />
          </mesh>
        </group>
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