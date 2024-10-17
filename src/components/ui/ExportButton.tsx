import React, { useState } from "react";
import { FaFileExport } from "react-icons/fa";
import ExportModal from "./ExportModal";
import { useAppContext } from "@/contexts/AppContext";
import { generatePDFReport } from "@/utils/pdfGenerator";

const ExportButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { budgets, distributionMode } = useAppContext();

  const handleExport = (exportBudget: boolean, exportAnalysis: boolean) => {
    generatePDFReport(budgets, distributionMode, exportBudget, exportAnalysis);
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="standard-button"
      >
        <FaFileExport className="mr-2" />
        Exporter en PDF
      </button>
      <ExportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onExport={handleExport}
      />
    </>
  );
};

export default ExportButton;
