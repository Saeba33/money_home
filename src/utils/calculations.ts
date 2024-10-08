import { Expense, Person, Revenue } from "../types/types";

export const calculateTotalExpenses = (expenses: Expense[]): number => {
  return expenses.reduce(
    (total, expense) => total + (expense.amount || 0),
    0
  );
};

export const calculateTotalRevenues = (people: Person[]): number => {
  return people.reduce(
    (total, person) =>
      total +
      person.revenues.reduce(
        (sum: number, revenue: Revenue) => sum + (revenue.amount || 0),
        0
      ),
    0
  );
};

export const calculatePersonalContribution = (
  personalRevenue: number,
  totalRevenue: number,
  totalExpenses: number
): number => {
  return (personalRevenue / totalRevenue) * totalExpenses;
};
