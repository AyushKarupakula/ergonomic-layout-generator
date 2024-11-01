"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  OrbitControls,
  Environment,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  SoftShadows
} from "@react-three/drei";
import { IndividualWorkspace } from "../models/individual-workspace";
import { CollaborativeWorkspace } from "../models/collaborative-workspace";
import { HybridWorkspace } from "../models/hybrid-workspace";

const workspaceModels = {
  individual: IndividualWorkspace,
  collaborative: CollaborativeWorkspace,
  hybrid: HybridWorkspace,
};

interface WorkspaceViewerProps {
  type: keyof typeof workspaceModels;
}

export function WorkspaceViewer({ type }: WorkspaceViewerProps) {
  const WorkspaceModel = workspaceModels[type];

  return (
    <div className="w-full h-full">
      <Canvas 
        shadows 
        camera={{ position: [-5, 3, 5], fov: 45 }}
      >
        <SoftShadows size={40} samples={16} />
        <color attach="background" args={['#0A0A0B']} />
        
        <Suspense fallback={null}>
          {/* Enhanced Lighting Setup */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.5} color="#a5b4fc" />
          <spotLight
            position={[0, 5, 0]}
            intensity={0.6}
            angle={0.5}
            penumbra={1}
            castShadow
          />

          {/* Indoor Environment */}
          <Environment preset="studio" />

          {/* Main Content */}
          <group position={[0, 0, 0]}>
            <WorkspaceModel />
          </group>

          {/* Enhanced Shadows */}
          <ContactShadows 
            position={[0, -0.49, 0]}
            opacity={0.6}
            scale={20}
            blur={1}
            far={4}
            resolution={1024}
            color="#000000"
          />

          <AccumulativeShadows 
            temporal 
            frames={100} 
            alphaTest={0.85} 
            opacity={0.8}
            scale={12}
            position={[0, -0.49, 0]}
          >
            <RandomizedLight 
              amount={8}
              radius={10}
              ambient={0.5}
              intensity={1}
              position={[5, 5, -5]}
              bias={0.001}
            />
          </AccumulativeShadows>
        </Suspense>

        <OrbitControls 
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2}
          target={[0, 0, 0]}
          makeDefault
        />
      </Canvas>
    </div>
  );
} 