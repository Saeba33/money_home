import React, { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import SectionHeader from "@/components/ui/SectionHeader";
import ExpandCollapseButton from "@/components/ui/SeeMoreButton";
import ShowHideDetailsButton from "@/components/ui/DetailsButton";
import { Budget, BudgetSummary, FinancialItem } from "@/types/types";

const summaryKeys: (keyof BudgetSummary)[] = [
  "totalGlobalIncome",
  "totalGlobalExpenses",
  "totalGlobalSavings",
  "totalGlobalOutflows",
  "totalBalance",
];

const summaryTranslations: Record<keyof BudgetSummary, string> = {
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

const budgetTranslations: Record<keyof Budget, string> = {
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

const BudgetManager: React.FC = () => {
  const { budgets, people, expenses, savings, income } = useAppContext();
  const [showPersonalBudgets, setShowPersonalBudgets] = useState(false);
  const [expandedBudgets, setExpandedBudgets] = useState<string[]>([]);

  const togglePersonalBudgets = () => setShowPersonalBudgets((prev) => !prev);
  const toggleBudgetDetails = (name: string) => {
    setExpandedBudgets((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const getBalanceColor = (balance: number) =>
    balance > 0
      ? "text-green-600"
      : balance < 0
      ? "text-red-600"
      : "text-black";

  const renderDetailedItems = (
    items: FinancialItem[],
    personName: string,
    percentage: number
  ) => {
    return items.map((item) => {
      const amount =
        item.assignedTo === "foyer"
          ? (item.amount || 0) * (percentage / 100)
          : item.amount || 0;
      return (
        <div key={item.id}>
          {item.name}: {amount.toFixed(2)} €
          {item.assignedTo === "foyer" &&
            ` (${percentage.toFixed(1)}% de ${item.amount} €)`}
        </div>
      );
    });
  };

  return (
    <SectionHeader
      title="Budget"
      infoTextKey="BUDGET"
      defaultOpenedSection={true}
    >
      {budgets.warning && <div className="warning">{budgets.warning}</div>}

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Résumé global</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {summaryKeys.map((key) => (
            <div
              key={key}
              className={
                key === "totalBalance"
                  ? getBalanceColor(budgets.summary[key])
                  : ""
              }
            >
              {summaryTranslations[key]}: {budgets.summary[key].toFixed(2)} €
            </div>
          ))}
        </div>
      </div>

      {budgets.budgets.length > 0 && (
        <ExpandCollapseButton
          isExpanded={showPersonalBudgets}
          onClick={togglePersonalBudgets}
          expandedText="Voir moins"
          collapsedText="Voir plus"
        />
      )}

      {showPersonalBudgets && (
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Répartition {people.length > 1 ? "individuelle" : "individuelle"}
          </h3>
          {budgets.budgets.map((budget: Budget) => (
            <div key={budget.name} className="mb-4 p-4 bg-gray-100 rounded-lg">
              <h4 className="font-medium mb-2">
                {budget.name} ({budget.percentage.toFixed(1)}%)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {(Object.keys(budgetTranslations) as Array<keyof Budget>)
                  .filter(
                    (key) =>
                      key !== "name" &&
                      key !== "percentage" &&
                      typeof budget[key] === "number"
                  )
                  .map((key) => (
                    <div
                      key={key}
                      className={
                        key === "balance"
                          ? getBalanceColor(budget[key] as number)
                          : ""
                      }
                    >
                      {budgetTranslations[key]}:{" "}
                      {typeof budget[key] === "number"
                        ? (budget[key] as number).toFixed(2)
                        : budget[key]}{" "}
                      €
                    </div>
                  ))}
              </div>
              <ShowHideDetailsButton
                isExpanded={expandedBudgets.includes(budget.name)}
                onClick={() => toggleBudgetDetails(budget.name)}
                expandedText="Masquer le détail"
                collapsedText="Afficher le détail"
              />
              {expandedBudgets.includes(budget.name) && (
                <div className="mt-4">
                  <h5 className="font-medium">Revenus</h5>
                  {renderDetailedItems(
                    income.filter(
                      (r) =>
                        r.assignedTo === budget.name || r.assignedTo === "foyer"
                    ),
                    budget.name,
                    budget.percentage
                  )}
                  <h5 className="font-medium mt-2">Épargne</h5>
                  {renderDetailedItems(
                    savings.filter(
                      (s) =>
                        s.assignedTo === budget.name || s.assignedTo === "foyer"
                    ),
                    budget.name,
                    budget.percentage
                  )}
                  <h5 className="font-medium mt-2">Dépenses</h5>
                  {renderDetailedItems(
                    expenses.filter(
                      (e) =>
                        e.assignedTo === budget.name || e.assignedTo === "foyer"
                    ),
                    budget.name,
                    budget.percentage
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </SectionHeader>
  );
};

export default BudgetManager;
