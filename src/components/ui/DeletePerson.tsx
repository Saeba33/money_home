import React from "react";
import { Person, FinancialItem } from "@/types/types";

interface DeletePersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  person: Person;
  financialItems: FinancialItem[];
  onConfirm: (action: "delete" | "reassign") => void;
}

const DeletePersonModal: React.FC<DeletePersonModalProps> = ({
  isOpen,
  onClose,
  person,
  financialItems,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const hasFinancialData = financialItems.length > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Supprimer {person.name}</h2>
        {hasFinancialData ? (
          <p className="text-orange-500 mb-4">
            Attention, {person.name} possède des données financières affectées à
            son nom. Vous pouvez supprimer cet utilisateur et toutes les données
            qui y sont associées, ou supprimer cet utilisateur et réaffecter les
            données au foyer. Si vous souhaitez modifier uniquement certaines
            données, veuillez annuler et modifier les saisies que vous souhaitez
            conserver.
          </p>
        ) : (
          <p className="mb-4">
            Souhaitez-vous supprimer {person.name} de votre foyer ?
          </p>
        )}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded mr-2"
          >
            Annuler
          </button>
          <button
            onClick={() => onConfirm("delete")}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            {hasFinancialData ? "Tout supprimer" : "Supprimer"}
          </button>
          {hasFinancialData && (
            <button
              onClick={() => onConfirm("reassign")}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Réaffecter au foyer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeletePersonModal;
