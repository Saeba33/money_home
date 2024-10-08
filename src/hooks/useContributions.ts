import { useMemo } from "react";
import {
  Person,
  Expense,
  Contribution,
  ContributionSummary,
  DistributionMode,
  Saving,
  Revenue,
} from "@/types/types";

export const useContributions = (
  people: Person[],
  expenses: Expense[],
  savings: Saving[],
  revenues: Revenue[],
  distributionMode: DistributionMode
): {
  contributions: Contribution[];
  summary: ContributionSummary;
  warning: string | null;
} => {
  return useMemo(() => {
    // Assurez-vous que revenues est un tableau
    const safeRevenues = Array.isArray(revenues) ? revenues : [];

    // Calculs des totaux
    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + (expense.amount || 0),
      0
    );
    const totalSavings = savings.reduce(
      (sum, saving) => sum + (saving.amount || 0),
      0
    );
    const totalRevenues = safeRevenues.reduce(
      (sum, revenue) => sum + (revenue.amount || 0),
      0
    );

    // Calcul des dépenses et épargnes du foyer
    const foyerExpenses = expenses.filter(
      (expense) => expense.assignedTo === "foyer"
    );
    const foyerSavings = savings.filter(
      (saving) => saving.assignedTo === "foyer"
    );
    const totalFoyerExpenses = foyerExpenses.reduce(
      (sum, expense) => sum + (expense.amount || 0),
      0
    );
    const totalFoyerSavings = foyerSavings.reduce(
      (sum, saving) => sum + (saving.amount || 0),
      0
    );
    const totalFoyerCosts = totalFoyerExpenses + totalFoyerSavings;

    // Calcul des revenus du foyer
    const foyerRevenues = safeRevenues.filter(
      (revenue) => revenue.assignedTo === "foyer"
    );
    const totalFoyerRevenue = foyerRevenues.reduce(
      (sum, revenue) => sum + (revenue.amount || 0),
      0
    );
    const foyerRevenuePerPerson =
      people.length > 0 ? totalFoyerRevenue / people.length : 0;

    let warning: string | null = null;
    if (totalRevenues === 0 && distributionMode === "proportional") {
      warning =
        "Veuillez saisir un revenu pour utiliser le mode de répartition proportionnel.";
    }

    const contributions = people.map((person) => {
      // Calculs spécifiques à la personne
      const personalExpenses = expenses.filter(
        (expense) => expense.assignedTo === person.name
      );
      const personalSavings = savings.filter(
        (saving) => saving.assignedTo === person.name
      );
      const personalRevenues = safeRevenues.filter(
        (revenue) => revenue.assignedTo === person.name
      );

      const totalPersonalExpenses = personalExpenses.reduce(
        (sum, expense) => sum + (expense.amount || 0),
        0
      );
      const totalPersonalSavings = personalSavings.reduce(
        (sum, saving) => sum + (saving.amount || 0),
        0
      );
      const totalPersonalRevenues = personalRevenues.reduce(
        (sum, revenue) => sum + (revenue.amount || 0),
        0
      );

      const totalPersonRevenue = totalPersonalRevenues + foyerRevenuePerPerson;

      // Calcul de la contribution au foyer selon le mode de distribution
      let contributionFoyer: number;
      let percentage: number;

      switch (distributionMode) {
        case "equal":
          contributionFoyer =
            people.length > 0 ? totalFoyerCosts / people.length : 0;
          percentage = people.length > 0 ? 100 / people.length : 0;
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
        contributionFoyer + totalPersonalExpenses + totalPersonalSavings;
      const balance = totalPersonRevenue - totalPersonalCosts;

      return {
        name: person.name,
        contributionFoyer: parseFloat(contributionFoyer.toFixed(2)),
        personalExpenses: parseFloat(totalPersonalExpenses.toFixed(2)),
        personalSavings: parseFloat(totalPersonalSavings.toFixed(2)),
        totalRevenue: parseFloat(totalPersonRevenue.toFixed(2)),
        balance: parseFloat(balance.toFixed(2)),
        percentage: parseFloat(percentage.toFixed(2)),
      };
    });

    // Résumé global
    const summary: ContributionSummary = {
      totalRevenues: parseFloat(totalRevenues.toFixed(2)),
      totalExpenses: parseFloat(totalExpenses.toFixed(2)),
      totalSavings: parseFloat(totalSavings.toFixed(2)),
      totalBalance: parseFloat(
        (totalRevenues - totalExpenses - totalSavings).toFixed(2)
      ),
      foyerExpenses: parseFloat(totalFoyerExpenses.toFixed(2)),
      foyerSavings: parseFloat(totalFoyerSavings.toFixed(2)),
    };

    return { contributions, summary, warning };
  }, [people, expenses, savings, revenues, distributionMode]);
};
