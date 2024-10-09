import { useState } from "react";
import { DistributionMode } from "@/types/types";

export const useDistributionMode = () => {
  const [distributionMode, setDistributionMode] =
    useState<DistributionMode>("égalitaire");

  return { distributionMode, setDistributionMode };
};
