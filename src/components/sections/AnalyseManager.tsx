import SectionHeader from "@/components/ui/SectionHeader";
import { useAppContext } from "@/contexts/AppContext";
import React, { useCallback, useEffect, useState } from "react";
import { FinancialItem } from "@/types/types";

const AnalyseManager: React.FC = () => {
  const { people, budgets, expenses, distributionMode } = useAppContext();
  const [analysisText, setAnalysisText] = useState("");

  const generateAnalysis = useCallback(() => {
    const isSinglePerson = people.length === 1;
    const { summary } = budgets;
    const totalIncome = summary.totalGlobalIncome;
    const totalExpenses = summary.totalGlobalExpenses;
    const totalSavings = summary.totalGlobalSavings;
    const totalOutflows = summary.totalGlobalOutflows;
    const balance = summary.totalBalance;

    let analysis = "";

    // Information sur le foyer et le mode de répartition
    if (!isSinglePerson) {
      analysis += `Votre foyer est composé de ${people.length} personnes. Vous avez choisi le mode de répartition : ${distributionMode}.\n\n`;
    }

    // Revenus
    if (totalIncome === 0) {
      return (
        analysis +
        "Veuillez saisir vos revenus pour obtenir une analyse financière."
      );
    }

    analysis += `${isSinglePerson ? "Vos" : "Les"} revenus totaux ${
      isSinglePerson ? "s'élèvent" : "du foyer s'élèvent"
    } à ${totalIncome.toFixed(2)} € par mois.\n\n`;

    // Vérification du nombre de postes de dépenses avec un montant supérieur à zéro
    const validExpenses = expenses.filter(
      (expense): expense is FinancialItem & { amount: number } =>
        typeof expense.amount === "number" && expense.amount > 0
    );
    const expenseCount = validExpenses.length;

    if (expenseCount < 3) {
      return (
        analysis +
        "Veuillez saisir davantage de postes de dépenses pour avoir une analyse plus précise."
      );
    }

    // Si nous arrivons ici, c'est qu'il y a au moins 3 postes de dépenses valides
    // Nous pouvons donc procéder à une analyse plus détaillée

    const expensePercentage = (totalExpenses / totalIncome) * 100;
    const savingsRate = (totalSavings / totalIncome) * 100;

    // Dépenses
    if (totalExpenses > 0) {
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

    // Principaux postes de dépenses et d'épargne
    const topOutflows = [
      ...validExpenses,
      { name: "Épargne", amount: totalSavings },
    ]
      .filter(
        (item): item is FinancialItem & { amount: number } => item.amount > 0
      )
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

    if (topOutflows.length > 0) {
      analysis +=
        "Principaux postes de dépenses" +
        (totalSavings > 0 ? " et d'épargne" : "") +
        " :\n";
      topOutflows.forEach((o) => {
        const percent = (o.amount / totalOutflows) * 100;
        analysis += `- ${o.name}: ${o.amount.toFixed(2)} € (${percent.toFixed(
          2
        )}% du total)\n`;
      });
      analysis += "\n";
    }

    // Balance
    if (balance < 0) {
      analysis += `Attention : La balance mensuelle est négative (${balance.toFixed(
        2
      )} €). `;
      if (totalSavings === 0) {
        analysis += "Les dépenses dépassent les revenus. ";
      } else {
        analysis += "Les dépenses et l'épargne dépassent vos revenus. ";
      }
      analysis +=
        "Il est crucial de revoir le budget pour équilibrer vos finances.\n\n";
    } else if (balance > 0) {
      const targetSavings = totalIncome * 0.1;
      const additionalSavingsNeeded = Math.max(0, targetSavings - totalSavings);

      if (balance < 50) {
        analysis += `Votre budget est équilibré, mais avec une marge très faible de ${balance.toFixed(
          2
        )} €. `;
        if (savingsRate < 10) {
          analysis += `Bien qu'il soit souhaitable d'épargner 10% de vos revenus, augmenter votre épargne actuelle pourrait déséquilibrer votre budget. Concentrez-vous d'abord sur la réduction de vos dépenses non essentielles.\n\n`;
        } else {
          analysis += `Restez vigilant et essayez de réduire vos dépenses non essentielles pour augmenter cette marge.\n\n`;
        }
      } else if (savingsRate >= 10) {
        analysis += `Votre budget est bien équilibré avec une marge de ${balance.toFixed(
          2
        )} €, et vous épargnez déjà plus de 10% de vos revenus. C'est une excellente base, continuez ainsi!\n\n`;
      } else {
        if (totalSavings === 0) {
          analysis += `Vous avez une marge de ${balance.toFixed(
            2
          )} €. Vous pourriez envisager d'épargner ${targetSavings.toFixed(
            2
          )} € pour atteindre 10% de vos revenus, tout en gardant une balance positive.\n\n`;
        } else if (additionalSavingsNeeded <= balance) {
          analysis += `Vous avez une marge de ${balance.toFixed(
            2
          )} €. Vous pourriez envisager d'augmenter votre épargne de ${additionalSavingsNeeded.toFixed(
            2
          )} € pour atteindre 10% de vos revenus, tout en gardant une balance positive.\n\n`;
        } else {
          analysis += `Vous avez une marge de ${balance.toFixed(
            2
          )} €. Bien qu'il soit recommandé d'épargner 10% de vos revenus, augmenter votre épargne à ce niveau pourrait déséquilibrer votre budget. Essayez d'abord de réduire vos dépenses non essentielles.\n\n`;
        }
      }
    }

    // Conseils personnalisés
    if (totalOutflows > totalIncome * 0.9) {
      analysis +=
        "Les dépenses" +
        (totalSavings > 0 ? " et l'épargne" : "") +
        " représentent une part importante des revenus. ";
      if (savingsRate < 10) {
        analysis +=
          "Essayez d'identifier les domaines où vous pourriez réduire vos dépenses" +
          (totalSavings > 0
            ? " pour augmenter votre épargne"
            : " afin de pouvoir épargner") +
          ".\n\n";
      } else {
        analysis +=
          "Bien que votre taux d'épargne soit bon, restez vigilant sur vos dépenses pour maintenir une situation financière saine.\n\n";
      }
    }

    // Vérification des balances individuelles
    if (!isSinglePerson) {
      const hasPositiveBalance = budgets.budgets.some((b) => b.balance > 0);
      const hasNegativeBalance = budgets.budgets.some((b) => b.balance < 0);

      if (hasPositiveBalance && hasNegativeBalance) {
        analysis +=
          "Certains membres du foyer ont une balance négative tandis que d'autres ont une balance positive. Revoyez la répartition des dépenses ou ajustez les contributions pour équilibrer les finances de chacun.\n\n";
      }
    }

    return analysis;
  }, [people, budgets, expenses, distributionMode]);

  useEffect(() => {
    setAnalysisText(generateAnalysis());
  }, [generateAnalysis]);

  return (
    <SectionHeader
      title="Analyse Financière"
      infoTextKey="ANALYSE"
      defaultOpenedSection={false}
    >
      <div id="analyse-financiere">
        <pre className="whitespace-pre-wrap">{analysisText}</pre>
      </div>
    </SectionHeader>
  );
};

export default AnalyseManager;
