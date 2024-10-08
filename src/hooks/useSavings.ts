import { useState, useCallback } from "react";
import { Saving } from "@/types/types";
import { INITIAL_NEW_SAVING } from "@/constants";

export const useSavings = () => {
  const [savings, setSavings] = useState<Saving[]>([]);
  const [newSaving, setNewSaving] = useState<Saving>(INITIAL_NEW_SAVING);

  const updateNewSaving = useCallback((updatedSaving: Partial<Saving>) => {
    setNewSaving((prev) => ({ ...prev, ...updatedSaving }));
  }, []);

  const addSaving = useCallback(() => {
    if (
      newSaving.name &&
      newSaving.amount !== undefined &&
      newSaving.assignedTo
    ) {
      const savingWithId = { ...newSaving, id: Date.now() }; // Génération d'un ID unique
      setSavings((prev) => [...prev, savingWithId]);

      // Réinitialisation de l'état pour préparer la prochaine entrée
      setNewSaving(INITIAL_NEW_SAVING);
    }
  }, [newSaving]);

  const updateSaving = useCallback(
    (id: number, updatedSaving: Partial<Saving>) => {
      setSavings((prev) =>
        prev.map((saving) =>
          saving.id === id ? { ...saving, ...updatedSaving } : saving
        )
      );
    },
    []
  );

  const deleteSaving = useCallback((id: number) => {
    setSavings((prev) => prev.filter((saving) => saving.id !== id));
  }, []);

  return {
    savings,
    newSaving,
    updateNewSaving,
    addSaving,
    updateSaving,
    deleteSaving,
  };
};
