import React, { useState } from "react";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (
    exportContributionManager: boolean,
    exportContributionChart: boolean
  ) => void;
}

const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  onExport,
}) => {
  const [exportContributionManager, setExportContributionManager] =
    useState(true);
  const [exportContributionChart, setExportContributionChart] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Exporter en PDF</h2>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={exportContributionManager}
              onChange={(e) => setExportContributionManager(e.target.checked)}
              className="mr-2"
            />
            Exporter Budget
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={exportContributionChart}
              onChange={(e) => setExportContributionChart(e.target.checked)}
              className="mr-2"
            />
            Exporter Graphiques
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={exportContributionChart}
              onChange={(e) => setExportContributionChart(e.target.checked)}
              className="mr-2"
            />
            Exporter Analyse
          </label>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
          >
            Annuler
          </button>
          <button
            onClick={() =>
              onExport(exportContributionManager, exportContributionChart)
            }
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Exporter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;