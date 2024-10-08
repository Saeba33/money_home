import { useState, useCallback, useEffect } from "react";
import { Expense } from "@/types/types";
import { INITIAL_NEW_EXPENSE, INITIAL_EXPENSES } from "@/constants";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState<Expense>(INITIAL_NEW_EXPENSE);

  // Utiliser useEffect pour initialiser les dépenses avec INITIAL_EXPENSES
  useEffect(() => {
    setExpenses(INITIAL_EXPENSES);
  }, []);

  const updateNewExpense = useCallback((updatedExpense: Partial<Expense>) => {
    setNewExpense((prev) => ({ ...prev, ...updatedExpense }));
  }, []);

  const addExpense = useCallback(() => {
    if (
      newExpense.name &&
      newExpense.amount !== undefined &&
      newExpense.assignedTo
    ) {
      const expenseWithId = { ...newExpense, id: Date.now() };
      setExpenses((prev) => [...prev, expenseWithId]);
      setNewExpense(INITIAL_NEW_EXPENSE);
    }
  }, [newExpense]);

  const updateExpense = useCallback(
    (id: number, updatedExpense: Partial<Expense>) => {
      setExpenses((prev) =>
        prev.map((expense) =>
          expense.id === id ? { ...expense, ...updatedExpense } : expense
        )
      );
    },
    []
  );

  const deleteExpense = useCallback((id: number) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  }, []);

  return {
    expenses,
    newExpense,
    updateNewExpense,
    addExpense,
    updateExpense,
    deleteExpense,
  };
};
