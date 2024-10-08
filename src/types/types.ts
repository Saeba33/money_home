// Interfaces Financières //

export interface Person {
  name: string;
  percentage: number;
  revenues: Revenue[];
}

export interface Revenue {
  id: number;
  name: string;
  amount: number | undefined;
  assignedTo: string;
  comments: string;
}

export interface Saving {
  id: number;
  name: string;
  amount: number | undefined;
  assignedTo: string;
  comments: string;
}

export interface Expense {
  id: number;
  name: string;
  amount: number | undefined;
  assignedTo: string;
  comments: string;
}

export type NewExpense = Partial<Expense>;

export interface Contribution {
  name: string;
  contributionFoyer: number;
  personalExpenses: number;
  personalSavings: number;
  totalRevenue: number;
  balance: number;
  percentage: number;
}

export interface ContributionSummary {
  totalRevenues: number;
  totalExpenses: number;
  totalSavings: number;
  totalBalance: number;
  foyerExpenses: number;
  foyerSavings: number;
}

// Props de Composants //

export interface SavingItemProps {
  saving: Saving;
  index: number;
  isNew?: boolean;
}

export interface SectionHeaderProps {
  title: string;
  infoText: string;
  children: React.ReactNode;
  defaultOpenedSection?: boolean;
}

export interface InfoPopupProps {
  text: string;
  isOpen: boolean;
  onClose: () => void;
}

// Types de Contexte //

export interface AppContextType {
  // De usePeople
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  handleAddPerson: () => void;
  handleRemovePerson: (index: number) => void;
  handlePercentageChange: (index: number, value: number) => void;

  // De useExpenses
  expenses: Expense[];
  newExpense: NewExpense;
  updateNewExpense: (updatedExpense: Partial<Expense>) => void;
  addExpense: () => void;
  updateExpense: (expenseId: number, updatedExpense: Partial<Expense>) => void;
  deleteExpense: (expenseId: number) => void;

  // De useDistributionMode
  distributionMode: DistributionMode;
  setDistributionMode: (mode: DistributionMode) => void;

  // De useSavings
  savings: Saving[];
  newSaving: Saving;
  updateNewSaving: (updatedSaving: Partial<Saving>) => void;
  addSaving: () => void;
  updateSaving: (index: number, updatedSaving: Partial<Saving>) => void;
  deleteSaving: (index: number) => void;

  // De useRevenues
  revenues: Revenue[];
  newRevenue: Revenue;
  updateNewRevenue: (updatedRevenue: Partial<Revenue>) => void;
  addRevenue: () => void;
  updateRevenue: (revenueId: number, updatedRevenue: Partial<Revenue>) => void;
  deleteRevenue: (revenueId: number) => void;

  // De useContributions
  contributions: {
    contributions: Contribution[];
    summary: ContributionSummary;
    warning: string | null;
  };
}

// Types Divers //

export type DistributionMode = "equal" | "proportional" | "percentage";
