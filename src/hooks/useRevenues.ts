import { useState, useCallback } from "react";
import { Revenue, Person } from "../types/types";
import { INITIAL_NEW_REVENUE } from "../constants";

export const useRevenues = (
  people: Person[],
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>
) => {
  const [newRevenue, setNewRevenue] = useState<Revenue>(INITIAL_NEW_REVENUE);

  const addOrUpdateRevenue = useCallback(() => {
    if (newRevenue.name && newRevenue.amount !== undefined) {
      setPeople((prevPeople) => {
        if (newRevenue.assignedTo === "foyer") {
          return prevPeople.map((person, index) => ({
            ...person,
            revenues:
              index === 0
                ? [
                    ...person.revenues.filter(
                      (rev) => rev.name !== newRevenue.name
                    ),
                    newRevenue,
                  ]
                : person.revenues.filter((rev) => rev.name !== newRevenue.name),
          }));
        } else {
          return prevPeople.map((person) =>
            person.name === newRevenue.assignedTo
              ? {
                  ...person,
                  revenues: updatePersonRevenues(person.revenues, newRevenue),
                }
              : person
          );
        }
      });

      setNewRevenue(INITIAL_NEW_REVENUE);
    }
  }, [newRevenue, setPeople]);

  const deleteRevenue = useCallback(
    (personIndex: number, revenueIndex: number) => {
      setPeople((prevPeople) =>
        prevPeople.map((person, index) =>
          index === personIndex
            ? {
                ...person,
                revenues: person.revenues.filter((_, i) => i !== revenueIndex),
              }
            : person
        )
      );
    },
    [setPeople]
  );

  return {
    newRevenue,
    setNewRevenue,
    addOrUpdateRevenue,
    deleteRevenue,
  };
};

const updatePersonRevenues = (
  revenues: Revenue[],
  newRevenue: Revenue
): Revenue[] => {
  const existingIndex = revenues.findIndex(
    (rev) => rev.name === newRevenue.name
  );
  if (existingIndex !== -1) {
    return revenues.map((rev, index) =>
      index === existingIndex ? newRevenue : rev
    );
  }
  return [...revenues, newRevenue];
};
