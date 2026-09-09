import { CobeGlobe, type GlobeArc, type GlobeMarker } from "@/components/ui/cobe-globe";
import { useAccent } from "./accent-context";

const MARKERS: GlobeMarker[] = [
  { id: "india", location: [21.0, 78.0], label: "India" },
  { id: "usa", location: [39.5, -98.35], label: "United States" },
  { id: "canada", location: [56.13, -106.35], label: "Canada" },
  { id: "uk", location: [54.0, -2.5], label: "United Kingdom" },
  { id: "australia", location: [-25.27, 133.78], label: "Australia" },
  { id: "germany", location: [51.17, 10.45], label: "Germany" },
  { id: "uae", location: [23.42, 53.85], label: "UAE" },
  { id: "newzealand", location: [-41.5, 172.83], label: "New Zealand" },
  { id: "singapore", location: [1.35, 103.82], label: "Singapore" },
  { id: "france", location: [46.6, 2.35], label: "France" },
  { id: "japan", location: [36.2, 138.25], label: "Japan" },
];

const ARCS: GlobeArc[] = [];

const COLORS = {
  sage: {
    base: [0.86, 0.87, 0.83] as [number, number, number],
    marker: [0.38, 0.45, 0.29] as [number, number, number],
    arc: [0.42, 0.5, 0.32] as [number, number, number],
    glow: [0.95, 0.94, 0.92] as [number, number, number],
  },
  terracotta: {
    base: [0.9, 0.85, 0.81] as [number, number, number],
    marker: [0.64, 0.31, 0.18] as [number, number, number],
    arc: [0.7, 0.36, 0.2] as [number, number, number],
    glow: [0.96, 0.93, 0.9] as [number, number, number],
  },
  ink: {
    base: [0.87, 0.87, 0.87] as [number, number, number],
    marker: [0.18, 0.18, 0.18] as [number, number, number],
    arc: [0.28, 0.28, 0.28] as [number, number, number],
    glow: [0.95, 0.95, 0.95] as [number, number, number],
  },
};

export function DestinationGlobe({ className = "" }: { className?: string }) {
  const { accent } = useAccent();
  const c = COLORS[accent.id];

  return (
    <div className={`w-full ${className}`}>
      <CobeGlobe
        markers={MARKERS}
        arcs={ARCS}
        baseColor={c.base}
        markerColor={c.marker}
        arcColor={c.arc}
        glowColor={c.glow}
        dark={0}
        mapBrightness={7}
        markerSize={0.03}
        diffuse={1.2}
        speed={0.0025}
      />
    </div>
  );
}
