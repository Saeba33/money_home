import { useMemo } from "react";
import {
  Person,
  Expense,
  Contribution,
  DistributionMode,
  Savings,
} from "../types/types";

export const useContributions = (
  people: Person[],
  expenses: Expense[],
  savings: Savings[],
  distributionMode: DistributionMode
): { contributions: Contribution[]; warning: string | null } => {
  return useMemo(() => {
    const foyerExpenses = expenses.filter(
      (expense) => expense.assignedTo === "foyer"
    );
    const foyerSavings = savings.filter(
      (saving) => saving.assignedTo === "foyer"
    );
    const totalFoyerExpenses = foyerExpenses.reduce(
      (sum, expense) => sum + (expense.amountMonthly || 0),
      0
    );
    const totalFoyerSavings = foyerSavings.reduce(
      (sum, saving) => sum + (saving.amount || 0),
      0
    );
    const totalFoyerCosts = totalFoyerExpenses + totalFoyerSavings;

    const foyerRevenues = people.flatMap((person) =>
      person.revenues.filter((revenue) => revenue.assignedTo === "foyer")
    );
    const totalFoyerRevenue = foyerRevenues.reduce(
      (sum, revenue) => sum + (revenue.amount || 0),
      0
    );
    const foyerRevenuePerPerson = totalFoyerRevenue / people.length;

    const totalRevenues =
      people.reduce(
        (sum, person) =>
          sum +
          person.revenues.reduce(
            (personSum, revenue) =>
              personSum +
              (revenue.assignedTo === "foyer" ? 0 : revenue.amount || 0),
            0
          ),
        0
      ) + totalFoyerRevenue;

    let warning: string | null = null;
    if (totalRevenues === 0 && distributionMode === "proportional") {
      warning =
        "Veuillez saisir un revenu pour utiliser le mode de répartition proportionnel.";
    }

    const contributions = people.map((person) => {
      const personalExpenses = expenses.filter(
        (expense) => expense.assignedTo === person.name
      );
      const personalSavings = savings.filter(
        (saving) => saving.assignedTo === person.name
      );
      const contributionPersonnelle = personalExpenses.reduce(
        (sum, expense) => sum + (expense.amountMonthly || 0),
        0
      );
      const personalSavingsAmount = personalSavings.reduce(
        (sum, saving) => sum + (saving.amount || 0),
        0
      );

      const personalRevenue = person.revenues.reduce(
        (sum, revenue) =>
          sum + (revenue.assignedTo === "foyer" ? 0 : revenue.amount || 0),
        0
      );
      const totalPersonRevenue = personalRevenue + foyerRevenuePerPerson;

      let contributionFoyer: number;
      let percentage: number;

      switch (distributionMode) {
        case "equal":
          contributionFoyer = totalFoyerCosts / people.length;
          percentage = 100 / people.length;
          break;
        case "proportional":
          if (totalRevenues === 0) {
            contributionFoyer = 0;
            percentage = 0;
          } else {
            contributionFoyer =
              (totalPersonRevenue / totalRevenues) * totalFoyerCosts;
            percentage = (totalPersonRevenue / totalRevenues) * 100;
          }
          break;
        case "percentage":
          contributionFoyer = (person.percentage / 100) * totalFoyerCosts;
          percentage = person.percentage;
          break;
        default:
          contributionFoyer = 0;
          percentage = 0;
      }

      const totalPersonalCosts =
        contributionFoyer + contributionPersonnelle + personalSavingsAmount;
      const balance = totalPersonRevenue - totalPersonalCosts;

      return {
        name: person.name,
        contributionFoyer: parseFloat(contributionFoyer.toFixed(2)),
        contributionPersonnelle: parseFloat(contributionPersonnelle.toFixed(2)),
        savingsAmount: parseFloat(personalSavingsAmount.toFixed(2)),
        totalRevenue: parseFloat(totalPersonRevenue.toFixed(2)),
        balance: parseFloat(balance.toFixed(2)),
        percentage: parseFloat(percentage.toFixed(2)),
      };
    });

    return { contributions, warning };
  }, [people, expenses, savings, distributionMode]);
};
