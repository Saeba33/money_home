import {
  showDeleteNotification,
  showSuccessNotification,
  showWarningNotification,
} from "@/components/ui/Notifications";
import { INITIAL_NEW_INCOME } from "@/constants";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Income } from "@/types/types";
import { useCallback } from "react";

export const useIncome = () => {
  const [income, setIncome, isLoadingIncome] = useLocalStorage<Income[]>(
    "income",
    []
  );
  const [newIncome, setNewIncome, isLoadingNewIncome] = useLocalStorage<Income>(
    "newIncome",
    INITIAL_NEW_INCOME
  );

  const updateNewIncome = useCallback(
    (updatedIncome: Partial<Income>) => {
      setNewIncome((prev) => ({ ...prev, ...updatedIncome }));
    },
    [setNewIncome]
  );

  const addIncome = useCallback(() => {
    if (!newIncome.name || newIncome.amount === undefined) {
      const missingFields = [];
      if (!newIncome.name) missingFields.push("nom du revenu");
      if (newIncome.amount === undefined) missingFields.push("montant");
      showWarningNotification(
        `Veuillez renseigner : ${missingFields.join(", ")}`
      );
      return;
    }

    const incomeWithId = { ...newIncome, id: Date.now() };
    setIncome((prev) => [...prev, incomeWithId]);
    setNewIncome(INITIAL_NEW_INCOME);
    showSuccessNotification("Revenu ajouté avec succès");
  }, [newIncome, setIncome, setNewIncome]);

  const updateIncome = useCallback(
    (id: number, updatedIncome: Partial<Income>) => {
      setIncome((prev) =>
        prev.map((income) =>
          income.id === id ? { ...income, ...updatedIncome } : income
        )
      );
    },
    [setIncome]
  );

  const deleteIncome = useCallback(
    (id: number) => {
      setIncome((prev) => prev.filter((income) => income.id !== id));
      showDeleteNotification("Revenu supprimé");
    },
    [setIncome]
  );

  const isLoading = isLoadingIncome || isLoadingNewIncome;

  return {
    income,
    newIncome,
    updateNewIncome,
    addIncome,
    updateIncome,
    deleteIncome,
    isLoading,
  };
};
