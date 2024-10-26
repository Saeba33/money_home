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
  <p className="warning italic w-full">
    Aucune donnée renseignée pour cette rubrique
  </p>
);

const BudgetManager: React.FC = () => {
  const { budgets, people, expenses, savings, income } = useAppContext();
  const [expandedBudgets, setExpandedBudgets] = useState<string[]>([]);

  const toggleBudgetDetails = (name: string) => {
    setExpandedBudgets((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const renderDetailedItems = (
    items: FinancialItem[],
    personName: string,
    percentage: number
  ) => {
    const filteredItems = items
      .filter((item) => (item.amount || 0) !== 0)
      .map((item) => {
        const amount = item.amount || 0;
        const personalAmount =
          item.assignedTo === "foyer" ? amount * (percentage / 100) : amount;

        return (
          <div key={item.id} className="flex items-center">
            <span>
              {item.name} : {personalAmount.toFixed(2)} €
              {item.assignedTo === "foyer" && people.length > 1 && (
                <span className="text-sm text-white/60 ml-2">
                  (foyer - {percentage.toFixed(1)}% de {amount.toFixed(2)} €)
                </span>
              )}
            </span>
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
      {budgets.warning && (
        <div className="warning mb-6 px-4 rounded-lg bg-orange-950/20">
          {budgets.warning}
        </div>
      )}

      <div className="flex flex-col w-full gap-6">
        <div className="border border-white/10 rounded-2xl p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-white/10 mb-4">
            <div>
              <h3 className="text-xl font-semibold">Résumé global</h3>
            </div>
            <div>
              <span
                className={`text-xl font-semibold px-3 py-1 rounded-md whitespace-nowrap ${
                  budgets.summary.totalBalance > 0
                    ? "amount-positive"
                    : budgets.summary.totalBalance < 0
                    ? "amount-negative"
                    : "amount-neutral"
                }`}
              >
                {budgets.summary.totalBalance > 0 ? "+" : ""}
                {budgets.summary.totalBalance.toFixed(2)} €
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {summaryKeys
              .filter((key) => key !== "totalBalance")
              .map((key) => (
                <div
                  key={key}
                  className="flex-1 basis-40 flex flex-col gap-2 p-3 bg-white/5 rounded-md"
                >
                  <span className="text-sm text-white/60 overflow-hidden text-ellipsis">
                    {summaryTranslations[key]}
                  </span>
                  <span>{budgets.summary[key].toFixed(2)} €</span>
                </div>
              ))}
          </div>

          {people.length === 1 && (
            <div className="mb-4 rounded-lg">
              <button
                onClick={() => toggleBudgetDetails(budgets.budgets[0].name)}
                className="details-button"
              >
                {expandedBudgets.includes(budgets.budgets[0].name) ? (
                  <>
                    Masquer le détail <FaChevronUp />
                  </>
                ) : (
                  <>
                    Afficher le détail <FaChevronDown />
                  </>
                )}
              </button>

              {expandedBudgets.includes(budgets.budgets[0].name) && (
                <div className="mt-8 space-y-6 opacity-100 translate-y-0 transition-all duration-300">
                  {[
                    { title: "Revenus", items: income },
                    { title: "Épargne", items: savings },
                    { title: "Dépenses", items: expenses },
                  ].map(({ title, items }) => (
                    <div key={title}>
                      <h5 className="text-lg font-medium mb-1">{title}</h5>
                      <div>
                        {renderDetailedItems(
                          items.filter(
                            (item) =>
                              item.assignedTo === budgets.budgets[0].name ||
                              item.assignedTo === "foyer"
                          ),
                          budgets.budgets[0].name,
                          budgets.budgets[0].percentage
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {people.length > 1 && budgets.budgets.length > 0 && (
          <div className="flex flex-col mt-12">
            {budgets.budgets.map((budget: Budget, index) => (
              <div
                key={budget.name}
                className={`border border-white/10 rounded-lg ${
                  index > 0 ? "mt-6" : ""
                }`}
              >
                <div className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-white/10 mb-4">
                    <div>
                      <h4 className="text-lg font-medium">{budget.name}</h4>
                      <p className="text-sm text-white/60">
                        participation à hauteur de{" "}
                        {budget.percentage.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <span
                        className={`text-xl font-semibold px-3 py-1 rounded-md whitespace-nowrap ${
                          budget.balance > 0
                            ? "amount-positive"
                            : budget.balance < 0
                            ? "amount-negative"
                            : "amount-neutral"
                        }`}
                      >
                        {budget.balance > 0 ? "+" : ""}
                        {budget.balance.toFixed(2)} €
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(budget)
                      .filter(
                        ([key, value]) =>
                          key !== "name" &&
                          key !== "percentage" &&
                          key !== "balance" &&
                          typeof value === "number"
                      )
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className="flex flex-col gap-2 p-3 bg-white/5 rounded-md"
                        >
                          <span className="text-sm text-white/60 overflow-hidden text-ellipsis">
                            {budgetTranslations[key as keyof Budget]}
                          </span>
                          <span>{value.toFixed(2)} €</span>
                        </div>
                      ))}
                  </div>

                  <button
                    onClick={() => toggleBudgetDetails(budget.name)}
                    className="details-button"
                  >
                    {expandedBudgets.includes(budget.name) ? (
                      <>
                        Masquer le détail <FaChevronUp />
                      </>
                    ) : (
                      <>
                        Afficher le détail <FaChevronDown />
                      </>
                    )}
                  </button>

                  {expandedBudgets.includes(budget.name) && (
                    <div className="mt-8 space-y-6 opacity-100 translate-y-0 transition-all duration-300">
                      {[
                        { title: "Revenus", items: income },
                        { title: "Épargne", items: savings },
                        { title: "Dépenses", items: expenses },
                      ].map(({ title, items }) => (
                        <div key={title}>
                          <h5 className="text-lg font-medium mb-1">{title}</h5>
                          <div>
                            {renderDetailedItems(
                              items.filter(
                                (item) =>
                                  item.assignedTo === budget.name ||
                                  item.assignedTo === "foyer"
                              ),
                              budget.name,
                              budget.percentage
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SectionHeader>
  );
};

export default BudgetManager;
