import { useState, useCallback } from "react";
import { Revenue } from "@/types/types";
import { INITIAL_NEW_REVENUE } from "@/constants";

export const useRevenues = () => {
  const [revenues, setRevenues] = useState<Revenue[]>([]);
  const [newRevenue, setNewRevenue] = useState<Revenue>(INITIAL_NEW_REVENUE);

  // Met à jour les détails du nouveau revenu
  const updateNewRevenue = useCallback((updatedRevenue: Partial<Revenue>) => {
    setNewRevenue((prev) => ({ ...prev, ...updatedRevenue }));
  }, []);

  // Ajoute un nouveau revenu
  const addRevenue = useCallback(() => {
    if (
      newRevenue.name &&
      newRevenue.amount !== undefined &&
      newRevenue.assignedTo
    ) {
      const revenueWithId = { ...newRevenue, id: Date.now() }; // Génération d'un ID unique
      setRevenues((prev) => [...prev, revenueWithId]);

      // Réinitialisation de l'état pour préparer la prochaine entrée
      setNewRevenue(INITIAL_NEW_REVENUE);
    }
  }, [newRevenue]);

  // Met à jour un revenu existant
  const updateRevenue = useCallback(
    (id: number, updatedRevenue: Partial<Revenue>) => {
      setRevenues((prev) =>
        prev.map((revenue) =>
          revenue.id === id ? { ...revenue, ...updatedRevenue } : revenue
        )
      );
    },
    []
  );

  // Supprime un revenu
  const deleteRevenue = useCallback((id: number) => {
    setRevenues((prev) => prev.filter((revenue) => revenue.id !== id));
  }, []);

  return {
    revenues,
    newRevenue,
    updateNewRevenue,
    addRevenue,
    updateRevenue,
    deleteRevenue,
  };
};
