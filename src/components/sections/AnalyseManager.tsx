import React, { useEffect, useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import SectionHeader from "@/components/ui/SectionHeader";

const AnalyseManager: React.FC = () => {
  const { people, expenses, savings, revenues, contributions } =
    useAppContext();
  const [analysis, setAnalysis] = useState<string>("");

  useEffect(() => {
    const generateAnalysis = () => {
      const isSinglePerson = people.length === 1;
      const totalRevenue = contributions.contributions.reduce(
        (sum, c) => sum + c.totalRevenue,
        0
      );
      const totalExpenses = expenses.reduce(
        (sum, e) => sum + (e.amount || 0),
        0
      );
      const totalSavings = savings.reduce((sum, s) => sum + (s.amount || 0), 0);
      const balance = totalRevenue - totalExpenses - totalSavings;
      const expensePercentage = (totalExpenses / totalRevenue) * 100;
      const savingsRate = (totalSavings / totalRevenue) * 100;

      let analysis = "";

      // Revenus
      if (totalRevenue === 0) {
        return "Veuillez saisir vos revenus pour obtenir une analyse financière.";
      }
      analysis += `${isSinglePerson ? "Vos" : "Les"} revenus totaux ${
        isSinglePerson ? "s'élèvent" : "du foyer s'élèvent"
      } à ${totalRevenue.toFixed(2)} € par mois.\n\n`;

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
        analysis +=
          totalSavings > 0
            ? "Les dépenses et épargnes combinées dépassent les revenus. "
            : "Les dépenses dépassent les revenus. ";
        analysis +=
          "Il est crucial de revoir le budget pour équilibrer les finances.\n\n";
      } else if (balance > totalRevenue * 0.2) {
        analysis += `Vous avez une marge confortable de ${balance.toFixed(
          2
        )} €. Envisagez d'augmenter votre épargne ou d'investir cet excédent.\n\n`;
      } else if (balance > 0) {
        analysis += `Le budget est équilibré avec une marge de ${balance.toFixed(
          2
        )} €. C'est une bonne base, restez vigilant.\n\n`;
      }

      // Principaux postes de dépenses
      const topExpenses = expenses
        .filter((e) => e.amount && e.amount > 0)
        .sort((a, b) => (b.amount || 0) - (a.amount || 0))
        .slice(0, 3);

      if (topExpenses.length > 0) {
        analysis += "Principaux postes de dépenses :\n";
        topExpenses.forEach((e) => {
          const percent = ((e.amount || 0) / totalExpenses) * 100;
          analysis += `- ${e.name}: ${e.amount?.toFixed(
            2
          )} € (${percent.toFixed(2)}% des dépenses totales)\n`;
        });
        analysis += "\n";
      }

      // Conseils personnalisés
      if (totalExpenses > totalRevenue * 0.7) {
        analysis +=
          "Les dépenses représentent une part importante des revenus. Essayez d'identifier les domaines où vous pourriez les réduire.\n\n";
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
  }, [people, expenses, savings, revenues, contributions]);

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
