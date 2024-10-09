import { useAppContext } from "@/contexts/AppContext";

export const useHasFinancialData = () => {
  const { expenses, savings, revenues } = useAppContext();

  const hasSignificantExpenses = expenses.some(
    (expense) => typeof expense.amount === "number" && expense.amount > 0
  );
  const hasSignificantSavings = savings.some(
    (saving) => typeof saving.amount === "number" && saving.amount > 0
  );
  const hasSignificantRevenues = revenues.some(
    (revenue) => typeof revenue.amount === "number" && revenue.amount > 0
  );

  const hasAnySignificantData =
    hasSignificantExpenses || hasSignificantSavings || hasSignificantRevenues;

  return {
    hasSignificantExpenses,
    hasSignificantSavings,
    hasSignificantRevenues,
    hasAnySignificantData,
  };
};
