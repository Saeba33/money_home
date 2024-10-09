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
  const [savings, setSavings] = useLocalStorage<Saving[]>("savings", []);
  const [newSaving, setNewSaving] = useLocalStorage<Saving>(
    "newSaving",
    INITIAL_NEW_SAVING
  );

  const updateNewSaving = useCallback(
    (updatedSaving: Partial<Saving>) => {
      setNewSaving((prev) => ({ ...prev, ...updatedSaving }));
    },
    [setNewSaving]
  );

  const addSaving = useCallback(() => {
    if (!newSaving.name || newSaving.amount === undefined) {
      const missingFields = [];
      if (!newSaving.name) missingFields.push("nom de l'épargne");
      if (newSaving.amount === undefined) missingFields.push("montant");
      showWarningNotification(
        `Veuillez renseigner : ${missingFields.join(", ")}`
      );
      return;
    }

    const savingWithId = { ...newSaving, id: Date.now() };
    setSavings((prev) => [...prev, savingWithId]);
    setNewSaving(INITIAL_NEW_SAVING);
    showSuccessNotification("Épargne ajoutée avec succès");
  }, [newSaving, setSavings, setNewSaving]);

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

  return {
    savings,
    newSaving,
    updateNewSaving,
    addSaving,
    updateSaving,
    deleteSaving,
  };
};
