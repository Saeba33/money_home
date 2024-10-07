import React, { useMemo } from "react";
import { useAppContext } from "../contexts/AppContext";
import { INFO_TEXTS } from "../constants/index";
import SectionHeader from "./SectionHeader";

const ContributionManager: React.FC = () => {
  const {
    contributions: { contributions, warning },
    people,
  } = useAppContext();

  const memoizedContributions = useMemo(() => {
    if (
      contributions.every(
        (c) =>
          c.totalRevenue === 0 &&
          c.contributionFoyer === 0 &&
          c.contributionPersonnelle === 0
      )
    ) {
      return null;
    }

    return contributions.map((contribution) => {
      const totalExpenses =
        contribution.contributionFoyer + contribution.contributionPersonnelle;
      const savings = contribution.totalRevenue - totalExpenses;

      return (
        <div key={contribution.name} className="section-field">
          <h3 className="subtitle">{contribution.name}</h3>
          {contribution.totalRevenue > 0 && (
            <div>Revenus totaux : {contribution.totalRevenue.toFixed(2)} €</div>
          )}
          {people.length > 1 && contribution.contributionFoyer > 0 && (
            <div>
              Dépenses totales du foyer ({contribution.percentage.toFixed(2)}%)
              :{contribution.contributionFoyer.toFixed(2)} €
            </div>
          )}
          {contribution.contributionPersonnelle > 0 && (
            <div>
              Dépenses personnelles :{" "}
              {contribution.contributionPersonnelle.toFixed(2)} €
            </div>
          )}
          {totalExpenses > 0 && people.length === 1 && (
            <div>Dépenses totales : {totalExpenses.toFixed(2)} €</div>
          )}
          {savings > 0 && <div>Epargne totale : {savings.toFixed(2)} €</div>}
          {contribution.balance !== 0 && (
            <div>Balance : {contribution.balance.toFixed(2)} €</div>
          )}
        </div>
      );
    });
  }, [contributions, people.length]);

  if (!memoizedContributions) return null;

  return (
    <SectionHeader
      title="Contributions"
      infoText={INFO_TEXTS.CONTRIBUTIONS}
      defaultOpenedSection={true}
    >
      {warning && <div className="warning">{warning}</div>}
      {memoizedContributions}
    </SectionHeader>
  );
};

export default ContributionManager;
