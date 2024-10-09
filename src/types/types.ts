// Interfaces Financières //

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

export interface InfoText {
  description: string;
  example?: string;
}

export interface InfoTexts {
  PEOPLE: InfoText;
  REVENUES: InfoText;
  SAVINGS: InfoText;
  EXPENSES: InfoText;
  DISTRIBUTION: InfoText;
  CONTRIBUTIONS: InfoText;
  CHARTS: InfoText;
  ANALYSE: InfoText;
}

export type InfoTextKey = keyof InfoTexts;

// Props de Composants //

export interface SavingItemProps {
  saving: Saving;
  index: number;
  isNew?: boolean;
}

export interface ContributionDetailsProps {
  name: string;
  contribution: Contribution;
  revenues: Revenue[];
  expenses: Expense[];
  savings: Saving[];
}

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
}

export interface ContributionChartProps {
  contributions: Contribution[];
  summary: ContributionSummary;
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


// Types de Contexte //

export interface AppContextType {
  // De usePeople
  people: Person[];
  addPerson: () => void;
  updatePerson: (id: number, updatedPerson: Partial<Person>) => void;
  deletePerson: (id: number) => void;
  updatePersonPercentage: (id: number, value: number) => void;
  percentageWarning: string | null;

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

export type DistributionMode = "égalitaire" | "proportionel" | "personnalisé";
