"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export default function OnboardingPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome to ErgoSpace</h1>
          <p className="text-gray-400">Let's design your perfect workspace</p>
        </div>

        <div className="space-y-6">
          {/* Workspace Environment */}
          <Card className="bg-[#141415] border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-6">Workspace Environment</h2>
            <div className="space-y-6">
              <div>
                <label className="block mb-2">Where will this workspace be located?</label>
                <p className="text-sm text-gray-400 mb-4">This helps us recommend appropriate layouts</p>
                <RadioGroup defaultValue="home" className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="home" id="home" />
                    <label htmlFor="home">Home Office</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="corporate" id="corporate" />
                    <label htmlFor="corporate">Corporate Office</label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <label className="block mb-2">Available Space</label>
                <p className="text-sm text-gray-400 mb-4">How much space do you have for your workspace?</p>
                <RadioGroup defaultValue="medium" className="grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="small" id="small" />
                    <label htmlFor="small">Small (&lt;6m²)</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <label htmlFor="medium">Medium (6-12m²)</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="large" id="large" />
                    <label htmlFor="large">Large (&gt;12m²)</label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </Card>

          {/* Physical Considerations */}
          <Card className="bg-[#141415] border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-6">Physical Considerations</h2>
            <div className="space-y-4">
              <label className="block mb-2">Do you have any specific physical considerations?</label>
              <p className="text-sm text-gray-400 mb-4">Select all that apply</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: "back-pain", label: "Back Pain/Discomfort" },
                  { id: "wrist-strain", label: "Wrist/Hand Strain" },
                  { id: "neck-pain", label: "Neck/Shoulder Pain" },
                  { id: "eye-strain", label: "Eye Strain" },
                  { id: "limited-mobility", label: "Limited Mobility" },
                  { id: "standing", label: "Prefer Standing" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox id={item.id} />
                    <label htmlFor={item.id} className="text-sm">{item.label}</label>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Equipment & Setup */}
          <Card className="bg-[#141415] border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-6">Equipment & Setup</h2>
            <div className="space-y-4">
              <label className="block mb-2">What equipment will you need in your workspace?</label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: "adjustable-desk", label: "Adjustable Desk" },
                  { id: "monitor-arm", label: "Monitor Arm" },
                  { id: "footrest", label: "Footrest" },
                  { id: "ergo-keyboard", label: "Ergonomic Keyboard" },
                  { id: "ergo-mouse", label: "Ergonomic Mouse" },
                  { id: "task-lighting", label: "Task Lighting" },
                  { id: "storage", label: "Storage Solutions" },
                  { id: "whiteboard", label: "Whiteboard/Planning Space" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox id={item.id} />
                    <label htmlFor={item.id} className="text-sm">{item.label}</label>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button 
            size="lg"
            onClick={() => router.push('/workspace/customize')}
            className="bg-white text-black hover:bg-gray-200"
          >
            Generate My Workspace Layout
          </Button>
        </div>
      </div>
    </div>
  );
} 