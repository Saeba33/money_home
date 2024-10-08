import { useState } from "react";
import { Person } from "@/types/types";
import { INITIAL_PEOPLE } from "@/constants";

export const usePeople = () => {
  const [people, setPeople] = useState<Person[]>(INITIAL_PEOPLE);

  const handleAddPerson = () => {
    const totalPeople = people.length + 1;
    const newPerson = {
      name: `Personne ${totalPeople}`,
      percentage: 100 / totalPeople,
      revenues: [],
    };

    const updatedPeople = [...people, newPerson];
    setPeople(updatedPeople);
    recalculatePercentages(updatedPeople);
  };

  const handleRemovePerson = (index: number) => {
    if (people.length > 1) {
      const updatedPeople = people.filter((_, i) => i !== index);
      setPeople(updatedPeople);
      recalculatePercentages(updatedPeople);
    }
  };

  const handlePercentageChange = (index: number, value: number) => {
    const adjustedPeople = [...people];
    adjustedPeople[index].percentage = value;

    const remainingPercentage = 100 - value;

    adjustedPeople.forEach((person, i) => {
      if (i !== index) {
        person.percentage = remainingPercentage / (adjustedPeople.length - 1);
      }
    });

    setPeople(adjustedPeople);
  };

  const recalculatePercentages = (updatedPeople: Person[] = people) => {
    const totalPercentage = 100 / updatedPeople.length;
    setPeople(
      updatedPeople.map((person) => ({
        ...person,
        percentage: totalPercentage,
      }))
    );
  };

  return {
    people,
    setPeople,
    handleAddPerson,
    handleRemovePerson,
    handlePercentageChange,
  };
};
