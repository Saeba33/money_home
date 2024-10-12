import SectionHeader from "@/components/ui/SectionHeader";
import { useAppContext } from "@/contexts/AppContext";
import React, { useEffect, useState } from "react";

const AnalyseManager: React.FC = () => {
  const { people, contributions } = useAppContext();
  const [analysis, setAnalysis] = useState<string>("");

  useEffect(() => {
    const generateAnalysis = () => {
      const isSinglePerson = people.length === 1;
      const { summary } = contributions;
      const totalIncome = summary.totalGlobalIncome;
      const totalExpenses = summary.totalGlobalExpenses;
      const totalSavings = summary.totalGlobalSavings;
      const totalContributions = summary.totalGlobalContributions;
      const balance = summary.totalBalance;
      const expensePercentage = (totalExpenses / totalIncome) * 100;
      const savingsRate = (totalSavings / totalIncome) * 100;

      let analysis = "";

      // Revenus
      if (totalIncome === 0) {
        return "Veuillez saisir vos revenus pour obtenir une analyse financière.";
      }
      analysis += `${isSinglePerson ? "Vos" : "Les"} revenus totaux ${
        isSinglePerson ? "s'élèvent" : "du foyer s'élèvent"
      } à ${totalIncome.toFixed(2)} € par mois.\n\n`;

      // Dépenses
      if (totalExpenses === 0) {
        analysis += `Vous n'avez pas encore saisi de dépenses. Veuillez les ajouter pour une analyse plus précise.\n\n`;
      } else {
        analysis += `${
          isSinglePerson ? "Vos" : "Les"
        } dépenses mensuelles totales sont de ${totalExpenses.toFixed(
          2
        )} € (${expensePercentage.toFixed(2)}% des revenus).\n\n`;
      }

      // Épargne
      if (totalSavings > 0) {
        analysis += `${
          isSinglePerson ? "Votre épargne" : "L'épargne"
        } mensuelle totale est de ${totalSavings.toFixed(
          2
        )} € (${savingsRate.toFixed(2)}% des revenus).\n\n`;
      }

      // Balance
      if (balance < 0) {
        analysis += `Attention : La balance mensuelle est négative (${balance.toFixed(
          2
        )} €). `;
        analysis += "Les contributions dépassent les revenus. ";
        analysis +=
          "Il est crucial de revoir le budget pour équilibrer les finances.\n\n";
      } else if (balance > totalIncome * 0.2) {
        analysis += `Vous avez une marge confortable de ${balance.toFixed(
          2
        )} €. Envisagez d'augmenter votre épargne ou d'investir cet excédent.\n\n`;
      } else if (balance > 0) {
        analysis += `Le budget est équilibré avec une marge de ${balance.toFixed(
          2
        )} €. C'est une bonne base, restez vigilant.\n\n`;
      }

      // Principaux postes de dépenses
      const topContributions = contributions.contributions
        .map((c) => ({
          name: c.name,
          amount: c.totalContributions,
        }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3);

      if (topContributions.length > 0) {
        analysis += "Principaux contributeurs :\n";
        topContributions.forEach((c) => {
          const percent = (c.amount / totalContributions) * 100;
          analysis += `- ${c.name}: ${c.amount.toFixed(2)} € (${percent.toFixed(
            2
          )}% des contributions totales)\n`;
        });
        analysis += "\n";
      }

      // Conseils personnalisés
      if (totalContributions > totalIncome * 0.7) {
        analysis +=
          "Les contributions représentent une part importante des revenus. Essayez d'identifier les domaines où vous pourriez les réduire.\n\n";
      }

      // Vérification des balances individuelles
      if (!isSinglePerson) {
        const hasPositiveBalance = contributions.contributions.some(
          (c) => c.balance > 0
        );
        const hasNegativeBalance = contributions.contributions.some(
          (c) => c.balance < 0
        );

        if (hasPositiveBalance && hasNegativeBalance) {
          analysis +=
            "Certains membres du foyer ont une balance négative tandis que d'autres ont une balance positive. Revoyez la répartition des dépenses ou ajustez les contributions pour équilibrer les finances de chacun.\n\n";
        }
      }

      return analysis;
    };

    setAnalysis(generateAnalysis());
  }, [people, contributions]);

  return (
    <SectionHeader
      title="Analyse Financière"
      infoTextKey="ANALYSE"
      defaultOpenedSection={false}
    >
      <pre className="whitespace-pre-wrap">{analysis}</pre>
    </SectionHeader>
  );
};

export default AnalyseManager;
