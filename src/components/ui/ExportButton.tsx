import { useAppContext } from "@/contexts/AppContext";
import { Contribution } from "@/types/types";
import jsPDF from "jspdf";
import React, { useState } from "react";
import { FaFileExport } from "react-icons/fa";
import ExportModal from "./ExportModal";

const ExportButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    contributions: { contributions },
    distributionMode,
  } = useAppContext();

  const exportToPDF = (
    exportContributionManager: boolean,
    exportContributionChart: boolean
  ) => {
    const doc = new jsPDF();

    if (exportContributionManager) {
      doc.text("Rapport des Contributions", 10, 10);
      doc.text(`Mode de distribution : ${distributionMode}`, 10, 20);

      contributions.forEach((contribution: Contribution, index: number) => {
        const yPos = 30 + index * 40;
        doc.text(`${contribution.name}:`, 10, yPos);
        doc.text(
          `Contribution au foyer: ${contribution.contributionFoyer.toFixed(
            2
          )} € (${contribution.percentage.toFixed(2)}%)`,
          20,
          yPos + 10
        );
        doc.text(
          `Dépenses personnelles: ${contribution.personalExpenses.toFixed(
            2
          )} €`,
          20,
          yPos + 20
        );
        doc.text(
          `Revenus totaux: ${contribution.totalIncome.toFixed(2)} €`,
          20,
          yPos + 30
        );
      });
    }

    if (exportContributionChart) {
      // Ajoutez ici la logique pour exporter les graphiques
      // Vous devrez probablement utiliser une bibliothèque comme html2canvas pour capturer les graphiques
    }

    doc.save("contributions-report.pdf");
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
