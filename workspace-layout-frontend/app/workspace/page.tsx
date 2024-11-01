"use client";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Ruler, 
  Maximize2, 
  Monitor,
  Lightbulb,
  Wifi,
  ThermometerSun,
  Headphones,
  Zap,
  Shield,
  Sparkles,
  Download,
  PencilRuler
} from "lucide-react";

import { IndividualWorkspace, individualConfig } from "./models/individual-workspace";
import { CollaborativeWorkspace, collaborativeConfig } from "./models/collaborative-workspace";
import { HybridWorkspace, hybridConfig } from "./models/hybrid-workspace";
import { WorkspaceViewer } from "./components/workspace-viewer";

type WorkspaceType = "individual" | "collaborative" | "hybrid";

type WorkspaceConfig = {
  title: string;
  description: string;
  dimensions: Record<string, string>;
  specs: Record<string, Record<string, string>>;
};

const workspaceConfigs: Record<WorkspaceType, WorkspaceConfig & { Model: React.ComponentType }> = {
  individual: { ...individualConfig, Model: IndividualWorkspace },
  collaborative: { ...collaborativeConfig, Model: CollaborativeWorkspace },
  hybrid: { ...hybridConfig, Model: HybridWorkspace }
};

export default function WorkspacePage() {
  const searchParams = useSearchParams();
  const workspaceType = (searchParams.get('type') || 'individual') as WorkspaceType;
  const config = workspaceConfigs[workspaceType];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/10 p-2 rounded-lg">
                <Sparkles className="w-6 h-6 text-blue-400" />
              </div>
              <h1 className="text-3xl font-bold">{config.title}</h1>
            </div>
            <p className="text-gray-400 max-w-xl">{config.description}</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => window.print()}
            >
              <Download className="w-4 h-4" />
              Export Layout
            </Button>
            <Button 
              className="gap-2"
              onClick={() => window.location.href = '/onboarding'}
            >
              <PencilRuler className="w-4 h-4" />
              Adjust Preferences
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 3D Visualization */}
          <div className="lg:col-span-2 space-y-6">
            {/* 3D Viewer */}
            <Card className="bg-[#141415] border-gray-800 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Workspace Layout</h2>
                <div className="text-sm text-gray-400">
                  Drag to rotate &bull; Scroll to zoom &bull; Shift + drag to pan
                </div>
              </div>
              <div className="bg-[#1A1A1B] rounded-lg h-[600px]">
                <WorkspaceViewer type={workspaceType} />
              </div>
            </Card>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: Monitor, title: "Dual Monitors", desc: "Optimized for productivity" },
                { icon: Lightbulb, title: "Smart Lighting", desc: "Adaptive brightness control" },
                { icon: Wifi, title: "High-Speed Network", desc: "Dedicated connection" },
                { icon: ThermometerSun, title: "Climate Control", desc: "Perfect temperature" },
                { icon: Headphones, title: "Acoustic Design", desc: "Noise optimization" },
                { icon: Shield, title: "Ergonomic Setup", desc: "Health-focused design" },
              ].map((feature) => (
                <Card key={feature.title} className="bg-[#141415] border-gray-800 p-4 hover:bg-[#1A1A1B] transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500/10 p-2 rounded-lg">
                      <feature.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">{feature.title}</h3>
                      <p className="text-sm text-gray-400">{feature.desc}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column - Specifications */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="bg-[#141415] border-gray-800 p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Overview</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1A1A1B] p-3 rounded-lg">
                  <p className="text-sm text-gray-400">Floor Space</p>
                  <p className="text-xl font-semibold">7.2m²</p>
                </div>
                <div className="bg-[#1A1A1B] p-3 rounded-lg">
                  <p className="text-sm text-gray-400">Power Points</p>
                  <p className="text-xl font-semibold">8 Units</p>
                </div>
                <div className="bg-[#1A1A1B] p-3 rounded-lg">
                  <p className="text-sm text-gray-400">Light Level</p>
                  <p className="text-xl font-semibold">650 lux</p>
                </div>
                <div className="bg-[#1A1A1B] p-3 rounded-lg">
                  <p className="text-sm text-gray-400">Noise Level</p>
                  <p className="text-xl font-semibold">45 dB</p>
                </div>
              </div>
            </Card>

            {/* Dimensions Card */}
            <Card className="bg-[#141415] border-gray-800 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-blue-400" />
                Room Dimensions
              </h3>
              <div className="space-y-3">
                {Object.entries(config.dimensions).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-2 bg-[#1A1A1B] rounded-lg">
                    <span className="text-gray-400 capitalize">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Equipment Specifications */}
            <Card className="bg-[#141415] border-gray-800 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Maximize2 className="w-5 h-5 text-blue-400" />
                Equipment Details
              </h3>
              <div className="space-y-4">
                {Object.entries(config.specs).map(([category, specs]) => (
                  <div key={category} className="bg-[#1A1A1B] p-3 rounded-lg">
                    <h4 className="font-medium mb-2 capitalize flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      {category}
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-400">{key}</span>
                          <span>{value.toString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Power Consumption */}
            <Card className="bg-[#141415] border-gray-800 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-400" />
                Power Usage
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-[#1A1A1B] rounded-lg">
                  <span className="text-gray-400">Daily Average</span>
                  <span className="font-medium">1.2 kWh</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#1A1A1B] rounded-lg">
                  <span className="text-gray-400">Monthly Estimate</span>
                  <span className="font-medium">36 kWh</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}