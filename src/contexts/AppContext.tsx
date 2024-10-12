import React, { createContext, useContext, useMemo } from "react";
import { AppContextType } from "@/types/types";
import Loading from "@/components/ui/Loading";
import { usePeople } from "@/hooks/usePeople";
import { useExpenses } from "@/hooks/useExpenses";
import { useSavings } from "@/hooks/useSavings";
import { useDistributionMode } from "@/hooks/useDistributionMode";
import { useIncome } from "@/hooks/useIncome";
import { useBudget } from "@/hooks/useBudget";

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { people, ...peopleHook } = usePeople();
  const { expenses, ...expensesHook } = useExpenses();
  const { savings, ...savingsHook } = useSavings();
  const { distributionMode, ...distributionModeHook } = useDistributionMode();
  const { income, ...incomeHook } = useIncome();

  const budgetData = useBudget(
    people,
    expenses,
    savings,
    income,
    distributionMode
  );

  const isLoading =
    peopleHook.isLoading ||
    expensesHook.isLoading ||
    savingsHook.isLoading ||
    distributionModeHook.isLoading ||
    incomeHook.isLoading;

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
      budgets: budgetData,
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
      budgetData,
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
