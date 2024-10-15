// Types de base
export type DistributionMode = "égalitaire" | "proportionnel" | "personnalisé";

// Interfaces pour les entités principales
export interface Person {
  id: number;
  name: string;
  percentage: number;
}

export interface FinancialItem {
  id: number;
  name: string;
  amount: number | undefined;
  assignedTo: "foyer" | string;
  comments: string;
}

export type Income = FinancialItem;
export type Expense = FinancialItem;
export type Saving = FinancialItem;

// Interfaces pour le budget et résumés
export interface Budget {
  name: string;
  personalIncome: number;
  foyerIncome: number;
  totalIncome: number;
  personalExpenses: number;
  foyerExpenses: number;
  totalExpenses: number;
  personalSavings: number;
  foyerSavings: number;
  totalSavings: number;
  personalOutflows: number;
  foyerOutflows: number;
  totalOutflows: number;
  balance: number;
  percentage: number;
}

export interface BudgetSummary {
  totalGlobalIncome: number;
  totalFoyerIncome: number;
  totalGlobalExpenses: number;
  totalFoyerExpenses: number;
  totalGlobalSavings: number;
  totalFoyerSavings: number;
  totalGlobalOutflows: number;
  totalFoyerOutflows: number;
  totalBalance: number;
}

// Interfaces pour les composants UI
export interface SectionHeaderProps {
  title: string;
  infoTextKey: InfoTextKey;
  children: React.ReactNode;
  defaultOpenedSection?: boolean;
}

export interface InfoPopupProps {
  text: InfoText;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface DeletePersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  person: Person;
  financialItems: (FinancialItem & {
    type: "Dépense" | "Épargne" | "Revenu";
  })[];
  onConfirm: (action: "delete" | "reassign") => void;
}

export interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (exportBudgetManager: boolean, exportBudgetChart: boolean) => void;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: {
      name: string;
      value: number;
    };
  }>;
  label?: string;
}

// Types pour les fonctions
export interface ExportToPDFFunction {
  (exportBudgetManager: boolean, exportBudgetChart: boolean): void;
}

export type UseLocalStorageReturn<T> = [
  T,
  (value: T | ((val: T) => T)) => void,
  boolean,
  Error | null
];

// Types pour le contexte de l'application
export interface AppContextType {
  // Gestion des personnes
  people: Person[];
  addPerson: () => void;
  updatePerson: (id: number, updatedPerson: Partial<Person>) => void;
  prepareDeletePerson: (person: Person) => void;
  executeDeletePerson: (id: number) => void;
  cancelDeletePerson: () => void;
  updatePersonPercentage: (id: number, value: number) => void;
  percentageWarning: string | null;
  personToDelete: Person | null;

  // Gestion des dépenses
  expenses: Expense[];
  draftExpense: Partial<Expense>;
  updateDraftExpense: (updatedExpense: Partial<Expense>) => void;
  addExpense: () => void;
  updateExpense: (expenseId: number, updatedExpense: Partial<Expense>) => void;
  deleteExpense: (expenseId: number) => void;

  // Gestion du mode de distribution
  distributionMode: DistributionMode;
  setDistributionMode: (mode: DistributionMode) => void;

  // Gestion des épargnes
  savings: Saving[];
  draftSaving: Saving;
  updateDraftSaving: (updatedSaving: Partial<Saving>) => void;
  addSaving: () => void;
  updateSaving: (index: number, updatedSaving: Partial<Saving>) => void;
  deleteSaving: (index: number) => void;

  // Gestion des revenus
  income: Income[];
  draftIncome: Income;
  updateDraftIncome: (updatedIncome: Partial<Income>) => void;
  addIncome: () => void;
  updateIncome: (incomeId: number, updatedIncome: Partial<Income>) => void;
  deleteIncome: (incomeId: number) => void;

  // Gestion du budget
  budgets: {
    budgets: Budget[];
    summary: BudgetSummary;
    warning: string | null;
  };

  isLoading: boolean;
  error: Error | null;

}

// Types pour les textes d'information
export interface InfoText {
  description: string;
  example?: string;
}

export interface InfoTexts {
  PEOPLE: InfoText;
  INCOME: InfoText;
  SAVINGS: InfoText;
  EXPENSES: InfoText;
  DISTRIBUTION: InfoText;
  BUDGET: InfoText;
  CHARTS: InfoText;
  ANALYSE: InfoText;
}

export type InfoTextKey = keyof InfoTexts;


import {
  ChartData as ChartJSData,
  ChartOptions as ChartJSOptions,
} from "chart.js";

export interface BudgetChartsProps {}

export type ChartData = ChartJSData<"pie" | "bar" | "line", number[], string>;

export type CustomChartOptions = ChartJSOptions<"pie" | "bar" | "line">;