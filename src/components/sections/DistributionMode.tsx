import SectionHeader from "@/components/ui/SectionHeader";
import { useAppContext } from "@/contexts/AppContext";
import { DistributionMode } from "@/types/types";
import React from "react";

const DistributionModeComponent: React.FC = () => {
  const { distributionMode, setDistributionMode, people } = useAppContext();

  const modes: DistributionMode[] = [
    "égalitaire",
    "proportionnel",
    "personnalisé",
  ];

  return (
    <SectionHeader
      title="Modes de répartition"
      infoTextKey="DISTRIBUTION"
      defaultOpenedSection={true}
    >
      <div className="flex flex-col sm:flex-row gap-2 justify-start items-center">
        {modes.map((mode) => (
          <label key={mode} className="flex">
            <input
              type="radio"
              value={mode}
              checked={distributionMode === mode}
              onChange={() => setDistributionMode(mode)}
              className="hidden"
            />
            <span
              className={`px-3 py-1 rounded cursor-pointer ${
                distributionMode === mode
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </span>
          </label>
        ))}
      </div>
    </SectionHeader>
  );
};

export default DistributionModeComponent;
