"use client";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCircle, Users, Building2 } from "lucide-react";
import * as React from "react";

interface LayoutOption {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  features: string[];
}

export default function CustomizePage() {
  const router = useRouter();
  const [selectedLayout, setSelectedLayout] = React.useState<string | null>(null);

  const layouts: LayoutOption[] = [
    {
      id: "individual",
      name: "Individual Workspace",
      icon: UserCircle,
      description: "Optimized for personal focus and productivity",
      features: [
        "Ergonomic desk and chair setup",
        "Optimal monitor positioning",
        "Personal lighting controls",
        "Noise reduction recommendations"
      ]
    },
    {
      id: "collaborative",
      name: "Collaborative Space",
      icon: Users,
      description: "Designed for team interaction while maintaining comfort",
      features: [
        "Flexible seating arrangements",
        "Shared workspace ergonomics",
        "Meeting area setup",
        "Group lighting considerations"
      ]
    },
    {
      id: "hybrid",
      name: "Hybrid Office",
      icon: Building2,
      description: "Balance of personal and shared spaces",
      features: [
        "Hot desk ergonomics",
        "Adjustable workstations",
        "Multi-purpose area setup",
        "Adaptable lighting zones"
      ]
    }
  ];

  const handleLayoutSelect = (layoutId: string) => {
    setSelectedLayout(layoutId);
    router.push(`/workspace?type=${layoutId}`);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Choose Your Layout Style</h1>
          <p className="text-gray-400">Select the workspace configuration that best suits your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {layouts.map((layout) => {
            const Icon = layout.icon;
            return (
              <Card
                key={layout.id}
                className={`bg-[#141415] border-gray-800 p-6 cursor-pointer transition-all hover:scale-105 ${
                  selectedLayout === layout.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => handleLayoutSelect(layout.id)}
              >
                <div className="space-y-4">
                  <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold">{layout.name}</h3>
                  <p className="text-gray-400 text-sm">{layout.description}</p>
                  <ul className="space-y-2">
                    {layout.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="mr-4"
          >
            Back to Preferences
          </Button>
        </div>
      </div>
    </div>
  );
} 