import { useState, useCallback } from "react";
import { Savings } from "../types/types";
import { INITIAL_NEW_SAVING } from "../constants";

export const useSavings = () => {
  const [savings, setSavings] = useState<Savings[]>([]);
  const [newSaving, setNewSaving] = useState<Savings>(INITIAL_NEW_SAVING);

  const updateNewSaving = useCallback((updatedSaving: Savings) => {
    setNewSaving(updatedSaving);
  }, []);

  const addSaving = useCallback(() => {
    if (newSaving.name && newSaving.amount !== undefined) {
      setSavings((prev) => [...prev, newSaving]);
      setNewSaving(INITIAL_NEW_SAVING);
    }
  }, [newSaving]);

  const updateSaving = useCallback((index: number, updatedSaving: Savings) => {
    setSavings((prev) =>
      prev.map((saving, i) => (i === index ? updatedSaving : saving))
    );
  }, []);

  const deleteSaving = useCallback((index: number) => {
    setSavings((prev) => prev.filter((_, i) => i !== index));
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
