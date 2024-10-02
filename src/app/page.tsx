"use client";

import React, { useState } from "react";
import {
  Person,
  Revenue,
  Expense,
  CustomExpense,
  Contribution,
} from "../types/types";
import PeopleManager from "@/components/PeopleManager";
import IncomeManager from "@/components/IncomeManager";
import ExpenseManager from "@/components/ExpenseManager";
import ContributionManager from "@/components/ContributionManager";
import DistributionMode from "@/components/DistributionMode";

const Home: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([
    { name: "Personne 1", percentage: 100, revenues: [] },
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      name: "Loyer",
      amountMonthly: undefined,
      amountYearly: undefined,
      assignedTo: "foyer",
      date: "",
    },
    {
      name: "Eau",
      amountMonthly: undefined,
      amountYearly: undefined,
      assignedTo: "foyer",
      date: "",
    },
    {
      name: "Électricité",
      amountMonthly: undefined,
      amountYearly: undefined,
      assignedTo: "foyer",
      date: "",
    },
    {
      name: "Internet",
      amountMonthly: undefined,
      amountYearly: undefined,
      assignedTo: "foyer",
      date: "",
    },
  ]);

  const [customExpense, setCustomExpense] = useState<CustomExpense>({
    name: "",
    amountMonthly: undefined,
    amountYearly: undefined,
    date: "",
    assignedTo: "foyer",
  });

  const [newRevenue, setNewRevenue] = useState<Revenue>({
    name: "",
    amount: undefined,
    assignedTo: "foyer",
  });

  const [distributionMode, setDistributionMode] = useState("equal");

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

  const handleAddOrUpdateRevenue = () => {
    if (newRevenue.name && newRevenue.amount !== undefined) {
      const assignedTo =
        newRevenue.assignedTo === "foyer" ? "foyer" : newRevenue.assignedTo;

      if (assignedTo === "foyer") {
        // Ajouter le revenu du foyer à toutes les personnes une seule fois
        const updatedPeople = people.map((person) => ({
          ...person,
          revenues: person.revenues.filter(
            (rev) => rev.name !== newRevenue.name
          ),
        }));
        updatedPeople[0].revenues.push({ ...newRevenue, assignedTo: "foyer" });
        setPeople(updatedPeople);
      } else {
        // Ajouter ou mettre à jour le revenu pour la personne spécifique
        setPeople((prevPeople) =>
          prevPeople.map((person) => {
            if (person.name === assignedTo) {
              const existingRevenueIndex = person.revenues.findIndex(
                (rev) => rev.name === newRevenue.name
              );
              if (existingRevenueIndex !== -1) {
                // Mettre à jour le revenu existant
                const updatedRevenues = [...person.revenues];
                updatedRevenues[existingRevenueIndex] = { ...newRevenue };
                return { ...person, revenues: updatedRevenues };
              } else {
                // Ajouter un nouveau revenu
                return {
                  ...person,
                  revenues: [...person.revenues, { ...newRevenue }],
                };
              }
            }
            return person;
          })
        );
      }

      setNewRevenue({ name: "", amount: undefined, assignedTo: "foyer" });
    }
  };

  const handleDeleteRevenue = (personIndex: number, revenueIndex: number) => {
    setPeople(
      people.map((person, i) => {
        if (i === personIndex) {
          return {
            ...person,
            revenues: person.revenues.filter(
              (_, rIndex) => rIndex !== revenueIndex
            ),
          };
        }
        return person;
      })
    );
  };

  const handleExpenseChange = (
    index: number,
    field: keyof Expense,
    value: string
  ) => {
    const updatedExpenses = expenses.map((expense, i) => {
      if (i === index) {
        return {
          ...expense,
          [field]: field.includes("amount") ? Number(value) : value,
        };
      }
      return expense;
    });
    setExpenses(updatedExpenses);
  };

  const handleDeleteExpense = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const handleCustomExpenseChange = (
    field: keyof CustomExpense,
    value: string
  ) => {
    setCustomExpense((prev) => ({ ...prev, [field]: value }));
  };

  const calculateContributions = (): Contribution[] => {
    const totalExpensesFoyer = expenses
      .filter((expense) => expense.assignedTo === "foyer")
      .reduce((total, expense) => total + (expense.amountMonthly || 0), 0);

    const foyerRevenue = people[0].revenues
      .filter((rev) => rev.assignedTo === "foyer")
      .reduce((sum, rev) => sum + (rev.amount || 0), 0);

    const totalRevenuesForAll =
      people.reduce(
        (sum, p) =>
          sum +
          p.revenues
            .filter((r) => r.assignedTo !== "foyer")
            .reduce((s, r) => s + (r.amount || 0), 0),
        0
      ) + foyerRevenue;

    const foyerRevenuePerPerson = foyerRevenue / people.length;

    return people.map((person) => {
      const personalRevenue = person.revenues
        .filter((rev) => rev.assignedTo !== "foyer")
        .reduce((sum, rev) => sum + (rev.amount || 0), 0);

      const totalPersonRevenue = personalRevenue + foyerRevenuePerPerson;

      const totalExpensesPersonnelles = expenses
        .filter((expense) => expense.assignedTo === person.name)
        .reduce((total, expense) => total + (expense.amountMonthly || 0), 0);

      let contributionFoyer: number;
      let percentage: number;

      switch (distributionMode) {
        case "equal":
          contributionFoyer = totalExpensesFoyer / people.length;
          percentage = 100 / people.length;
          break;
        case "proportional":
          contributionFoyer =
            (totalPersonRevenue / totalRevenuesForAll) * totalExpensesFoyer;
          percentage = (totalPersonRevenue / totalRevenuesForAll) * 100;
          break;
        case "percentage":
          contributionFoyer = (person.percentage / 100) * totalExpensesFoyer;
          percentage = person.percentage;
          break;
        default:
          contributionFoyer = 0;
          percentage = 0;
      }

      return {
        name: person.name,
        contributionFoyer: contributionFoyer.toFixed(2),
        contributionPersonnelle: totalExpensesPersonnelles.toFixed(2),
        percentage: percentage.toFixed(2),
      };
    });
  };

  const contributions = calculateContributions();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Gestion des Salaires et Dépenses
      </h1>

      <PeopleManager
        people={people}
        setPeople={setPeople}
        handleAddPerson={handleAddPerson}
        handleRemovePerson={handleRemovePerson}
        handlePercentageChange={handlePercentageChange}
      />

      <DistributionMode
        distributionMode={distributionMode}
        setDistributionMode={setDistributionMode}
      />

      <IncomeManager
        people={people}
        setPeople={setPeople}
        newRevenue={newRevenue}
        setNewRevenue={setNewRevenue}
        handleAddOrUpdateRevenue={handleAddOrUpdateRevenue}
        handleDeleteRevenue={handleDeleteRevenue}
      />

      <ExpenseManager
        expenses={expenses}
        setExpenses={setExpenses}
        customExpense={customExpense}
        setCustomExpense={setCustomExpense}
        people={people}
        handleExpenseChange={handleExpenseChange}
        handleDeleteExpense={handleDeleteExpense}
        handleCustomExpenseChange={handleCustomExpenseChange}
      />

      <ContributionManager
        contributions={contributions}
        distributionMode={distributionMode}
      />
    </div>
  );
};

export default Home;
