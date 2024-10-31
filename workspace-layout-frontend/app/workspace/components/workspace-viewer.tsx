"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  OrbitControls, 
  PerspectiveCamera,
  Stage
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
        <color attach="background" args={['#0A0A0B']} />
        
        <Suspense fallback={null}>
          {/* Basic Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.5} />

          {/* Main Content */}
          <group position={[0, 0, 0]}>
            <WorkspaceModel />
          </group>

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