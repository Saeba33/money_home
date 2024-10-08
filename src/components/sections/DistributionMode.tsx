import React from "react";
import { INFO_TEXTS } from "@/constants/index";
import { useAppContext } from "@/contexts/AppContext";
import SectionHeader from "@/components/ui/SectionHeader";
import { DistributionMode } from "@/types/types";

const DistributionModeComponent: React.FC = () => {
  const { distributionMode, setDistributionMode, people } = useAppContext();

  if (people.length <= 1) {
    return null;
  }

  const modes: DistributionMode[] = ["equal", "proportional", "percentage"];

  return (
    <SectionHeader
      title="Modes de répartition"
      infoText={INFO_TEXTS.DISTRIBUTION}
      defaultOpenedSection={true}
    >
      <div className="flex space-x-4">
        {modes.map((mode) => (
          <label key={mode} className="flex items-center">
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
