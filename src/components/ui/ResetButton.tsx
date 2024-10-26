import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";
import Modal from "@/components/ui/Modal";
import { resetAllData } from "@/utils/resetAllData";

const ResetButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleReset = () => {
    resetAllData();
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="reset-button">
        <FaRedo className="mr-2" />
        Réinitialiser les données
      </button>

      <Modal
        isOpen={isOpen}
        title="Confirmation de réinitialisation"
        onClose={() => setIsOpen(false)}
        footer={
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="cancel-button"
            >
              Annuler
            </button>
            <button
              onClick={handleReset}
              className="reset-button"
            >
              Réinitialiser
            </button>
          </div>
        }
      >
        <p>
          Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cette
          action est irréversible.
        </p>
      </Modal>
    </>
  );
};

export default ResetButton;
