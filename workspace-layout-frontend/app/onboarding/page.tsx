"use client";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export default function OnboardingPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">Welcome to ErgoSpace</h1>
          <p className="text-gray-400">Let's design your perfect workspace</p>
        </div>

        <div className="space-y-6">
          {/* Workspace Environment */}
          <Card className="bg-[#141415] border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Workspace Environment</h2>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-white">Where will this workspace be located?</label>
                <p className="text-sm text-gray-400 mb-4">This helps us recommend appropriate layouts</p>
                <RadioGroup defaultValue="home" className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value="home" 
                      id="home" 
                      className="border-gray-600 text-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <label htmlFor="home" className="text-white">Home Office</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="corporate" id="corporate" />
                    <label htmlFor="corporate" className="text-white">Corporate Office</label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <label className="block mb-2 text-white">Available Space</label>
                <p className="text-sm text-gray-400 mb-4">How much space do you have?</p>
                <RadioGroup defaultValue="medium" className="grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="small" id="small" />
                    <label htmlFor="small" className="text-white">Small (&lt;6m²)</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <label htmlFor="medium" className="text-white">Medium (6-12m²)</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="large" id="large" />
                    <label htmlFor="large" className="text-white">Large (&gt;12m²)</label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </Card>

          {/* Physical Considerations */}
          <Card className="bg-[#141415] border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Physical Considerations</h2>
            <p className="text-sm text-gray-400 mb-4">Select all that apply</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: "backPain", label: "Back Pain/Discomfort" },
                { id: "wristStrain", label: "Wrist/Hand Strain" },
                { id: "neckPain", label: "Neck/Shoulder Pain" },
                { id: "eyeStrain", label: "Eye Strain" },
                { id: "limitedMobility", label: "Limited Mobility" },
                { id: "preferStanding", label: "Prefer Standing" }
              ].map((condition) => (
                <div key={condition.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={condition.id}
                    className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <label htmlFor={condition.id} className="text-sm text-white">
                    {condition.label}
                  </label>
                </div>
              ))}
            </div>
          </Card>

          {/* Equipment & Setup */}
          <Card className="bg-[#141415] border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Equipment & Setup</h2>
            <p className="text-sm text-gray-400 mb-4">What equipment will you need?</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: "adjustableDesk", label: "Adjustable Desk" },
                { id: "monitorArm", label: "Monitor Arm" },
                { id: "footrest", label: "Footrest" },
                { id: "ergoKeyboard", label: "Ergonomic Keyboard" },
                { id: "ergoMouse", label: "Ergonomic Mouse" },
                { id: "taskLighting", label: "Task Lighting" },
                { id: "storage", label: "Storage Solutions" },
                { id: "whiteboard", label: "Whiteboard/Planning Space" }
              ].map((equipment) => (
                <div key={equipment.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={equipment.id}
                    className="border-gray-600 text-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <label htmlFor={equipment.id} className="text-sm text-white">
                    {equipment.label}
                  </label>
                </div>
              ))}
            </div>
          </Card>

          {/* Environmental Preferences */}
          <Card className="bg-[#141415] border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Environmental Preferences</h2>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-white">Lighting Preferences</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="naturalLight"
                      className="border-gray-600 text-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <label htmlFor="naturalLight" className="text-sm text-white">Natural Light</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="taskLighting" />
                    <label htmlFor="taskLighting" className="text-sm text-white">Task Lighting</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ambientLighting" />
                    <label htmlFor="ambientLighting" className="text-sm text-white">Ambient Lighting</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="dimmableLights" />
                    <label htmlFor="dimmableLights" className="text-sm text-white">Dimmable Lights</label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-white">Noise Level Preference</label>
                <RadioGroup defaultValue="moderate" className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="quiet" id="quiet" />
                    <label htmlFor="quiet" className="text-white">Quiet Environment</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="moderate" />
                    <label htmlFor="moderate" className="text-white">Moderate Background Noise</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="active" id="active" />
                    <label htmlFor="active" className="text-white">Active/Busy Environment</label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </Card>
        </div>

        <Button 
          onClick={() => router.push('/workspace/customize')}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          Generate My Workspace Layout
        </Button>
      </div>
    </div>
  );
}