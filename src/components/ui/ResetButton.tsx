import React, { useState } from "react";
import { resetAllData } from "@/utils/resetAllData";
import { FaRedo } from "react-icons/fa";

const ResetButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleReset = () => {
    resetAllData();
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-red-500 text-white p-2 rounded flex items-center"
      >
        <FaRedo className="mr-2" />
        Réinitialiser les données
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4">
            <h2 className="text-xl font-bold mb-4">
              Confirmation de réinitialisation
            </h2>
            <p className="mb-6">
              Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cette
              action est irréversible.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetButton;
