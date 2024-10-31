"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Layout, Users, UserCircle, Building2 } from "lucide-react";

export default function CustomizePage() {
  const router = useRouter();
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);

  const layouts = [
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Choose Your Workspace Type</h1>
          <p className="text-muted-foreground">Select the workspace layout that best matches your working style</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {layouts.map((layout) => (
            <Card
              key={layout.id}
              className={`p-6 cursor-pointer transition-all hover:scale-[1.02] ${
                selectedLayout === layout.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedLayout(layout.id)}
            >
              <div className="flex flex-col h-full">
                <div className="text-center mb-6">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <layout.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{layout.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{layout.description}</p>
                </div>
                
                <div className="flex-1 bg-muted/50 rounded-lg p-4">
                  <ul className="space-y-2">
                    {layout.features.map((feature, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Button 
            variant="outline"
            onClick={() => router.back()}
          >
            Back
          </Button>
          <Button 
            onClick={() => router.push(`/workspace?type=${selectedLayout}`)}
            disabled={!selectedLayout}
          >
            Continue to Workspace
          </Button>
        </div>
      </div>
    </div>
  );
} 