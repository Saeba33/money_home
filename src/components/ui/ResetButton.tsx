import React from "react";
import { resetAllData } from "@/utils/resetAllData";

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
    <button onClick={handleReset} className="btn">
      Réinitialiser toutes les données
    </button>
  );
};

export default ResetButton;
