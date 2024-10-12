import ShowHideDetailsButton from "@/components/ui/DetailsButton";
import SectionHeader from "@/components/ui/SectionHeader";
import ExpandCollapseButton from "@/components/ui/SeeMoreButton";
import { useAppContext } from "@/contexts/AppContext";
import {
  Contribution,
  ContributionSummary,
  FinancialItem,
} from "@/types/types";
import React, { useState } from "react";

const summaryKeys: (keyof ContributionSummary)[] = [
  "totalGlobalIncome",
  "totalGlobalExpenses",
  "totalGlobalSavings",
  "totalGlobalContributions",
  "totalBalance",
];

const summaryTranslations: Record<keyof ContributionSummary, string> = {
  totalGlobalIncome: "Revenus totaux",
  totalGlobalExpenses: "Dépenses totales",
  totalGlobalSavings: "Épargne totale",
  totalGlobalContributions: "Contributions totales",
  totalBalance: "Balance totale",
  totalFoyerIncome: "Revenus du foyer",
  totalFoyerExpenses: "Dépenses du foyer",
  totalFoyerSavings: "Épargne du foyer",
  totalFoyerContributions: "Contributions du foyer",
};

const contributionTranslations: Record<keyof Contribution, string> = {
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
  personalContributions: "Contributions personnelles",
  foyerContributions: "Contributions au foyer",
  totalContributions: "Contributions totales",
  balance: "Balance",
  percentage: "Pourcentage",
};

const ContributionManager: React.FC = () => {
  const { contributions, people, expenses, savings, income } = useAppContext();
  const [showPersonalContributions, setShowPersonalContributions] =
    useState(false);
  const [expandedContributions, setExpandedContributions] = useState<string[]>(
    []
  );

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
            ` (${percentage}% de ${item.amount} €)`}
        </div>
      );
    });
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
          {summaryKeys.map((key) => (
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
          ))}
        </div>
      </div>

      {contributions.contributions.length > 0 && (
        <ExpandCollapseButton
          isExpanded={showPersonalContributions}
          onClick={togglePersonalContributions}
          expandedText="Voir moins"
          collapsedText="Voir plus"
        />
      )}

      {showPersonalContributions && (
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Répartition {people.length > 1 ? "individuelle" : "individuelle"}
          </h3>
          {contributions.contributions.map((contribution: Contribution) => (
            <div
              key={contribution.name}
              className="mb-4 p-4 bg-gray-100 rounded-lg"
            >
              <h4 className="font-medium mb-2">
                {contribution.name} ({contribution.percentage.toFixed(1)}%)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {(
                  Object.keys(contributionTranslations) as Array<
                    keyof Contribution
                  >
                )
                  .filter(
                    (key) =>
                      key !== "name" &&
                      key !== "percentage" &&
                      typeof contribution[key] === "number"
                  )
                  .map((key) => (
                    <div
                      key={key}
                      className={
                        key === "balance"
                          ? getBalanceColor(contribution[key] as number)
                          : ""
                      }
                    >
                      {contributionTranslations[key]}:{" "}
                      {typeof contribution[key] === "number"
                        ? (contribution[key] as number).toFixed(2)
                        : contribution[key]}{" "}
                      €
                    </div>
                  ))}
              </div>
              <ShowHideDetailsButton
                isExpanded={expandedContributions.includes(contribution.name)}
                onClick={() => toggleContributionDetails(contribution.name)}
                expandedText="Masquer le détail"
                collapsedText="Afficher le détail"
              />
              {expandedContributions.includes(contribution.name) && (
                <div className="mt-4">
                  <h5 className="font-medium">Revenus</h5>
                  {renderDetailedItems(
                    income.filter(
                      (r) =>
                        r.assignedTo === contribution.name ||
                        r.assignedTo === "foyer"
                    ),
                    contribution.name,
                    contribution.percentage
                  )}
                  <h5 className="font-medium mt-2">Épargne</h5>
                  {renderDetailedItems(
                    savings.filter(
                      (s) =>
                        s.assignedTo === contribution.name ||
                        s.assignedTo === "foyer"
                    ),
                    contribution.name,
                    contribution.percentage
                  )}
                  <h5 className="font-medium mt-2">Dépenses</h5>
                  {renderDetailedItems(
                    expenses.filter(
                      (e) =>
                        e.assignedTo === contribution.name ||
                        e.assignedTo === "foyer"
                    ),
                    contribution.name,
                    contribution.percentage
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

export default ContributionManager;
