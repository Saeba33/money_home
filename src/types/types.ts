export interface Person {
  name: string;
  percentage: number;
  revenues: Revenue[];
}

export interface Revenue {
  name: string;
  amount: number | undefined;
  assignedTo: string;
  comments: string;
}

export interface Savings {
  name: string;
  amount: number | undefined;
  assignedTo: string;
  comments: string;
}
export interface Expense {
  name: string;
  amountMonthly: number | undefined;
  amountYearly: number | undefined;
  assignedTo: string;
  comments: string;
}

export type NewExpense = Partial<Expense>;

export interface Contribution {
  name: string;
  percentage: number;
  contributionFoyer: number;
  contributionPersonnelle: number;
  totalRevenue: number;
  balance: number;
}

export interface AppContextType {
  // De usePeople
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  handleAddPerson: () => void;
  handleRemovePerson: (index: number) => void;
  handlePercentageChange: (index: number, value: number) => void;

  // De useExpenses
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  newExpense: NewExpense;
  setNewExpense: React.Dispatch<React.SetStateAction<NewExpense>>;
  handleExpenseChange: (
    index: number,
    field: keyof Expense,
    value: string
  ) => void;
  handleDeleteExpense: (index: number) => void;
  handleNewExpenseChange: (
    field: keyof NewExpense,
    value: string | number
  ) => void;
  addNewExpense: () => void;

  // De useDistributionMode
  distributionMode: DistributionMode;
  setDistributionMode: (mode: DistributionMode) => void;

  // De useSavings
  savings: Savings[];
  newSaving: Savings;
  updateNewSaving: (updatedSaving: Savings) => void;
  addSaving: () => void;
  updateSaving: (index: number, updatedSaving: Savings) => void;
  deleteSaving: (index: number) => void;

  // De useRevenues
  newRevenue: Revenue;
  setNewRevenue: React.Dispatch<React.SetStateAction<Revenue>>;
  addOrUpdateRevenue: () => void;
  deleteRevenue: (personIndex: number, revenueIndex: number) => void;

  // De useContributions
  contributions: {
    contributions: Contribution[];
    warning: string | null;
  };
}


export interface SectionHeaderProps {
  title: string;
  infoText: string;
  children: React.ReactNode;
  defaultOpenedSection?: boolean;
}

export type DistributionMode = "equal" | "proportional" | "percentage";

export interface InfoPopupProps {
  text: string;
  isOpen: boolean;
  onClose: () => void;
}