import { DistributionMode } from "@/types/types";
import { useLocalStorage } from "./useLocalStorage";

export const useDistributionMode = () => {
  const [distributionMode, setDistributionMode, isLoading] =
    useLocalStorage<DistributionMode>("distributionMode", "égalitaire");

  return { distributionMode, setDistributionMode, isLoading };
};
