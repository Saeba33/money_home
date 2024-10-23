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
  <p className="warning italic">Aucune donnée renseignée pour cette rubrique</p>
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
      ? "positive-text"
      : balance < 0
      ? "negative-text"
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
          <div key={item.id} className="flex items-baseline">
            <span className="mr-1">{item.name} :</span>
            <span className="">
              {personalAmount.toFixed(2)} €
              {item.assignedTo === "foyer" && people.length > 1 && (
                <span className="text-sm text-gray-600 ml-1">
                  ({percentage.toFixed(1)}% de {amount.toFixed(2)} €)
                </span>
              )}
            </span>
          </div>
        );
      });

    return filteredItems.length > 0 ? filteredItems : <NoDataMessage />;
  };

  const renderBudgetDetails = (budget: Budget) => (
    <div
      className="mt-4 transition-opacity duration-300 ease-in-out"
      style={{ opacity: detailOpacity[budget.name] || 0 }}
    >
      {expandedBudgets.includes(budget.name) && (
        <div className="space-y-4">
          <div>
            <h5 className="font-medium mb-2">Revenus</h5>
            {renderDetailedItems(
              income.filter(
                (r) => r.assignedTo === budget.name || r.assignedTo === "foyer"
              ),
              budget.name,
              budget.percentage
            )}
          </div>
          <div>
            <h5 className="font-medium mb-2">Épargne</h5>
            {renderDetailedItems(
              savings.filter(
                (s) => s.assignedTo === budget.name || s.assignedTo === "foyer"
              ),
              budget.name,
              budget.percentage
            )}
          </div>
          <div>
            <h5 className="font-medium mb-2">Dépenses</h5>
            {renderDetailedItems(
              expenses.filter(
                (e) => e.assignedTo === budget.name || e.assignedTo === "foyer"
              ),
              budget.name,
              budget.percentage
            )}
          </div>
        </div>
      )}
    </div>
  );

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
          {people.length > 1 && budgets.budgets.length > 0 && (
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
        <div className="grid grid-cols-1 xl:grid-cols-2 px-4 gap-x-4 gap-y-2">
          {summaryKeys.map((key) => (
            <div
              key={key}
              className={`flex text-balance items-baseline ${
                key === "totalBalance"
                  ? getBalanceColor(budgets.summary[key])
                  : ""
              }`}
            >
              <span className="mr-2">{summaryTranslations[key]} :</span>
              <span className="font-medium">
                {budgets.summary[key].toFixed(2)} €
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-4 transition-opacity duration-300 ease-in-out"
        style={{ opacity: opacity }}
      >
        {people.length === 1 ? (
          <div className="mb-4 px-4 rounded-lg">
            <button
              onClick={() => toggleBudgetDetails(budgets.budgets[0].name)}
              className="details-button"
            >
              {expandedBudgets.includes(budgets.budgets[0].name) ? (
                <>
                  Masquer le détail <FaChevronUp className="ml-2" />
                </>
              ) : (
                <>
                  Afficher le détail <FaChevronDown className="ml-2" />
                </>
              )}
            </button>
            {renderBudgetDetails(budgets.budgets[0])}
          </div>
        ) : (
          showPersonalBudgets && (
            <>
              <h3 className="text-lg font-semibold mb-2 mt-6">
                Répartition individuelle
              </h3>
              {budgets.budgets.map((budget: Budget) => (
                <div
                  key={budget.name}
                  className="mb-4 p-4 bg-gray-100 rounded-lg"
                >
                  <h4 className="font-medium mb-2">
                    {budget.name} ({budget.percentage.toFixed(1)}%)
                  </h4>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-4 gap-y-2">
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
                          className={`flex text-balance items-baseline ${
                            key === "balance"
                              ? getBalanceColor(budget[key] as number)
                              : ""
                          }`}
                        >
                          <span className="mr-2">
                            {budgetTranslations[key]} :
                          </span>
                          <span className="font-medium">
                            {typeof budget[key] === "number"
                              ? (budget[key] as number).toFixed(2)
                              : budget[key]}{" "}
                            €
                          </span>
                        </div>
                      ))}
                  </div>
                  <button
                    onClick={() => toggleBudgetDetails(budget.name)}
                    className="details-button"
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
                  {renderBudgetDetails(budget)}
                </div>
              ))}
            </>
          )
        )}
      </div>
    </SectionHeader>
  );
};

export default BudgetManager;
