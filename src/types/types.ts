export interface Person {
  name: string;
  percentage: number;
  revenues: Revenue[];
}

export interface Revenue {
  name: string;
  amount: number | undefined;
  assignedTo: string;
}

export interface Expense {
  name: string;
  amountMonthly: number | undefined;
  amountYearly: number | undefined;
  assignedTo: string;
  date: string;
}

export interface CustomExpense {
  name: string;
  amountMonthly?: number;
  amountYearly?: number;
  date?: string;
  assignedTo: string;
}

export interface Contribution {
  name: string;
  percentage: number;
  contributionFoyer: string;
  contributionPersonnelle: string;
}
