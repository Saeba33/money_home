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
  const [income, setIncome, isLoadingIncome, incomeError] = useLocalStorage<Income[]>(
    "income",
    []
  );
  const [draftIncome, setDraftIncome, isLoadingDraftIncome] =
    useLocalStorage<Income>("draftIncome", INITIAL_NEW_INCOME);

  const updateDraftIncome = useCallback(
    (updatedIncome: Partial<Income>) => {
      setDraftIncome((prev) => ({ ...prev, ...updatedIncome }));
    },
    [setDraftIncome]
  );

  const addIncome = useCallback(() => {
    if (!draftIncome.name || draftIncome.amount === undefined) {
      const missingFields = [];
      if (!draftIncome.name) missingFields.push("nom du revenu");
      if (draftIncome.amount === undefined) missingFields.push("montant");
      showWarningNotification(
        `Veuillez renseigner : ${missingFields.join(", ")}`
      );
      return;
    }

    const incomeWithId = { ...draftIncome, id: Date.now() };
    setIncome((prev) => [...prev, incomeWithId]);
    setDraftIncome(INITIAL_NEW_INCOME);
    showSuccessNotification("Revenu ajouté avec succès");
  }, [draftIncome, setIncome, setDraftIncome]);

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

  const isLoading = isLoadingIncome || isLoadingDraftIncome;
  const error = incomeError ;

  return {
    income,
    draftIncome,
    updateDraftIncome,
    addIncome,
    updateIncome,
    deleteIncome,
    isLoading,
    error,
  };
};
