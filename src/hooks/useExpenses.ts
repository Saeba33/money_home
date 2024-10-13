import { useCallback } from "react";
import { Expense } from "@/types/types";
import { INITIAL_NEW_EXPENSE, INITIAL_EXPENSES } from "@/constants";
import {
  showSuccessNotification,
  showWarningNotification,
  showDeleteNotification,
} from "@/components/ui/Notifications";
import { useLocalStorage } from "./useLocalStorage";

export const useExpenses = () => {
  const [expenses, setExpenses, isLoadingExpenses, expensesError] = useLocalStorage<Expense[]>(
    "expenses",
    INITIAL_EXPENSES
  );
  const [draftExpense, setDraftExpense, isLoadingDraftExpense] =
    useLocalStorage<Expense>("draftExpense", INITIAL_NEW_EXPENSE);

  const updateDraftExpense = useCallback(
    (updatedExpense: Partial<Expense>) => {
      setDraftExpense((prev) => ({ ...prev, ...updatedExpense }));
    },
    [setDraftExpense]
  );

  const addExpense = useCallback(() => {
    if (!draftExpense.name || draftExpense.amount === undefined) {
      const missingFields = [];
      if (!draftExpense.name) missingFields.push("nom de la dépense");
      if (draftExpense.amount === undefined) missingFields.push("montant");
      showWarningNotification(
        `Veuillez renseigner : ${missingFields.join(", ")}`
      );
      return;
    }

    const expenseWithId = { ...draftExpense, id: Date.now() };
    setExpenses((prev) => [...prev, expenseWithId]);
    setDraftExpense(INITIAL_NEW_EXPENSE);
    showSuccessNotification("Dépense ajoutée avec succès");
  }, [draftExpense, setExpenses, setDraftExpense]);

  const updateExpense = useCallback(
    (id: number, updatedExpense: Partial<Expense>) => {
      setExpenses((prev) =>
        prev.map((expense) =>
          expense.id === id ? { ...expense, ...updatedExpense } : expense
        )
      );
    },
    [setExpenses]
  );

  const deleteExpense = useCallback(
    (id: number) => {
      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
      showDeleteNotification("Dépense supprimée");
    },
    [setExpenses]
  );

  const isLoading = isLoadingExpenses || isLoadingDraftExpense;
  const error = expensesError;

  return {
    expenses,
    draftExpense,
    updateDraftExpense,
    addExpense,
    updateExpense,
    deleteExpense,
    isLoading,
    error,
  };
};
