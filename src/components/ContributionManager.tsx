import React from "react";
import { Contribution } from "../types/types";

interface ContributionManagerProps {
  contributions: Contribution[];
  distributionMode: string;
}

const ContributionManager: React.FC<ContributionManagerProps> = ({
  contributions,
  distributionMode,
}) => {
  return (
    <div>
      <h2 className="text-xl mt-4">Contributions</h2>
      <div className="flex flex-col">
        {contributions.map((contribution, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between mb-2">
              <span>
                {contribution.name} - Contribution du foyer (
                {contribution.percentage}%) :
              </span>
              <span>{contribution.contributionFoyer} €</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>{contribution.name} - Contribution personnelle : </span>
              <span>{contribution.contributionPersonnelle} €</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContributionManager;
