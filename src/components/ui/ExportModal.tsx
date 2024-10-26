import Modal from "@/components/ui/Modal";
import { ExportModalProps } from "@/types/types";
import React, { useState } from "react";

const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  onExport,
}) => {
  const [exportBudget, setExportBudget] = useState(true);
  const [exportAnalysis, setExportAnalysis] = useState(true);

  return (
    <Modal
      isOpen={isOpen}
      title="Exporter en PDF"
      onClose={onClose}
      footer={
        <div className="flex justify-between gap-2">
          <button onClick={onClose} className=" cancel-button">
            Annuler
          </button>
          <button
            onClick={() => onExport(exportBudget, exportAnalysis)}
            className="standard-button"
          >
            Exporter
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-2 text-lg">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={exportBudget}
            onChange={(e) => setExportBudget(e.target.checked)}
            className="mr-2"
          />
          Exporter Budget
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={exportAnalysis}
            onChange={(e) => setExportAnalysis(e.target.checked)}
            className="mr-2 "
          />
          Exporter Analyse
        </label>
      </div>
    </Modal>
  );
};

export default ExportModal;
