import {
  Budget,
  BudgetSummary,
  DistributionMode,
  Expense,
  Income,
  Person,
  Saving,
} from "@/types/types";
import { useMemo } from "react";

export const useBudget = (
  people: Person[],
  expenses: Expense[],
  savings: Saving[],
  income: Income[],
  distributionMode: DistributionMode
): {
  budgets: Budget[];
  summary: BudgetSummary;
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
    const totalGlobalOutflows = totalGlobalExpenses + totalGlobalSavings;

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
    const totalFoyerOutflows = totalFoyerExpenses + totalFoyerSavings;

    const foyerIncomePerPerson =
      people.length > 0 ? totalFoyerIncome / people.length : 0;

    let warning: string | null = null;
    if (totalGlobalIncome === 0 && distributionMode === "proportionnel") {
      warning =
        "Veuillez saisir un revenu pour utiliser le mode de répartition proportionnel.";
    }

    const budgets = people.map((person) => {
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
      const totalPersonalOutflows =
        totalPersonalExpenses + totalPersonalSavings;

      // Calcul de la part du foyer selon le mode de distribution
      let foyerOutflowsPart: number;
      let percentage: number;

      switch (distributionMode) {
        case "égalitaire":
          foyerOutflowsPart = totalFoyerOutflows / people.length;
          percentage = 100 / people.length;
          break;
        case "proportionnel":
          if (totalGlobalIncome === 0) {
            foyerOutflowsPart = 0;
            percentage = 0;
          } else {
            const personIncomeProportion =
              (totalPersonalIncome + foyerIncomePerPerson) / totalGlobalIncome;
            foyerOutflowsPart = personIncomeProportion * totalFoyerOutflows;
            percentage = personIncomeProportion * 100;
          }
          break;
        case "personnalisé":
          foyerOutflowsPart = (person.percentage / 100) * totalFoyerOutflows;
          percentage = person.percentage;
          break;
        default:
          foyerOutflowsPart = 0;
          percentage = 0;
      }

      const totalOutflowsPerPerson = totalPersonalOutflows + foyerOutflowsPart;
      const totalIncomePerPerson = totalPersonalIncome + foyerIncomePerPerson;
      const balance = totalIncomePerPerson - totalOutflowsPerPerson;

      // Calcul des dépenses et épargnes du foyer en évitant la division par zéro
      const foyerExpensesPart =
        totalFoyerOutflows !== 0
          ? (foyerOutflowsPart * totalFoyerExpenses) / totalFoyerOutflows
          : 0;
      const foyerSavingsPart =
        totalFoyerOutflows !== 0
          ? (foyerOutflowsPart * totalFoyerSavings) / totalFoyerOutflows
          : 0;

      return {
        name: person.name,
        personalIncome: parseFloat(totalPersonalIncome.toFixed(2)),
        foyerIncome: parseFloat(foyerIncomePerPerson.toFixed(2)),
        totalIncome: parseFloat(totalIncomePerPerson.toFixed(2)),
        personalExpenses: parseFloat(totalPersonalExpenses.toFixed(2)),
        foyerExpenses: parseFloat(foyerExpensesPart.toFixed(2)),
        totalExpenses: parseFloat(
          (totalPersonalExpenses + foyerExpensesPart).toFixed(2)
        ),
        personalSavings: parseFloat(totalPersonalSavings.toFixed(2)),
        foyerSavings: parseFloat(foyerSavingsPart.toFixed(2)),
        totalSavings: parseFloat(
          (totalPersonalSavings + foyerSavingsPart).toFixed(2)
        ),
        personalOutflows: parseFloat(totalPersonalOutflows.toFixed(2)),
        foyerOutflows: parseFloat(foyerOutflowsPart.toFixed(2)),
        totalOutflows: parseFloat(totalOutflowsPerPerson.toFixed(2)),
        balance: parseFloat(balance.toFixed(2)),
        percentage: parseFloat(percentage.toFixed(2)),
      };
    });

    const summary: BudgetSummary = {
      totalGlobalIncome: parseFloat(totalGlobalIncome.toFixed(2)),
      totalFoyerIncome: parseFloat(totalFoyerIncome.toFixed(2)),
      totalGlobalExpenses: parseFloat(totalGlobalExpenses.toFixed(2)),
      totalFoyerExpenses: parseFloat(totalFoyerExpenses.toFixed(2)),
      totalGlobalSavings: parseFloat(totalGlobalSavings.toFixed(2)),
      totalFoyerSavings: parseFloat(totalFoyerSavings.toFixed(2)),
      totalGlobalOutflows: parseFloat(totalGlobalOutflows.toFixed(2)),
      totalFoyerOutflows: parseFloat(totalFoyerOutflows.toFixed(2)),
      totalBalance: parseFloat(
        (totalGlobalIncome - totalGlobalOutflows).toFixed(2)
      ),
    };

    return { budgets, summary, warning };
  }, [people, expenses, savings, income, distributionMode]);
};
