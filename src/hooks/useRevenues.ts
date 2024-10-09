import { useCallback } from "react";
import { Revenue } from "@/types/types";
import { INITIAL_NEW_REVENUE } from "@/constants";
import {
  showSuccessNotification,
  showWarningNotification,
  showDeleteNotification,
} from "@/components/ui/Notifications";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export const useRevenues = () => {
  const [revenues, setRevenues] = useLocalStorage<Revenue[]>("revenues", []);
  const [newRevenue, setNewRevenue] = useLocalStorage<Revenue>(
    "newRevenue",
    INITIAL_NEW_REVENUE
  );

  const updateNewRevenue = useCallback(
    (updatedRevenue: Partial<Revenue>) => {
      setNewRevenue((prev) => ({ ...prev, ...updatedRevenue }));
    },
    [setNewRevenue]
  );

  const addRevenue = useCallback(() => {
    if (!newRevenue.name || newRevenue.amount === undefined) {
      const missingFields = [];
      if (!newRevenue.name) missingFields.push("nom du revenu");
      if (newRevenue.amount === undefined) missingFields.push("montant");
      showWarningNotification(
        `Veuillez renseigner : ${missingFields.join(", ")}`
      );
      return;
    }

    const revenueWithId = { ...newRevenue, id: Date.now() };
    setRevenues((prev) => [...prev, revenueWithId]);
    setNewRevenue(INITIAL_NEW_REVENUE);
    showSuccessNotification("Revenu ajouté avec succès");
  }, [newRevenue, setRevenues, setNewRevenue]);

  const updateRevenue = useCallback(
    (id: number, updatedRevenue: Partial<Revenue>) => {
      setRevenues((prev) =>
        prev.map((revenue) =>
          revenue.id === id ? { ...revenue, ...updatedRevenue } : revenue
        )
      );
    },
    [setRevenues]
  );

  const deleteRevenue = useCallback(
    (id: number) => {
      setRevenues((prev) => prev.filter((revenue) => revenue.id !== id));
      showDeleteNotification("Revenu supprimé");
    },
    [setRevenues]
  );

  return {
    revenues,
    newRevenue,
    updateNewRevenue,
    addRevenue,
    updateRevenue,
    deleteRevenue,
  };
};
