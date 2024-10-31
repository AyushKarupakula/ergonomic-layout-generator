"use client";

export const HybridWorkspace = () => {
  return (
    <group>
      {/* Hybrid workspace model implementation */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>
    </group>
  );
};

export const hybridConfig = {
  title: "Hybrid Workspace",
  description: "A flexible environment that supports various work styles and activities",
  highlights: [
    {
      title: "Work Zones",
      items: [
        "Hot desking area",
        "Private focus pods",
        "Collaboration space",
        "Phone booths"
      ]
    },
    {
      title: "Flexibility",
      items: [
        "Multiple seating options",
        "Bookable spaces",
        "Adaptable furniture",
        "Activity-based zones"
      ]
    },
    {
      title: "Technology",
      items: [
        "Wireless connectivity",
        "Digital booking system",
        "AV equipment",
        "Smart environmental controls"
      ]
    }
  ],
  dimensions: {
    width: "12.0m",
    length: "15.0m",
    height: "3.0m"
  },
  specs: {
    workstations: {
      hotDesks: "6-8 adjustable stations",
      focusPods: "4 private booths",
      phoneBooths: "2 soundproof units"
    },
    collaboration: {
      meetingArea: "8-person capacity",
      display: "85-inch interactive screen",
      breakout: "Casual seating for 6-8"
    },
    environment: {
      zoning: "Activity-based layout",
      acoustics: "Mixed treatment zones",
      lighting: "Zone-specific control"
    }
  }
}; 