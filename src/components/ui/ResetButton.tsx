import React from "react";
import { resetAllData } from "@/utils/resetAllData";
import { FaRedo } from "react-icons/fa";

const ResetButton: React.FC = () => {
  const handleReset = () => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cette action est irréversible."
      )
    ) {
      resetAllData();
    }
  };

  return (
    <button
      onClick={handleReset}
      className="bg-red-500 text-white p-2 rounded flex items-center"
    >
      <FaRedo className="mr-2" />
      Réinitialiser les données
    </button>
  );
};

export default ResetButton;
