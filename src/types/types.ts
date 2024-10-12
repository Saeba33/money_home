// Types de base
export type DistributionMode = "égalitaire" | "proportionel" | "personnalisé";

// Interfaces pour les entités principales
export interface FinancialItem {
  id: number;
  name: string;
  amount: number | undefined;
  assignedTo: string;
  comments: string;
}

export interface Person {
  id: number;
  name: string;
  percentage: number;
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

export interface ExpandCollapseButtonProps {
  isExpanded: boolean;
  onClick: () => void;
  expandedText: string;
  collapsedText: string;
}

export interface ShowHideDetailsButtonProps {
  isExpanded: boolean;
  onClick: () => void;
  expandedText: string;
  collapsedText: string;
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

// Types pour le contexte de l'application
export interface AppContextType {
  // Gestion des personnes
  people: Person[];
  addPerson: () => void;
  updatePerson: (id: number, updatedPerson: Partial<Person>) => void;
  initiateDeletePerson: (person: Person) => void;
  confirmDeletePerson: (id: number) => void;
  cancelDeletePerson: () => void;
  updatePersonPercentage: (id: number, value: number) => void;
  percentageWarning: string | null;
  personToDelete: Person | null;

  // Gestion des dépenses
  expenses: Expense[];
  newExpense: Partial<Expense>;
  updateNewExpense: (updatedExpense: Partial<Expense>) => void;
  addExpense: () => void;
  updateExpense: (expenseId: number, updatedExpense: Partial<Expense>) => void;
  deleteExpense: (expenseId: number) => void;

  // Gestion du mode de distribution
  distributionMode: DistributionMode;
  setDistributionMode: (mode: DistributionMode) => void;

  // Gestion des épargnes
  savings: Saving[];
  newSaving: Saving;
  updateNewSaving: (updatedSaving: Partial<Saving>) => void;
  addSaving: () => void;
  updateSaving: (index: number, updatedSaving: Partial<Saving>) => void;
  deleteSaving: (index: number) => void;

  // Gestion des revenus
  income: Income[];
  newIncome: Income;
  updateNewIncome: (updatedIncome: Partial<Income>) => void;
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
