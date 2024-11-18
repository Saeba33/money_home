import React, { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import SectionHeader from "@/components/ui/SectionHeader";
import { Budget, FinancialItem } from "@/types/types";
import {
  summaryTranslations,
  budgetTranslations,
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
      <div className="flex flex-col w-full gap-6">
        {budgets.budgets.map((budget) => (
          <div
            key={budget.name}
            className="border border-white/10 rounded-lg p-6"
          >
            <div className="flex items-start justify-between">
              <h4 className="text-lg font-medium">{budget.name}</h4>
              <button
                onClick={() => toggleBudgetDetails(budget.name)}
                className="details-button flex items-center gap-2"
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
            </div>

            <div
              className={`details-container ${
                expandedBudgets.includes(budget.name) ? "expanded" : "collapsed"
              }`}
            >
              <div className="details-content space-y-4">
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
            </div>
          </div>
        ))}
      </div>
    </SectionHeader>
  );
};

export default BudgetManager;
