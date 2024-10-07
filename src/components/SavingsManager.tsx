import React, { useMemo } from "react";
import { useAppContext } from "../contexts/AppContext";
import { INFO_TEXTS } from "../constants/index";
import { FaRegTrashCan } from "react-icons/fa6";
import SectionHeader from "./SectionHeader";

const SavingsManager: React.FC = () => {
  const {
    savings,
    newSaving,
    updateNewSaving,
    addSaving,
    updateSaving,
    deleteSaving,
    people,
  } = useAppContext();

  const SavingItem = ({ saving, index, isNew = false }) => (
    <div className="section-field bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex flex-wrap gap-2 w-full items-center">
        <input
          type="text-area"
          value={saving.name}
          onChange={(e) => {
            const updatedValue = e.target.value;
            isNew
              ? updateNewSaving({ ...saving, name: updatedValue })
              : updateSaving(index, { ...saving, name: updatedValue });
          }}
          className="input flex-grow min-w-[200px]"
          placeholder="Nom de l'épargne"
        />
        <select
          value={saving.assignedTo}
          onChange={(e) => {
            const updatedValue = e.target.value;
            isNew
              ? updateNewSaving({ ...saving, assignedTo: updatedValue })
              : updateSaving(index, { ...saving, assignedTo: updatedValue });
          }}
          className="input w-full sm:w-auto"
        >
          <option value="foyer">Foyer</option>
          {people.map((person, idx) => (
            <option key={idx} value={person.name}>
              {person.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={saving.amount}
          onChange={(e) => {
            const updatedValue = Number(e.target.value);
            isNew
              ? updateNewSaving({ ...saving, amount: updatedValue })
              : updateSaving(index, { ...saving, amount: updatedValue });
          }}
          className="input w-full sm:w-32"
          placeholder="Montant"
        />
        <input
          type="text"
          value={saving.comments}
          onChange={(e) => {
            const updatedValue = e.target.value;
            isNew
              ? updateNewSaving({ ...saving, comments: updatedValue })
              : updateSaving(index, { ...saving, comments: updatedValue });
          }}
          className="input flex-grow min-w-[200px] lg:flex-grow-[2]"
          placeholder="Commentaires"
        />
        {isNew ? (
          <button onClick={addSaving} className="btn w-full sm:w-auto">
            Ajouter
          </button>
        ) : (
          <button
            onClick={() => deleteSaving(index)}
            className="can w-full sm:w-auto"
          >
            <FaRegTrashCan />
          </button>
        )}
      </div>
    </div>
  );

  const memoizedSavingsList = useMemo(() => {
    return savings.map((saving, index) => (
      <SavingItem key={index} saving={saving} index={index} />
    ));
  }, [savings, updateSaving, deleteSaving]);

  const memoizedNewSavingForm = useMemo(
    () => <SavingItem saving={newSaving} index={-1} isNew={true} />,
    [newSaving, updateNewSaving, addSaving]
  );

  return (
    <SectionHeader
      title="Épargne"
      infoText={INFO_TEXTS.SAVINGS}
      defaultOpenedSection={true}
    >
      {memoizedNewSavingForm}
      {memoizedSavingsList}
    </SectionHeader>
  );
};

export default SavingsManager;
