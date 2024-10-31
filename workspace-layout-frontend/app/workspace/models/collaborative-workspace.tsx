"use client";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export const CollaborativeWorkspace = () => {
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
    deskFrame: new THREE.MeshPhysicalMaterial({
      color: '#303030',
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      transparent: true,
      opacity: 0.3,
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
    })
  };

  return (
    <group position={[0, 0, 0]} scale={1.5}>
      {/* Room Structure */}
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshPhysicalMaterial {...materials.floor} />
      </mesh>

      {/* Walls */}
      <group position={[0, 1.5, -6]}>
        <mesh receiveShadow>
          <boxGeometry args={[12, 3, 0.1]} />
          <meshStandardMaterial {...materials.wall} />
        </mesh>
        {/* Windows */}
        {[-2, 2].map((x) => (
          <mesh key={x} position={[x, 0.2, 0.1]}>
            <boxGeometry args={[3, 2, 0.1]} />
            <meshPhysicalMaterial {...materials.window} />
          </mesh>
        ))}
      </group>

      {/* Side Walls */}
      <mesh position={[-6, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 3, 0.1]} />
        <meshStandardMaterial {...materials.wall} />
      </mesh>
      <mesh position={[6, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 3, 0.1]} />
        <meshStandardMaterial {...materials.wall} />
      </mesh>

      {/* Workstation Pods */}
      {[[-2.5, 0], [2.5, 0]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          {/* Pod of 4 Desks */}
          {[[1, 1], [1, -1], [-1, 1], [-1, -1]].map(([dx, dz], j) => (
            <group key={j} position={[dx * 1.2, 0.73, dz * 1.2]}>
              {/* Desk */}
              <RoundedBox args={[1.6, 0.05, 0.8]} radius={0.02} smoothness={4} castShadow>
                <meshPhysicalMaterial {...materials.desk} />
              </RoundedBox>
              
              {/* Monitor */}
              <group position={[0, 0.5, -0.3]}>
                <RoundedBox args={[0.55, 0.35, 0.02]} radius={0.01} smoothness={4} castShadow>
                  <meshPhysicalMaterial {...materials.deskFrame} />
                </RoundedBox>
                <mesh position={[0, 0, 0.011]}>
                  <planeGeometry args={[0.52, 0.32]} />
                  <meshBasicMaterial {...materials.screen} />
                </mesh>
              </group>

              {/* Chair */}
              <group position={[0, -0.1, 0.6]}>
                <RoundedBox args={[0.5, 0.1, 0.5]} radius={0.05} smoothness={4} castShadow>
                  <meshPhysicalMaterial {...materials.chair} />
                </RoundedBox>
                <group position={[0, 0.4, -0.2]} rotation={[0.2, 0, 0]}>
                  <RoundedBox args={[0.45, 0.6, 0.05]} radius={0.05} smoothness={4} castShadow>
                    <meshPhysicalMaterial {...materials.chair} />
                  </RoundedBox>
                </group>
              </group>
            </group>
          ))}

          {/* Pod Dividers */}
          <group position={[0, 1.2, 0]}>
            {/* Cross Divider */}
            <RoundedBox args={[2.8, 1.2, 0.02]} radius={0.01} smoothness={4} position={[0, 0, 0]}>
              <meshPhysicalMaterial {...materials.glass} />
            </RoundedBox>
            <RoundedBox args={[0.02, 1.2, 2.8]} radius={0.01} smoothness={4} position={[0, 0, 0]}>
              <meshPhysicalMaterial {...materials.glass} />
            </RoundedBox>
          </group>
        </group>
      ))}

      {/* Meeting Area */}
      <group position={[0, 0, -3.5]}>
        {/* Conference Table */}
        <RoundedBox args={[3, 0.05, 1.4]} radius={0.02} smoothness={4} position={[0, 0.73, 0]} castShadow>
          <meshPhysicalMaterial {...materials.desk} />
        </RoundedBox>

        {/* Chairs */}
        {[...Array(6)].map((_, i) => {
          const angle = (i * Math.PI) / 3;
          const radius = 1;
          return (
            <group key={i} position={[Math.sin(angle) * radius, 0.6, Math.cos(angle) * radius - 3.5]}>
              <RoundedBox args={[0.5, 0.1, 0.5]} radius={0.05} smoothness={4} castShadow>
                <meshPhysicalMaterial {...materials.chair} />
              </RoundedBox>
              <group position={[0, 0.4, -0.2]} rotation={[0.2, 0, 0]}>
                <RoundedBox args={[0.45, 0.6, 0.05]} radius={0.05} smoothness={4} castShadow>
                  <meshPhysicalMaterial {...materials.chair} />
                </RoundedBox>
              </group>
            </group>
          );
        })}

        {/* Presentation Screen */}
        <group position={[0, 1.5, -4.5]}>
          <RoundedBox args={[3, 1.6, 0.1]} radius={0.02} smoothness={4} castShadow>
            <meshPhysicalMaterial {...materials.deskFrame} />
          </RoundedBox>
          <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[2.8, 1.4]} />
            <meshBasicMaterial {...materials.screen} />
          </mesh>
        </group>
      </group>

      {/* Breakout Area */}
      <group position={[4, 0, -4]}>
        {/* Soft Seating */}
        {[0, Math.PI / 2].map((rotation, i) => (
          <group key={i} rotation={[0, rotation, 0]} position={[0.8 * i, 0.3, 0]}>
            <RoundedBox args={[1.2, 0.4, 0.8]} radius={0.1} smoothness={4} castShadow>
              <meshPhysicalMaterial color="#505050" roughness={0.9} />
            </RoundedBox>
          </group>
        ))}
        {/* Coffee Table */}
        <RoundedBox args={[0.8, 0.4, 0.8]} radius={0.05} smoothness={4} position={[0.4, 0.2, 0.4]} castShadow>
          <meshPhysicalMaterial {...materials.desk} />
        </RoundedBox>
      </group>
    </group>
  );
};

export const collaborativeConfig = {
  title: "Collaborative Workspace",
  description: "An open-plan workspace designed for team interaction and group activities",
  highlights: [
    {
      title: "Workspace Layout",
      items: [
        "Multiple workstation pods",
        "Dedicated meeting area",
        "Breakout spaces",
        "Presentation facilities"
      ]
    },
    {
      title: "Collaboration Features",
      items: [
        "Conference setup",
        "Interactive displays",
        "Flexible seating",
        "Acoustic management"
      ]
    },
    {
      title: "Technology",
      items: [
        "Presentation system",
        "Video conferencing",
        "Shared power access",
        "High-speed connectivity"
      ]
    }
  ],
  dimensions: {
    width: "7.2m",
    length: "9.6m",
    height: "3.0m"
  },
  specs: {
    workstations: {
      pods: "2 pods of 4 desks",
      spacing: "1.5m between desks",
      privacy: "Acoustic dividers"
    },
    meeting: {
      capacity: "6-8 people",
      display: "75-inch interactive screen",
      audio: "Ceiling microphones"
    },
    environment: {
      lighting: "Zone-controlled LED",
      acoustics: "Sound dampening panels",
      climate: "Multi-zone control"
    }
  }
}; 