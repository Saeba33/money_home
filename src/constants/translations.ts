import { Budget, BudgetSummary } from "@/types/types";

export const summaryTranslations: Record<keyof BudgetSummary, string> = {
  totalGlobalIncome: "Revenus totaux",
  totalGlobalExpenses: "Dépenses totales",
  totalGlobalSavings: "Épargne totale",
  totalGlobalOutflows: "Dépenses et épargne totales",
  totalBalance: "Balance totale",
  totalFoyerIncome: "Revenus du foyer",
  totalFoyerExpenses: "Dépenses du foyer",
  totalFoyerSavings: "Épargne du foyer",
  totalFoyerOutflows: "Dépenses et épargne du foyer",
};

export const budgetTranslations: Record<keyof Budget, string> = {
  name: "Nom",
  personalIncome: "Revenus personnels",
  foyerIncome: "Revenus du foyer",
  totalIncome: "Revenus totaux",
  personalExpenses: "Dépenses personnelles",
  foyerExpenses: "Dépenses du foyer",
  totalExpenses: "Dépenses totales",
  personalSavings: "Épargne personnelle",
  foyerSavings: "Épargne du foyer",
  totalSavings: "Épargne totale",
  personalOutflows: "Dépenses et épargne personnelles",
  foyerOutflows: "Dépenses et épargne du foyer",
  totalOutflows: "Dépenses et épargne totales",
  balance: "Balance",
  percentage: "Pourcentage",
};

export const summaryKeys: (keyof BudgetSummary)[] = [
  "totalGlobalIncome",
  "totalGlobalExpenses",
  "totalGlobalSavings",
  "totalGlobalOutflows",
  "totalBalance",
];
