import { ExportModalProps } from "@/types/types";
import React, { useState } from "react";

const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  onExport,
}) => {
  const [exportBudget, setExportBudget] = useState(true);
  const [exportAnalysis, setExportAnalysis] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Exporter en PDF</h2>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={exportBudget}
              onChange={(e) => setExportBudget(e.target.checked)}
              className="mr-2"
            />
            Exporter Budget
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={exportAnalysis}
              onChange={(e) => setExportAnalysis(e.target.checked)}
              className="mr-2"
            />
            Exporter Analyse
          </label>
        </div>
        <div className="flex justify-between gap-2">
          <button
            onClick={onClose}
            className="cancel-button"
          >
            Annuler
          </button>
          <button
            onClick={() => onExport(exportBudget, exportAnalysis)}
            className="standard-button"
          >
            Exporter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
