import { useState } from "react";
import { Expense, NewExpense } from "../types/types";
import { INITIAL_EXPENSES, INITIAL_NEW_EXPENSE } from "../constants";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [newExpense, setNewExpense] = useState<NewExpense>(INITIAL_NEW_EXPENSE);

  const handleExpenseChange = (
    index: number,
    field: keyof Expense,
    value: string
  ) => {
    const updatedExpenses = expenses.map((expense, i) => {
      if (i === index) {
        return {
          ...expense,
          [field]: field.includes("amount") ? Number(value) : value,
        };
      }
      return expense;
    });
    setExpenses(updatedExpenses);
  };

  const handleDeleteExpense = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const handleNewExpenseChange = (
    field: keyof NewExpense,
    value: string | number
  ) => {
    setNewExpense((prev) => ({ ...prev, [field]: value }));
  };

  const addNewExpense = () => {
    if (
      newExpense.name &&
      (newExpense.amountMonthly !== undefined ||
        newExpense.amountYearly !== undefined)
    ) {
      setExpenses([...expenses, newExpense as Expense]);
      setNewExpense(INITIAL_NEW_EXPENSE);
    } else {
      alert("Veuillez remplir au moins le nom et un montant.");
    }
  };

  return {
    expenses,
    setExpenses,
    newExpense,
    setNewExpense,
    handleExpenseChange,
    handleDeleteExpense,
    handleNewExpenseChange,
    addNewExpense,
  };
};
