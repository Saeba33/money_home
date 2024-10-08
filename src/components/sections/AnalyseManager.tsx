import React, { useEffect, useState } from "react";
import { INFO_TEXTS } from "@/constants/index";
import { useAppContext } from "@/contexts/AppContext";
import SectionHeader from "@/components/ui/SectionHeader";

const AnalyseManager: React.FC = () => {
  const { people, expenses, savings, contributions } = useAppContext();
  const [analysis, setAnalysis] = useState<string>("");

  useEffect(() => {
    const generateAnalysis = () => {
      let analysisText = "Analyse financière :\n\n";

      // Nombre de personnes
      analysisText += `Le foyer est composé de ${people.length} personne(s).\n`;

      // Revenus totaux
      const totalRevenue = contributions.contributions.reduce(
        (sum, contribution) => sum + contribution.totalRevenue,
        0
      );
      analysisText += `Les revenus totaux du foyer s'élèvent à ${totalRevenue.toFixed(
        2
      )} €.\n`;

      // Dépenses totales
      const totalExpenses = expenses.reduce(
        (sum, expense) => sum + (expense.amount || 0),
        0
      );
      analysisText += `Les dépenses mensuelles totales sont de ${totalExpenses.toFixed(
        2
      )} €.\n`;

      // Épargne totale
      const totalSavings = savings.reduce(
        (sum, saving) => sum + (saving.amount || 0),
        0
      );
      analysisText += `L'épargne mensuelle totale est de ${totalSavings.toFixed(
        2
      )} €.\n`;

      // Balance
      const balance = totalRevenue - totalExpenses - totalSavings;
      analysisText += `La balance mensuelle du foyer est de ${balance.toFixed(
        2
      )} €.\n`;

      // Taux d'épargne
      const savingsRate = (totalSavings / totalRevenue) * 100;
      analysisText += `Le taux d'épargne du foyer est de ${savingsRate.toFixed(
        2
      )}%.\n`;

      // Conseils basiques
      if (balance < 0) {
        analysisText +=
          "\nAttention : Vos dépenses dépassent vos revenus. Essayez de réduire vos dépenses ou d'augmenter vos revenus.\n";
      } else if (savingsRate < 10) {
        analysisText +=
          "\nConseil : Essayez d'augmenter votre taux d'épargne pour améliorer votre sécurité financière.\n";
      } else {
        analysisText +=
          "\nFélicitations ! Vous gérez bien vos finances. Continuez ainsi.\n";
      }

      setAnalysis(analysisText);
    };

    generateAnalysis();
  }, [people, expenses, savings, contributions]);

  return (
    <SectionHeader
      title="Analyse Financière"
      infoText={INFO_TEXTS.ANALYSE}
      defaultOpenedSection={true}
    >
      <pre className="whitespace-pre-wrap">{analysis}</pre>
    </SectionHeader>
  );
};

export default AnalyseManager;
