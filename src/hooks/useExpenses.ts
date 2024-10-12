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
  const [expenses, setExpenses, isLoadingExpenses] = useLocalStorage<Expense[]>(
    "expenses",
    INITIAL_EXPENSES
  );
  const [newExpense, setNewExpense, isLoadingNewExpense] =
    useLocalStorage<Expense>("newExpense", INITIAL_NEW_EXPENSE);

  const updateNewExpense = useCallback(
    (updatedExpense: Partial<Expense>) => {
      setNewExpense((prev) => ({ ...prev, ...updatedExpense }));
    },
    [setNewExpense]
  );

  const addExpense = useCallback(() => {
    if (!newExpense.name || newExpense.amount === undefined) {
      const missingFields = [];
      if (!newExpense.name) missingFields.push("nom de la dépense");
      if (newExpense.amount === undefined) missingFields.push("montant");
      showWarningNotification(
        `Veuillez renseigner : ${missingFields.join(", ")}`
      );
      return;
    }

    const expenseWithId = { ...newExpense, id: Date.now() };
    setExpenses((prev) => [...prev, expenseWithId]);
    setNewExpense(INITIAL_NEW_EXPENSE);
    showSuccessNotification("Dépense ajoutée avec succès");
  }, [newExpense, setExpenses, setNewExpense]);

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

  const isLoading = isLoadingExpenses || isLoadingNewExpense;

  return {
    expenses,
    newExpense,
    updateNewExpense,
    addExpense,
    updateExpense,
    deleteExpense,
    isLoading,
  };
};
