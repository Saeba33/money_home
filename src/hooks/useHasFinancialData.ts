import { useAppContext } from "@/contexts/AppContext";

export const useHasFinancialData = () => {
  const { expenses, savings, income, isLoading } = useAppContext();

  const hasSignificantExpenses = expenses.some(
    (expense) => typeof expense.amount === "number" && expense.amount > 0
  );
  const hasSignificantSavings = savings.some(
    (saving) => typeof saving.amount === "number" && saving.amount > 0
  );
  const hasSignificantIncome = income.some(
    (income) => typeof income.amount === "number" && income.amount > 0
  );

  const hasAnySignificantData =
    hasSignificantExpenses || hasSignificantSavings || hasSignificantIncome;

  return {
    hasSignificantExpenses,
    hasSignificantSavings,
    hasSignificantIncome,
    hasAnySignificantData,
    isLoading,
  };
};
