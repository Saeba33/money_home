import React, { createContext, useContext, useMemo } from "react";
import { AppContextType } from "@/types/types";
import { usePeople } from "@/hooks/usePeople";
import { useExpenses } from "@/hooks/useExpenses";
import { useSavings } from "@/hooks/useSavings";
import { useDistributionMode } from "@/hooks/useDistributionMode";
import { useContributions } from "@/hooks/useContributions";
import { useRevenues } from "@/hooks/useRevenues";

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const peopleHook = usePeople();
  const expensesHook = useExpenses();
  const savingsHook = useSavings();
  const distributionModeHook = useDistributionMode();
  const revenuesHook = useRevenues();

  const contributionsData = useContributions(
    peopleHook.people,
    expensesHook.expenses,
    savingsHook.savings,
    revenuesHook.revenues,
    distributionModeHook.distributionMode
  );

  const contextValue = useMemo<AppContextType>(
    () => ({
      ...peopleHook,
      ...expensesHook,
      ...savingsHook,
      ...distributionModeHook,
      ...revenuesHook,
      contributions: contributionsData,
    }),
    [
      peopleHook,
      expensesHook,
      savingsHook,
      distributionModeHook,
      revenuesHook,
      contributionsData,
    ]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
