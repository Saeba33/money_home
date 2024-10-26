import React from "react";
import { DeletePersonProps } from "@/types/types";
import Modal from "@/components/ui/Modal";

const DeletePerson: React.FC<DeletePersonProps> = ({
  isOpen,
  onClose,
  person,
  financialItems,
  onConfirm,
}) => {
  const hasFinancialData = financialItems.length > 0;

  return (
    <Modal
      isOpen={isOpen}
      title={`Supprimer ${person.name}`}
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="cancel-button">
            Annuler
          </button>
          <button
            onClick={() => onConfirm("delete")}
            className="reset-button"
          >
            {hasFinancialData ? "Tout supprimer" : "Supprimer"}
          </button>
          {hasFinancialData && (
            <button
              onClick={() => onConfirm("reassign")}
              className="standard-button"
            >
              Réaffecter au foyer
            </button>
          )}
        </div>
      }
    >
      {hasFinancialData ? (
        <p className="warning">
          Attention, {person.name} possède des données financières affectées à
          son nom. Vous pouvez supprimer cet utilisateur et toutes les données
          qui y sont associées, ou supprimer cet utilisateur et réaffecter les
          données au foyer. Si vous souhaitez modifier uniquement certaines
          données, veuillez annuler et modifier les saisies que vous souhaitez
          conserver.
        </p>
      ) : (
        <p>Souhaitez-vous supprimer {person.name} de votre foyer ?</p>
      )}
    </Modal>
  );
};

export default DeletePerson;
