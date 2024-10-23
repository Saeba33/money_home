import { useCallback } from "react";
import { Saving } from "@/types/types";
import { INITIAL_NEW_SAVING } from "@/constants";
import {
  showSuccessNotification,
  showWarningNotification,
  showDeleteNotification,
} from "@/components/ui/Notifications";
import { useLocalStorage } from "./useLocalStorage";

export const useSavings = () => {
  const [savings, setSavings, isLoadingSavings, savingsError] = useLocalStorage<Saving[]>(
    "savings",
    []
  );
  const [draftSaving, setDraftSaving, isLoadingDraftSaving] =
    useLocalStorage<Saving>("draftSaving", INITIAL_NEW_SAVING);

  const updateDraftSaving = useCallback(
    (updatedSaving: Partial<Saving>) => {
      setDraftSaving((prev) => ({ ...prev, ...updatedSaving }));
    },
    [setDraftSaving]
  );

  const addSaving = useCallback(() => {
    if (!draftSaving.name || draftSaving.amount === undefined) {
      const missingFields = [];
      if (!draftSaving.name) missingFields.push("le nom de l'épargne");
      if (draftSaving.amount === undefined) missingFields.push("un montant");
      showWarningNotification(
        `Veuillez renseigner ${missingFields.join(" et ")} !`
      );
      return;
    }

    const savingWithId = { ...draftSaving, id: Date.now() };
    setSavings((prev) => [...prev, savingWithId]);
    setDraftSaving(INITIAL_NEW_SAVING);
    showSuccessNotification("Épargne ajoutée avec succès");
  }, [draftSaving, setSavings, setDraftSaving]);

  const updateSaving = useCallback(
    (id: number, updatedSaving: Partial<Saving>) => {
      setSavings((prev) =>
        prev.map((saving) =>
          saving.id === id ? { ...saving, ...updatedSaving } : saving
        )
      );
    },
    [setSavings]
  );

  const deleteSaving = useCallback(
    (id: number) => {
      setSavings((prev) => prev.filter((saving) => saving.id !== id));
      showDeleteNotification("Épargne supprimée");
    },
    [setSavings]
  );

  const isLoading = isLoadingSavings || isLoadingDraftSaving;
  const error = savingsError;

  return {
    savings,
    draftSaving,
    updateDraftSaving,
    addSaving,
    updateSaving,
    deleteSaving,
    isLoading,
    error,
  };
};
