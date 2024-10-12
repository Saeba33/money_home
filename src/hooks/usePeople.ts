import { useCallback, useState } from "react";
import { Person } from "@/types/types";
import { useLocalStorage } from "./useLocalStorage";

export const usePeople = () => {
  const [people, setPeople, isLoading] = useLocalStorage<Person[]>("people", [
    { id: 1, name: "Personne 1", percentage: 100 },
  ]);
  const [percentageWarning, setPercentageWarning] = useLocalStorage<
    string | null
  >("percentageWarning", null);
  const [personToDelete, setPersonToDelete] = useState<Person | null>(null);

  const recalculatePercentages = useCallback((updatedPeople: Person[]) => {
    const totalPercentage = 100;
    const newPercentage = totalPercentage / updatedPeople.length;
    return updatedPeople.map((person) => ({
      ...person,
      percentage: newPercentage,
    }));
  }, []);

  const addPerson = useCallback(() => {
    const newPersonId = Math.max(0, ...people.map((p) => p.id)) + 1;
    const newPerson: Person = {
      id: newPersonId,
      name: `Personne ${people.length + 1}`,
      percentage: 0,
    };
    const updatedPeople = [...people, newPerson];
    const recalculatedPeople = recalculatePercentages(updatedPeople);
    setPeople(recalculatedPeople);
    setPercentageWarning(null);
  }, [people, recalculatePercentages, setPeople, setPercentageWarning]);

  const updatePerson = useCallback(
    (id: number, updatedPerson: Partial<Person>) => {
      setPeople((prev) =>
        prev.map((person) =>
          person.id === id ? { ...person, ...updatedPerson } : person
        )
      );
    },
    [setPeople]
  );

  const initiateDeletePerson = useCallback((person: Person) => {
    setPersonToDelete(person);
  }, []);

  const confirmDeletePerson = useCallback(
    (id: number) => {
      if (people.length > 1) {
        const updatedPeople = people.filter((person) => person.id !== id);
        const recalculatedPeople = recalculatePercentages(updatedPeople);
        setPeople(recalculatedPeople);
        setPercentageWarning(null);
      }
      setPersonToDelete(null);
    },
    [people, recalculatePercentages, setPeople, setPercentageWarning]
  );

  const cancelDeletePerson = useCallback(() => {
    setPersonToDelete(null);
  }, []);

  const updatePersonPercentage = useCallback(
    (id: number, value: number) => {
      let adjustedPeople: Person[];

      if (people.length === 2) {
        adjustedPeople = people.map((person) => ({
          ...person,
          percentage: person.id === id ? value : 100 - value,
        }));
      } else {
        adjustedPeople = people.map((person) =>
          person.id === id ? { ...person, percentage: value } : person
        );
      }

      const totalPercentage = adjustedPeople.reduce(
        (sum, person) => sum + person.percentage,
        0
      );

      if (totalPercentage > 100) {
        setPercentageWarning(
          "Avertissement : la contribution totale du foyer dépasse 100%."
        );
      } else {
        setPercentageWarning(null);
      }

      setPeople(adjustedPeople);
    },
    [people, setPeople, setPercentageWarning]
  );

  return {
    people,
    addPerson,
    updatePerson,
    initiateDeletePerson,
    confirmDeletePerson,
    cancelDeletePerson,
    updatePersonPercentage,
    percentageWarning,
    personToDelete,
    isLoading,
  };
};
