"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { WorkspaceSettingsDialog } from "@/components/layout/workspace-settings-dialog";
import { CreateLayoutDialog } from "@/components/layout/create-layout-dialog";
import {
  Save,
  Layout,
  MonitorCheck,
  Eye,
  Brain,
  Focus,
  Coffee,
  Laptop,
  Smartphone,
  Monitor,
  Tablet,
  Calendar,
  Mail,
  FileText,
  Terminal,
  Browser,
  Code,
  Video,
  Music,
  MessageSquare,
  Sun,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";

type WorkspacePanel = {
  id: string;
  title: string;
  type: 'desk' | 'monitor' | 'lighting' | 'seating' | 'environment';
  icon: any;
  content: React.ReactNode;
};

export default function WorkspacePage() {
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [selectedLayout, setSelectedLayout] = useState("split");
  const [isPanelDragging, setIsPanelDragging] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [selectedDevice, setSelectedDevice] = useState("desktop");
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const layoutType = searchParams.get("type") || "split";

  const handleSaveLayout = () => {
    toast({
      title: "Layout Saved",
      description: "Your ergonomic workspace preferences have been saved.",
    });
  };

  const devices = [
    { id: "desktop", icon: Monitor, label: "Desktop" },
    { id: "laptop", icon: Laptop, label: "Laptop" },
    { id: "tablet", icon: Tablet, label: "Tablet" },
    { id: "mobile", icon: Smartphone, label: "Mobile" }
  ];

  const workspacePanels: Record<string, WorkspacePanel> = {
    desk: {
      id: 'desk',
      title: 'Desk Setup',
      type: 'desk',
      icon: Monitor,
      content: (
        <div className="h-full flex flex-col">
          <div className="flex-1 p-4">
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-medium mb-2">Recommended Desk Height</h3>
                <div className="flex items-center justify-between mb-2">
                  <span>Optimal Height:</span>
                  <span className="font-mono">72cm (28.3")</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on your height and preferred working position, we recommend this desk height for optimal ergonomics.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="font-medium mb-2">Desk Depth</h4>
                  <span className="font-mono block mb-1">75cm (29.5")</span>
                  <span className="text-sm text-muted-foreground">For proper monitor distance</span>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="font-medium mb-2">Desk Width</h4>
                  <span className="font-mono block mb-1">140cm (55")</span>
                  <span className="text-sm text-muted-foreground">For your equipment setup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    monitor: {
      id: 'monitor',
      title: 'Monitor Position',
      type: 'monitor',
      icon: Eye,
      content: (
        <div className="h-full flex flex-col">
          <div className="flex-1 p-4">
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-medium mb-2">Monitor Setup</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Distance from Eyes:</span>
                    <span className="font-mono">50-70cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monitor Height:</span>
                    <span className="font-mono">Eye Level</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tilt Angle:</span>
                    <span className="font-mono">10-20°</span>
                  </div>
                </div>
              </div>
              <div className="bg-primary/10 rounded-lg p-4">
                <h4 className="font-medium mb-2">Ergonomic Tip</h4>
                <p className="text-sm">
                  Position your monitor so the top of the screen is at or slightly below eye level to maintain proper neck posture.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    lighting: {
      id: 'lighting',
      title: 'Lighting Setup',
      type: 'lighting',
      icon: Sun,
      content: (
        <div className="h-full flex flex-col">
          <div className="flex-1 p-4">
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-medium mb-2">Lighting Recommendations</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">Main Light:</span>
                    <p className="text-sm text-muted-foreground">Indirect overhead lighting at 300-500 lux</p>
                  </div>
                  <div>
                    <span className="font-medium">Task Light:</span>
                    <p className="text-sm text-muted-foreground">Adjustable desk lamp for detailed work</p>
                  </div>
                  <div>
                    <span className="font-medium">Natural Light:</span>
                    <p className="text-sm text-muted-foreground">Position desk perpendicular to windows</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    seating: {
      id: 'seating',
      title: 'Chair Settings',
      type: 'seating',
      icon: Coffee,
      content: (
        <div className="h-full flex flex-col">
          <div className="flex-1 p-4">
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-medium mb-2">Chair Adjustments</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Seat Height:</span>
                    <span className="font-mono">45cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Backrest Angle:</span>
                    <span className="font-mono">100-110°</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Armrest Height:</span>
                    <span className="font-mono">Table Height - 3cm</span>
                  </div>
                </div>
              </div>
              <div className="bg-primary/10 rounded-lg p-4">
                <h4 className="font-medium mb-2">Posture Reminder</h4>
                <p className="text-sm">
                  Keep feet flat on the floor and maintain a 90° angle at knees and hips.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    environment: {
      id: 'environment',
      title: 'Environment',
      type: 'environment',
      icon: Layout,
      content: (
        <div className="h-full flex flex-col">
          <div className="flex-1 p-4">
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-medium mb-2">Environmental Factors</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">Temperature:</span>
                    <p className="text-sm text-muted-foreground">20-23°C (68-73°F)</p>
                  </div>
                  <div>
                    <span className="font-medium">Humidity:</span>
                    <p className="text-sm text-muted-foreground">40-60%</p>
                  </div>
                  <div>
                    <span className="font-medium">Air Quality:</span>
                    <p className="text-sm text-muted-foreground">Regular ventilation recommended</p>
                  </div>
                </div>
              </div>
              <div className="bg-primary/10 rounded-lg p-4">
                <h4 className="font-medium mb-2">Noise Level</h4>
                <p className="text-sm">
                  Maintain ambient noise below 50dB for optimal concentration
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  const getDefaultPanels = () => {
    switch (layoutType) {
      case 'individual':
        return [
          workspacePanels.desk,
          workspacePanels.monitor,
          workspacePanels.lighting,
          workspacePanels.seating,
          workspacePanels.environment
        ];
      case 'collaborative':
        return [
          {
            ...workspacePanels.desk,
            content: (
              <div className="h-full flex flex-col">
                <div className="flex-1 p-4">
                  <div className="space-y-4">
                    <div className="bg-muted rounded-lg p-4">
                      <h3 className="font-medium mb-2">Shared Workspace Setup</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Table Height (Adjustable):</span>
                          <span className="font-mono">68-76cm</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Spacing per Person:</span>
                          <span className="font-mono">120cm min</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Collaboration Zone</h4>
                      <p className="text-sm">
                        Maintain 1.5m distance between workstations for comfortable collaboration
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          },
          workspacePanels.lighting,
          {
            ...workspacePanels.environment,
            content: (
              <div className="h-full flex flex-col">
                <div className="flex-1 p-4">
                  <div className="space-y-4">
                    <div className="bg-muted rounded-lg p-4">
                      <h3 className="font-medium mb-2">Team Environment</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium">Noise Level:</span>
                          <p className="text-sm text-muted-foreground">60-65dB (conversation level)</p>
                        </div>
                        <div>
                          <span className="font-medium">Meeting Zones:</span>
                          <p className="text-sm text-muted-foreground">Semi-private areas with acoustic treatment</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        ];
      case 'hybrid':
        return [
          {
            ...workspacePanels.desk,
            content: (
              <div className="h-full flex flex-col">
                <div className="flex-1 p-4">
                  <div className="space-y-4">
                    <div className="bg-muted rounded-lg p-4">
                      <h3 className="font-medium mb-2">Flexible Workstation</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Height Range:</span>
                          <span className="font-mono">65-85cm</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Quick Adjust Settings:</span>
                          <span className="font-mono">3 presets</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Hot Desk Tips</h4>
                      <p className="text-sm">
                        Quick adjustment guide for shared workstation ergonomics
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          },
          workspacePanels.monitor,
          workspacePanels.seating,
          {
            ...workspacePanels.environment,
            content: (
              <div className="h-full flex flex-col">
                <div className="flex-1 p-4">
                  <div className="space-y-4">
                    <div className="bg-muted rounded-lg p-4">
                      <h3 className="font-medium mb-2">Flexible Environment</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium">Zone Types:</span>
                          <p className="text-sm text-muted-foreground">Quiet, Collaborative, and Focus areas</p>
                        </div>
                        <div>
                          <span className="font-medium">Adaptable Lighting:</span>
                          <p className="text-sm text-muted-foreground">Zone-specific lighting controls</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        ];
      default:
        return [workspacePanels.desk, workspacePanels.monitor];
    }
  };

  const panels = getDefaultPanels();

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="h-16 border-b px-6 flex items-center justify-between bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/5 dark:via-purple-500/5 dark:to-pink-500/5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-primary">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Layout className="h-6 w-6" />
            </div>
            <span className="font-bold text-lg">ErgoSpace</span>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <span className="font-semibold text-muted-foreground">Personalized Workspace</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900">
            <MonitorCheck className="h-4 w-4" />
            Ergonomic Check
          </Button>
          <Button variant="outline" size="sm" className="gap-2" onClick={handleSaveLayout}>
            <Save className="h-4 w-4" />
            Save Layout
          </Button>
          <WorkspaceSettingsDialog />
          <ThemeToggle />
        </div>
      </header>

      <div className="flex-1 flex">
        <aside 
          style={{ width: `${sidebarWidth}px` }}
          className="border-r p-5 flex flex-col transition-all duration-200 ease-in-out bg-muted/30"
        >
          <Card className="mb-6 p-4">
            <h2 className="font-semibold mb-4">Device Preview</h2>
            <div className="grid grid-cols-2 gap-2">
              {devices.map((device) => (
                <Button
                  key={device.id}
                  variant={selectedDevice === device.id ? "default" : "outline"}
                  className="h-20 flex-col gap-2"
                  onClick={() => setSelectedDevice(device.id)}
                >
                  <device.icon className="h-6 w-6" />
                  <span className="text-xs">{device.label}</span>
                </Button>
              ))}
            </div>
          </Card>

          <Card className="mb-6 p-4">
            <h2 className="font-semibold mb-4">Ergonomic Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-2 flex justify-between">
                  <span>Display Width</span>
                  <span className="text-primary font-mono">{sidebarWidth}px</span>
                </label>
                <Slider
                  value={[sidebarWidth]}
                  onValueChange={([value]) => setSidebarWidth(value)}
                  min={200}
                  max={400}
                  step={1}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-2 flex justify-between">
                  <span>Zoom Level</span>
                  <span className="text-primary font-mono">{zoomLevel}%</span>
                </label>
                <Slider
                  value={[zoomLevel]}
                  onValueChange={([value]) => setZoomLevel(value)}
                  min={75}
                  max={150}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>
          </Card>

          <CreateLayoutDialog />
        </aside>

        <main className="flex-1 p-6 bg-gradient-to-b from-background to-muted/20">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Workspace Layout</h1>
              <p className="text-sm text-muted-foreground mt-1">Customize your workspace for optimal comfort and productivity</p>
            </div>
          </div>

          <div className={`grid ${layoutType === 'focus' ? 'grid-cols-1' : layoutType === 'grid' ? 'grid-cols-3' : 'grid-cols-2'} gap-4 h-[calc(100vh-12rem)]`}>
            {panels.map((panel, index) => (
              <Card key={panel.id} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-medium flex items-center gap-2">
                    <panel.icon className="h-4 w-4" />
                    {panel.title}
                  </h2>
                  <Button variant="ghost" size="sm">
                    Customize
                  </Button>
                </div>
                <CardContent className="p-0 h-[calc(100%-3rem)]">
                  {panel.content}
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}