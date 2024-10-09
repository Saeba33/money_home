import React, { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import SectionHeader from "@/components/ui/SectionHeader";
import ExpandCollapseButton from "@/components/ui/SeeMoreButton";
import ShowHideDetailsButton from "@/components/ui/DetailsButton";
import {
  Contribution,
  ContributionSummary,
  FinancialItem,
} from "@/types/types";
import { useHasFinancialData } from "@/hooks/useHasFinancialData";

const summaryTranslations: Record<keyof ContributionSummary, string> = {
  totalRevenues: "Revenus totaux",
  totalExpenses: "Dépenses totales",
  totalSavings: "Épargne totale",
  totalBalance: "Balance totale",
  foyerExpenses: "Dépenses du foyer",
  foyerSavings: "Épargne du foyer",
};

const contributionTranslations: Record<string, string> = {
  totalRevenue: "Revenu total",
  contributionFoyer: "Contribution au foyer",
  personalExpenses: "Dépenses personnelles",
  personalSavings: "Épargne personnelle",
  balance: "Balance",
};

const ContributionManager: React.FC = () => {
  const { contributions, expenses, savings, revenues } = useAppContext();
  const { hasAnySignificantData } = useHasFinancialData();
  const [showPersonalContributions, setShowPersonalContributions] =
    useState(false);
  const [expandedContributions, setExpandedContributions] = useState<string[]>(
    []
  );

  if (!hasAnySignificantData) {
    return null;
  }

  const togglePersonalContributions = () =>
    setShowPersonalContributions((prev) => !prev);
  const toggleContributionDetails = (name: string) => {
    setExpandedContributions((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const getBalanceColor = (balance: number) =>
    balance > 0
      ? "text-green-600"
      : balance < 0
      ? "text-red-600"
      : "text-black";

  const hasDetails = (name: string, contribution: Contribution) => {
    const hasPersonalItems = [...revenues, ...expenses, ...savings].some(
      (item) => item.assignedTo === name && item.amount !== 0
    );
    const hasFoyerItems = [...revenues, ...expenses, ...savings].some(
      (item) =>
        item.assignedTo === "foyer" &&
        item.amount !== 0 &&
        contribution.percentage > 0
    );
    return hasPersonalItems || hasFoyerItems;
  };

  const renderDetailedItems = (
    items: FinancialItem[],
    contribution: Contribution
  ) => {
    return items
      .filter((item) => {
        const amount =
          item.assignedTo === "foyer"
            ? ((item.amount || 0) * contribution.percentage) / 100
            : item.amount;
        return amount !== 0 && !isNaN(amount || 0);
      })
      .map((item) => {
        const amount =
          item.assignedTo === "foyer"
            ? ((item.amount || 0) * contribution.percentage) / 100
            : item.amount || 0;
        return (
          <li key={item.id}>
            {item.name}: {amount.toFixed(2)} €
            {item.assignedTo === "foyer" &&
              ` (foyer - ${contribution.percentage.toFixed(1)}% de ${
                item.amount
              } €)`}
          </li>
        );
      });
  };

  const renderDetails = (name: string, contribution: Contribution) => {
    const renderSection = (title: string, items: FinancialItem[]) => {
      const detailedItems = renderDetailedItems(items, contribution);
      return detailedItems.length > 0 ? (
        <>
          <h5 className="font-medium mt-2">{title}</h5>
          <ul>{detailedItems}</ul>
        </>
      ) : null;
    };

    return (
      <div className="mt-2">
        {renderSection("Revenus détaillés :", [
          ...revenues.filter((r) => r.assignedTo === name),
          ...revenues.filter((r) => r.assignedTo === "foyer"),
        ])}
        {renderSection("Dépenses détaillées :", [
          ...expenses.filter((e) => e.assignedTo === name),
          ...expenses.filter((e) => e.assignedTo === "foyer"),
        ])}
        {renderSection("Épargnes détaillées :", [
          ...savings.filter((s) => s.assignedTo === name),
          ...savings.filter((s) => s.assignedTo === "foyer"),
        ])}
      </div>
    );
  };

  return (
    <SectionHeader
      title="Contributions"
      infoTextKey="CONTRIBUTIONS"
      defaultOpenedSection={true}
    >
      {contributions.warning && (
        <div className="warning">{contributions.warning}</div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Résumé global</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {(
            Object.keys(contributions.summary) as Array<
              keyof ContributionSummary
            >
          ).map(
            (key) =>
              contributions.summary[key] > 0 && (
                <div
                  key={key}
                  className={
                    key === "totalBalance"
                      ? getBalanceColor(contributions.summary[key])
                      : ""
                  }
                >
                  {summaryTranslations[key]}:{" "}
                  {contributions.summary[key].toFixed(2)} €
                </div>
              )
          )}
        </div>
      </div>

      {contributions.contributions.length > 0 && (
        <ExpandCollapseButton
          isExpanded={showPersonalContributions}
          onClick={togglePersonalContributions}
          expandedText="Voir moins de détails"
          collapsedText="Voir plus de détails"
        />
      )}

      {showPersonalContributions && (
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Contributions individuelles
          </h3>
          {contributions.contributions.map((contribution: Contribution) => (
            <div
              key={contribution.name}
              className="mb-4 p-4 bg-gray-100 rounded-lg"
            >
              <h4 className="font-medium mb-2">{contribution.name}</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {(
                  [
                    "totalRevenue",
                    "contributionFoyer",
                    "personalExpenses",
                    "personalSavings",
                    "balance",
                  ] as const
                ).map(
                  (key) =>
                    contribution[key] !== 0 && (
                      <div
                        key={key}
                        className={
                          key === "balance"
                            ? getBalanceColor(contribution[key])
                            : ""
                        }
                      >
                        {contributionTranslations[key]}:{" "}
                        {contribution[key].toFixed(2)} €
                        {key === "contributionFoyer" &&
                          ` (${contribution.percentage.toFixed(1)}%)`}
                      </div>
                    )
                )}
              </div>
              {hasDetails(contribution.name, contribution) ? (
                <>
                  <ShowHideDetailsButton
                    isExpanded={expandedContributions.includes(
                      contribution.name
                    )}
                    onClick={() => toggleContributionDetails(contribution.name)}
                    expandedText="Masquer le détail"
                    collapsedText="Afficher le détail"
                  />
                  {expandedContributions.includes(contribution.name) &&
                    renderDetails(contribution.name, contribution)}
                </>
              ) : (
                <p className="mt-2 text-sm text-gray-500">
                  Aucun détail disponible
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </SectionHeader>
  );
};

export default ContributionManager;
