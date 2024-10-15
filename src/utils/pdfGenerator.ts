import jsPDF from "jspdf";
import { Budget, BudgetSummary, DistributionMode } from "@/types/types";
import {
  summaryTranslations,
  budgetTranslations
} from "@/constants/translations";

export const generatePDFReport = (
  budgets: { budgets: Budget[]; summary: BudgetSummary },
  distributionMode: DistributionMode,
  exportBudget: boolean,
  exportAnalysis: boolean
) => {
  const doc = new jsPDF();
  let yPosition = 20;

  // Couleurs
  const primaryColor = "#3498db";
  const secondaryColor = "#2c3e50";
  const textColor = "#333333";

  // Fonction pour ajouter un titre de section
  const addSectionTitle = (text: string) => {
    doc.setFillColor(primaryColor);
    doc.rect(0, yPosition, 210, 10, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("poppins", "bold");
    doc.text(text, 10, yPosition + 7);
    doc.setTextColor(textColor);
    doc.setFont("poppins", "normal");
    yPosition += 15;
  };

  // Fonction pour ajouter du texte
  const addText = (
    text: string,
    fontSize: number = 10,
    indent: number = 0,
    isBold: boolean = false
  ) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", isBold ? "bold" : "normal");
    const splitText = doc.splitTextToSize(text, 190 - indent);
    splitText.forEach((line: string) => {
      if (yPosition > 280) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(line, 10 + indent, yPosition);
      yPosition += fontSize * 0.5;
    });
    yPosition += 5;
  };

  // En-tête
  doc.setFillColor(secondaryColor);
  doc.rect(0, 0, 210, 40, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("Rapport Financier BEA", 105, 25, { align: "center" });
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, 35, {
    align: "center",
  });
  yPosition = 50;

  if (exportBudget) {
    addSectionTitle("Rapport du Budget");
    addText(`Mode de distribution : ${distributionMode}`, 12, 0, true);
    addText("Résumé global :", 12, 0, true);
    Object.entries(budgets.summary).forEach(([key, value]) => {
      const translatedKey =
        summaryTranslations[key as keyof BudgetSummary] || key;
      addText(`${translatedKey}: ${value.toFixed(2)} €`, 10, 5);
    });

    addText("Budgets individuels :", 12, 0, true);
    budgets.budgets.forEach((budget) => {
      addText(`${budget.name}:`, 11, 0, true);
      Object.entries(budget).forEach(([key, value]) => {
        if (key !== "name" && typeof value === "number") {
          const translatedKey = budgetTranslations[key as keyof Budget] || key;
          addText(`${translatedKey}: ${value.toFixed(2)} €`, 10, 5);
        }
      });
      yPosition += 5;
    });
  }

  if (exportAnalysis) {
    if (yPosition > 200) doc.addPage();
    addSectionTitle("Analyse Financière");
    const analysisElement = document.querySelector("#analyse-financiere");
    if (analysisElement) {
      const analysisText = analysisElement.textContent || "";
      addText(analysisText);
    } else {
      addText("Analyse financière non disponible.");
    }
  }

  // Numéros de page
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Page ${i} / ${totalPages}`, 195, 287, { align: "right" });
  }

  doc.save("rapport-financier-bea.pdf");
};
