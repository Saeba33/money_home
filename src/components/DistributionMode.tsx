import React from "react";

interface DistributionModeProps {
  distributionMode: string;
  setDistributionMode: React.Dispatch<React.SetStateAction<string>>;
}

const DistributionMode: React.FC<DistributionModeProps> = ({
  distributionMode,
  setDistributionMode,
}) => {
  return (
    <div>
      <h2 className="text-xl mt-4">Modes de répartition</h2>
      <div className="flex space-x-4 mb-4">
        <label>
          <input
            type="radio"
            value="equal"
            checked={distributionMode === "equal"}
            onChange={() => setDistributionMode("equal")}
          />
          Égal
        </label>
        <label>
          <input
            type="radio"
            value="proportional"
            checked={distributionMode === "proportional"}
            onChange={() => setDistributionMode("proportional")}
          />
          Proportionnel
        </label>
        <label>
          <input
            type="radio"
            value="percentage"
            checked={distributionMode === "percentage"}
            onChange={() => setDistributionMode("percentage")}
          />
          Pourcentage
        </label>
      </div>
    </div>
  );
};

export default DistributionMode;
