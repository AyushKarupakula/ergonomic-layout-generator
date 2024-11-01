"use client";
import { useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { Group } from "three";

export const CollaborativeWorkspace = () => {
  const deskRef = useRef<Group>(null);

  return (
    <group position={[0, 0, 0]} scale={1.5}>
      {/* Room Structure */}
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
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
      <group position={[0, 1.5, -6]}>
        <mesh receiveShadow>
          <boxGeometry args={[12, 3, 0.1]} />
          <meshStandardMaterial color="#f5f5f5" />
        </mesh>
        {/* Windows */}
        {[-2, 2].map((x) => (
          <mesh key={x} position={[x, 0.2, 0.1]}>
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
        ))}
      </group>

      {/* Side Walls */}
      <mesh position={[-6, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 3, 0.1]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      <mesh position={[6, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 3, 0.1]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>

      {/* Workstation Pods */}
      {[[-2.5, 0], [2.5, 0]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          {/* Pod of 4 Desks */}
          {[[1, 1], [1, -1], [-1, 1], [-1, -1]].map(([dx, dz], j) => (
            <group key={j} position={[dx * 1.2, 0.73, dz * 1.2]}>
              {/* Desk */}
              <RoundedBox args={[1.6, 0.05, 0.8]} radius={0.02} smoothness={4} castShadow>
                <meshPhysicalMaterial 
                  color="#8B4513"
                  metalness={0.3}
                  roughness={0.4}
                  clearcoat={0.8}
                  clearcoatRoughness={0.2}
                />
              </RoundedBox>
              
              {/* Monitor */}
              <group position={[0, 0.5, -0.3]}>
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
              <group position={[0, -0.1, 0.6]}>
                <RoundedBox args={[0.5, 0.1, 0.5]} radius={0.05} smoothness={4} castShadow>
                  <meshPhysicalMaterial color="#404040" roughness={0.3} metalness={0.7} />
                </RoundedBox>
                <group position={[0, 0.4, -0.2]} rotation={[0.2, 0, 0]}>
                  <RoundedBox args={[0.45, 0.6, 0.05]} radius={0.05} smoothness={4} castShadow>
                    <meshPhysicalMaterial color="#404040" roughness={0.5} metalness={0.2} />
                  </RoundedBox>
                </group>
              </group>
            </group>
          ))}

          {/* Pod Dividers */}
          <group position={[0, 1.2, 0]}>
            {/* Cross Divider */}
            <RoundedBox args={[2.8, 1.2, 0.02]} radius={0.01} smoothness={4} position={[0, 0, 0]}>
              <meshPhysicalMaterial 
                color="#ffffff"
                transparent
                opacity={0.3}
                metalness={0.9}
                roughness={0.1}
                clearcoat={1}
              />
            </RoundedBox>
            <RoundedBox args={[0.02, 1.2, 2.8]} radius={0.01} smoothness={4} position={[0, 0, 0]}>
              <meshPhysicalMaterial 
                color="#ffffff"
                transparent
                opacity={0.3}
                metalness={0.9}
                roughness={0.1}
                clearcoat={1}
              />
            </RoundedBox>
          </group>
        </group>
      ))}

      {/* Meeting Area */}
      <group position={[0, 0, -3.5]}>
        {/* Conference Table */}
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
            <group key={i} position={[Math.sin(angle) * radius, 0.6, Math.cos(angle) * radius - 3.5]}>
              <RoundedBox args={[0.5, 0.1, 0.5]} radius={0.05} smoothness={4} castShadow>
                <meshPhysicalMaterial color="#404040" roughness={0.3} metalness={0.7} />
              </RoundedBox>
              <group position={[0, 0.4, -0.2]} rotation={[0.2, 0, 0]}>
                <RoundedBox args={[0.45, 0.6, 0.05]} radius={0.05} smoothness={4} castShadow>
                  <meshPhysicalMaterial color="#404040" roughness={0.5} metalness={0.2} />
                </RoundedBox>
              </group>
            </group>
          );
        })}

        {/* Presentation Screen */}
        <group position={[0, 1.5, -4.5]}>
          <RoundedBox args={[3, 1.6, 0.1]} radius={0.02} smoothness={4} castShadow>
            <meshPhysicalMaterial color="#303030" metalness={0.9} roughness={0.1} />
          </RoundedBox>
          <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[2.8, 1.4]} />
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