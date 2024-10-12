import {
  Contribution,
  ContributionSummary,
  DistributionMode,
  Expense,
  Income,
  Person,
  Saving,
} from "@/types/types";
import { useMemo } from "react";

export const useContributions = (
  people: Person[],
  expenses: Expense[],
  savings: Saving[],
  income: Income[],
  distributionMode: DistributionMode
): {
  contributions: Contribution[];
  summary: ContributionSummary;
  warning: string | null;
} => {
  return useMemo(() => {
    const safeIncome = Array.isArray(income) ? income : [];

    // Calculs globaux
    const totalGlobalIncome = safeIncome.reduce(
      (sum, income) => sum + (income.amount || 0),
      0
    );
    const totalGlobalExpenses = expenses.reduce(
      (sum, expense) => sum + (expense.amount || 0),
      0
    );
    const totalGlobalSavings = savings.reduce(
      (sum, saving) => sum + (saving.amount || 0),
      0
    );
    const totalGlobalContributions = totalGlobalExpenses + totalGlobalSavings;

    // Calculs pour le foyer
    const foyerIncome = safeIncome.filter(
      (income) => income.assignedTo === "foyer"
    );
    const foyerExpenses = expenses.filter(
      (expense) => expense.assignedTo === "foyer"
    );
    const foyerSavings = savings.filter(
      (saving) => saving.assignedTo === "foyer"
    );

    const totalFoyerIncome = foyerIncome.reduce(
      (sum, income) => sum + (income.amount || 0),
      0
    );
    const totalFoyerExpenses = foyerExpenses.reduce(
      (sum, expense) => sum + (expense.amount || 0),
      0
    );
    const totalFoyerSavings = foyerSavings.reduce(
      (sum, saving) => sum + (saving.amount || 0),
      0
    );
    const totalFoyerContributions = totalFoyerExpenses + totalFoyerSavings;

    const foyerIncomePerPerson =
      people.length > 0 ? totalFoyerIncome / people.length : 0;

    let warning: string | null = null;
    if (totalGlobalIncome === 0 && distributionMode === "proportionel") {
      warning =
        "Veuillez saisir un revenu pour utiliser le mode de répartition proportionnel.";
    }

    const contributions = people.map((person) => {
      // Calculs personnels
      const personalIncome = safeIncome.filter(
        (income) => income.assignedTo === person.name
      );
      const personalExpenses = expenses.filter(
        (expense) => expense.assignedTo === person.name
      );
      const personalSavings = savings.filter(
        (saving) => saving.assignedTo === person.name
      );

      const totalPersonalIncome = personalIncome.reduce(
        (sum, income) => sum + (income.amount || 0),
        0
      );
      const totalPersonalExpenses = personalExpenses.reduce(
        (sum, expense) => sum + (expense.amount || 0),
        0
      );
      const totalPersonalSavings = personalSavings.reduce(
        (sum, saving) => sum + (saving.amount || 0),
        0
      );
      const totalPersonalContributions =
        totalPersonalExpenses + totalPersonalSavings;

      // Calcul de la part du foyer selon le mode de distribution
      let foyerContributionPart: number;
      let percentage: number;

      switch (distributionMode) {
        case "égalitaire":
          foyerContributionPart = totalFoyerContributions / people.length;
          percentage = 100 / people.length;
          break;
        case "proportionel":
          if (totalGlobalIncome === 0) {
            foyerContributionPart = 0;
            percentage = 0;
          } else {
            const personIncomeProportion =
              (totalPersonalIncome + foyerIncomePerPerson) / totalGlobalIncome;
            foyerContributionPart =
              personIncomeProportion * totalFoyerContributions;
            percentage = personIncomeProportion * 100;
          }
          break;
        case "personnalisé":
          foyerContributionPart =
            (person.percentage / 100) * totalFoyerContributions;
          percentage = person.percentage;
          break;
        default:
          foyerContributionPart = 0;
          percentage = 0;
      }

      const totalContributionPerPerson =
        totalPersonalContributions + foyerContributionPart;
      const totalIncomePerPerson = totalPersonalIncome + foyerIncomePerPerson;
      const balance = totalIncomePerPerson - totalContributionPerPerson;

      return {
        name: person.name,
        personalIncome: parseFloat(totalPersonalIncome.toFixed(2)),
        foyerIncome: parseFloat(foyerIncomePerPerson.toFixed(2)),
        totalIncome: parseFloat(totalIncomePerPerson.toFixed(2)),
        personalExpenses: parseFloat(totalPersonalExpenses.toFixed(2)),
        foyerExpenses: parseFloat(
          (
            (foyerContributionPart * totalFoyerExpenses) /
            totalFoyerContributions
          ).toFixed(2)
        ),
        totalExpenses: parseFloat(
          (
            totalPersonalExpenses +
            (foyerContributionPart * totalFoyerExpenses) /
              totalFoyerContributions
          ).toFixed(2)
        ),
        personalSavings: parseFloat(totalPersonalSavings.toFixed(2)),
        foyerSavings: parseFloat(
          (
            (foyerContributionPart * totalFoyerSavings) /
            totalFoyerContributions
          ).toFixed(2)
        ),
        totalSavings: parseFloat(
          (
            totalPersonalSavings +
            (foyerContributionPart * totalFoyerSavings) /
              totalFoyerContributions
          ).toFixed(2)
        ),
        personalContributions: parseFloat(
          totalPersonalContributions.toFixed(2)
        ),
        foyerContributions: parseFloat(foyerContributionPart.toFixed(2)),
        totalContributions: parseFloat(totalContributionPerPerson.toFixed(2)),
        balance: parseFloat(balance.toFixed(2)),
        percentage: parseFloat(percentage.toFixed(2)),
      };
    });

    const summary: ContributionSummary = {
      totalGlobalIncome: parseFloat(totalGlobalIncome.toFixed(2)),
      totalFoyerIncome: parseFloat(totalFoyerIncome.toFixed(2)),
      totalGlobalExpenses: parseFloat(totalGlobalExpenses.toFixed(2)),
      totalFoyerExpenses: parseFloat(totalFoyerExpenses.toFixed(2)),
      totalGlobalSavings: parseFloat(totalGlobalSavings.toFixed(2)),
      totalFoyerSavings: parseFloat(totalFoyerSavings.toFixed(2)),
      totalGlobalContributions: parseFloat(totalGlobalContributions.toFixed(2)),
      totalFoyerContributions: parseFloat(totalFoyerContributions.toFixed(2)),
      totalBalance: parseFloat(
        (totalGlobalIncome - totalGlobalContributions).toFixed(2)
      ),
    };

    return { contributions, summary, warning };
  }, [people, expenses, savings, income, distributionMode]);
};
