import DeletePersonModal from "@/components/ui/DeletePerson";
import SectionHeader from "@/components/ui/SectionHeader";
import { useAppContext } from "@/contexts/AppContext";
import { FinancialItem } from "@/types/types";
import React, { useMemo } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

const PeopleManager: React.FC = () => {
  const {
    people,
    addPerson,
    updatePerson,
    prepareDeletePerson,
    executeDeletePerson,
    cancelDeletePerson,
    updatePersonPercentage,
    percentageWarning,
    personToDelete,
    expenses,
    savings,
    income,
    deleteExpense,
    deleteSaving,
    deleteIncome,
    updateExpense,
    updateSaving,
    updateIncome,
    isLoading,
  } = useAppContext();

  const financialItems = useMemo(() => {
    if (!personToDelete) return [];
    return [
      ...expenses
        .filter((e) => e.assignedTo === personToDelete.name)
        .map((e) => ({ ...e, type: "Dépense" as const })),
      ...savings
        .filter((s) => s.assignedTo === personToDelete.name)
        .map((s) => ({ ...s, type: "Épargne" as const })),
      ...income
        .filter((r) => r.assignedTo === personToDelete.name)
        .map((r) => ({ ...r, type: "Revenu" as const })),
    ] as (FinancialItem & { type: "Dépense" | "Épargne" | "Revenu" })[];
  }, [personToDelete, expenses, savings, income]);

  const handleDeleteConfirm = (action: "delete" | "reassign") => {
    if (!personToDelete) return;

    if (action === "reassign") {
      financialItems.forEach((item) => {
        switch (item.type) {
          case "Dépense":
            updateExpense(item.id, { ...item, assignedTo: "foyer" });
            break;
          case "Épargne":
            updateSaving(item.id, { ...item, assignedTo: "foyer" });
            break;
          case "Revenu":
            updateIncome(item.id, { ...item, assignedTo: "foyer" });
            break;
        }
      });
    } else {
      financialItems.forEach((item) => {
        switch (item.type) {
          case "Dépense":
            deleteExpense(item.id);
            break;
          case "Épargne":
            deleteSaving(item.id);
            break;
          case "Revenu":
            deleteIncome(item.id);
            break;
        }
      });
    }

    executeDeletePerson(personToDelete.id);
  };

  const memoizedPeopleList = useMemo(() => {
    return people.map((person, index) => {
      const placeholderText = `Personne ${index + 1}`;
      const isPlaceholder = person.name === placeholderText;

      return (
        <div
          key={person.id}
          className="section-field flex items-center space-x-2 mb-2"
        >
          <div className="relative flex-grow">
            <input
              type="text"
              value={isPlaceholder ? "" : person.name}
              onChange={(e) => {
                const newName = e.target.value || placeholderText;
                updatePerson(person.id, { name: newName });
              }}
              className={`input w-full min-w-0 text-sm sm:text-base ${
                isPlaceholder ? "text-gray-400" : ""
              }`}
              maxLength={50}
              placeholder={placeholderText}
              aria-label="Nom de la personne"
            />
          </div>
          {people.length > 1 && (
            <>
              <div className="flex items-center flex-shrink-0 w-24 sm:w-32 md:w-40">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={person.percentage}
                  onChange={(e) =>
                    updatePersonPercentage(person.id, Number(e.target.value))
                  }
                  className="w-full cursor-pointer"
                  aria-label="Pourcentage de la personne"
                />
                <span className="ml-1 text-xs sm:text-sm w-10 text-right">
                  {person.percentage.toFixed(0)}%
                </span>
              </div>
              <button
                onClick={() => prepareDeletePerson(person)}
                className="delete-button flex-shrink-0"
                aria-label="Supprimer la personne"
              >
                <FaRegTrashCan className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </>
          )}
        </div>
      );
    });
  }, [people, updatePerson, updatePersonPercentage, prepareDeletePerson]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <SectionHeader
      title="Personnes dans le foyer"
      infoTextKey="PEOPLE"
      defaultOpenedSection={true}
    >
      <div className="space-y-2">
        {memoizedPeopleList}
        {percentageWarning && (
          <div className="warning py-2">{percentageWarning}</div>
        )}
        <button onClick={addPerson} className="add-button w-full sm:w-auto">
          Ajouter une personne
        </button>
      </div>
      {personToDelete && (
        <DeletePersonModal
          isOpen={!!personToDelete}
          onClose={cancelDeletePerson}
          person={personToDelete}
          financialItems={financialItems}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </SectionHeader>
  );
};

export default PeopleManager;
