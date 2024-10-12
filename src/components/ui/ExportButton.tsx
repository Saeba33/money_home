import { useAppContext } from "@/contexts/AppContext";
import { Budget } from "@/types/types";
import jsPDF from "jspdf";
import React, { useState } from "react";
import { FaFileExport } from "react-icons/fa";
import ExportModal from "./ExportModal";

const ExportButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    budgets: { budgets },
    distributionMode,
  } = useAppContext();

  const exportToPDF = (
    exportBudgetManager: boolean,
    exportBudgetChart: boolean
  ) => {
    const doc = new jsPDF();

    if (exportBudgetManager) {
      doc.text("Rapport du Budget", 10, 10);
      doc.text(`Mode de distribution : ${distributionMode}`, 10, 20);

      budgets.forEach((budget: Budget, index: number) => {
        const yPos = 30 + index * 40;
        doc.text(`${budget.name}:`, 10, yPos);
        doc.text(
          `Dépenses et épargne du foyer: ${budget.foyerOutflows.toFixed(
            2
          )} € (${budget.percentage.toFixed(2)}%)`,
          20,
          yPos + 10
        );
        doc.text(
          `Dépenses personnelles: ${budget.personalExpenses.toFixed(2)} €`,
          20,
          yPos + 20
        );
        doc.text(
          `Revenus totaux: ${budget.totalIncome.toFixed(2)} €`,
          20,
          yPos + 30
        );
      });
    }

    if (exportBudgetChart) {
      // Ajoutez ici la logique pour exporter les graphiques
      // Vous devrez probablement utiliser une bibliothèque comme html2canvas pour capturer les graphiques
    }

    doc.save("budget-report.pdf");
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 flex items-center shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <FaFileExport className="mr-2" />
        Exporter en PDF
      </button>
      <ExportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onExport={exportToPDF}
      />
    </>
  );
};

export default ExportButton;
