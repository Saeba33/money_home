import SectionHeader from "@/components/ui/SectionHeader";
import { useAppContext } from "@/contexts/AppContext";
import { DistributionMode } from "@/types/types";
import React from "react";

const DistributionModeComponent: React.FC = () => {
  const { distributionMode, setDistributionMode } = useAppContext();

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


        <div className="flex flex-col w-full gap-2 md:flex-row md:justify-start">
          {modes.map((mode) => (
            <label key={mode} className="flex flex-1">
              <input
                type="radio"
                value={mode}
                checked={distributionMode === mode}
                onChange={() => setDistributionMode(mode)}
                className="hidden"
              />
              <span
                className={`distribution-option ${
                  distributionMode === mode ? "selected" : ""
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
