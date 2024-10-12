import Loading from "@/components/ui/Loading";
import { useContributions } from "@/hooks/useContributions";
import { useDistributionMode } from "@/hooks/useDistributionMode";
import { useExpenses } from "@/hooks/useExpenses";
import { useIncome } from "@/hooks/useIncome";
import { usePeople } from "@/hooks/usePeople";
import { useSavings } from "@/hooks/useSavings";
import { AppContextType } from "@/types/types";
import React, { createContext, useContext, useMemo } from "react";

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { people, isLoading: isPeopleLoading, ...peopleHook } = usePeople();
  const {
    expenses,
    isLoading: isExpensesLoading,
    ...expensesHook
  } = useExpenses();
  const { savings, isLoading: isSavingsLoading, ...savingsHook } = useSavings();
  const {
    distributionMode,
    isLoading: isDistributionModeLoading,
    ...distributionModeHook
  } = useDistributionMode();
  const { income, isLoading: isIncomeLoading, ...incomeHook } = useIncome();

  const isLoading =
    isPeopleLoading ||
    isExpensesLoading ||
    isSavingsLoading ||
    isDistributionModeLoading ||
    isIncomeLoading;

  const contributionsData = useContributions(
    people,
    expenses,
    savings,
    income,
    distributionMode
  );

  const contextValue = useMemo<AppContextType>(
    () => ({
      people,
      ...peopleHook,
      expenses,
      ...expensesHook,
      savings,
      ...savingsHook,
      distributionMode,
      ...distributionModeHook,
      income,
      ...incomeHook,
      contributions: contributionsData,
      isLoading,
    }),
    [
      people,
      peopleHook,
      expenses,
      expensesHook,
      savings,
      savingsHook,
      distributionMode,
      distributionModeHook,
      income,
      incomeHook,
      contributionsData,
      isLoading,
    ]
  );

  if (isLoading) {
    return <Loading />;
  }

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
