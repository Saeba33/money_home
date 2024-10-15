import React, { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import SectionHeader from "@/components/ui/SectionHeader";
import { Budget, FinancialItem } from "@/types/types";
import {
  summaryTranslations,
  budgetTranslations,
  summaryKeys,
} from "@/constants/translations";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const NoDataMessage: React.FC = () => (
  <p className="text-orange-500 italic">
    Aucune donnée renseignée pour cette rubrique
  </p>
);

const BudgetManager: React.FC = () => {
  const { budgets, people, expenses, savings, income } = useAppContext();
  const [showPersonalBudgets, setShowPersonalBudgets] = useState(false);
  const [expandedBudgets, setExpandedBudgets] = useState<string[]>([]);
  const [opacity, setOpacity] = useState(1);
  const [detailOpacity, setDetailOpacity] = useState<{ [key: string]: number }>(
    {}
  );

  const togglePersonalBudgets = () => {
    setOpacity(0);
    setTimeout(() => {
      setShowPersonalBudgets(!showPersonalBudgets);
      setOpacity(1);
    }, 200);
  };

  const toggleBudgetDetails = (name: string) => {
    setDetailOpacity((prev) => ({ ...prev, [name]: 0 }));
    setTimeout(() => {
      setExpandedBudgets((prev) =>
        prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
      );
      setDetailOpacity((prev) => ({ ...prev, [name]: 1 }));
    }, 200);
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
    const filteredItems = items
      .filter((item) => (item.amount || 0) > 0)
      .map((item) => {
        const amount = item.amount || 0;
        const personalAmount =
          item.assignedTo === "foyer" ? amount * (percentage / 100) : amount;
        return (
          <div key={item.id}>
            {item.name} : {personalAmount.toFixed(2)} €
            {item.assignedTo === "foyer" &&
              people.length > 1 &&
              ` (${percentage.toFixed(1)}% de ${amount.toFixed(2)} €)`}
          </div>
        );
      });

    return filteredItems.length > 0 ? filteredItems : <NoDataMessage />;
  };

  return (
    <SectionHeader
      title="Budget"
      infoTextKey="BUDGET"
      defaultOpenedSection={true}
    >
      {budgets.warning && <div className="warning">{budgets.warning}</div>}

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Résumé global</h3>
          {budgets.budgets.length > 0 && (
            <button
              onClick={togglePersonalBudgets}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
            >
              {showPersonalBudgets ? "Voir moins" : "Voir plus"}
              {showPersonalBudgets ? (
                <FaChevronUp className="ml-2" />
              ) : (
                <FaChevronDown className="ml-2" />
              )}
            </button>
          )}
        </div>
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
              {summaryTranslations[key]} : {budgets.summary[key].toFixed(2)} €
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-4 transition-opacity duration-300 ease-in-out"
        style={{ opacity: opacity }}
      >
        {showPersonalBudgets && (
          <>
            {people.length > 1 && (
              <h3 className="text-lg font-semibold mb-2">
                Répartition individuelle
              </h3>
            )}
            {budgets.budgets.map((budget: Budget) => (
              <div
                key={budget.name}
                className="mb-4 p-4 bg-gray-100 rounded-lg"
              >
                {people.length > 1 && (
                  <h4 className="font-medium mb-2">
                    {budget.name} ({budget.percentage.toFixed(1)}%)
                  </h4>
                )}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {(Object.keys(budgetTranslations) as Array<keyof Budget>)
                    .filter(
                      (key) =>
                        key !== "name" &&
                        key !== "percentage" &&
                        typeof budget[key] === "number" &&
                        (people.length > 1 || !key.startsWith("foyer"))
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
                        {budgetTranslations[key]} :{" "}
                        {typeof budget[key] === "number"
                          ? (budget[key] as number).toFixed(2)
                          : budget[key]}{" "}
                        €
                      </div>
                    ))}
                </div>
                <button
                  onClick={() => toggleBudgetDetails(budget.name)}
                  className="mt-2 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 flex items-center"
                >
                  {expandedBudgets.includes(budget.name) ? (
                    <>
                      Masquer le détail <FaChevronUp className="ml-2" />
                    </>
                  ) : (
                    <>
                      Afficher le détail <FaChevronDown className="ml-2" />
                    </>
                  )}
                </button>
                <div
                  className="mt-4 transition-opacity duration-300 ease-in-out"
                  style={{ opacity: detailOpacity[budget.name] || 0 }}
                >
                  {expandedBudgets.includes(budget.name) && (
                    <>
                      <h5 className="font-medium">Revenus</h5>
                      {renderDetailedItems(
                        income.filter(
                          (r) =>
                            r.assignedTo === budget.name ||
                            r.assignedTo === "foyer"
                        ),
                        budget.name,
                        budget.percentage
                      )}
                      <h5 className="font-medium mt-2">Épargne</h5>
                      {renderDetailedItems(
                        savings.filter(
                          (s) =>
                            s.assignedTo === budget.name ||
                            s.assignedTo === "foyer"
                        ),
                        budget.name,
                        budget.percentage
                      )}
                      <h5 className="font-medium mt-2">Dépenses</h5>
                      {renderDetailedItems(
                        expenses.filter(
                          (e) =>
                            e.assignedTo === budget.name ||
                            e.assignedTo === "foyer"
                        ),
                        budget.name,
                        budget.percentage
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </SectionHeader>
  );
};

export default BudgetManager;
