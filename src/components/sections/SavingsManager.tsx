import React, { useMemo } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { useAppContext } from "@/contexts/AppContext";
import SectionHeader from "@/components/ui/SectionHeader";

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

  const memoizedNewSavingForm = useMemo(
    () => (
      <div className="section-field bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex flex-wrap gap-2 w-full items-center">
          <input
            type="text"
            value={newSaving.name}
            onChange={(e) =>
              updateNewSaving({ ...newSaving, name: e.target.value })
            }
            className="input flex-grow min-w-[200px]"
            placeholder="Nom de l'épargne"
          />
          <select
            value={newSaving.assignedTo}
            onChange={(e) =>
              updateNewSaving({ ...newSaving, assignedTo: e.target.value })
            }
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
            value={newSaving.amount || ""}
            onChange={(e) =>
              updateNewSaving({ ...newSaving, amount: Number(e.target.value) })
            }
            className="input w-full sm:w-32"
            placeholder="Montant"
          />
          <input
            type="text"
            value={newSaving.comments}
            onChange={(e) =>
              updateNewSaving({ ...newSaving, comments: e.target.value })
            }
            className="input flex-grow min-w-[200px] lg:flex-grow-[2]"
            placeholder="Commentaires"
          />
          <button onClick={addSaving} className="btn">
            Ajouter
          </button>
        </div>
      </div>
    ),
    [newSaving, updateNewSaving, addSaving, people]
  );

  const memoizedSavingsList = useMemo(() => {
    if (savings.length === 0) return null;

    return (
      <>
        <h3 className="font-bold mt-4 mb-2">Liste des épargnes saisies</h3>
        <hr className="mb-4" />
        {savings.map((saving) => (
          <div
            key={saving.id}
            className="section-field bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4"
          >
            <div className="flex flex-wrap gap-2 w-full items-center">
              <input
                type="text"
                value={saving.name}
                onChange={(e) =>
                  updateSaving(saving.id, { ...saving, name: e.target.value })
                }
                className="input flex-grow min-w-[200px]"
              />
              <select
                value={saving.assignedTo}
                onChange={(e) =>
                  updateSaving(saving.id, {
                    ...saving,
                    assignedTo: e.target.value,
                  })
                }
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
                value={saving.amount || ""}
                onChange={(e) =>
                  updateSaving(saving.id, {
                    ...saving,
                    amount: Number(e.target.value),
                  })
                }
                className="input w-full sm:w-32"
              />
              <input
                type="text"
                value={saving.comments}
                onChange={(e) =>
                  updateSaving(saving.id, {
                    ...saving,
                    comments: e.target.value,
                  })
                }
                className="input flex-grow min-w-[200px] lg:flex-grow-[2]"
                placeholder="Commentaires"
              />
              <button
                onClick={() => deleteSaving(saving.id)}
                className="can "
              >
                <FaRegTrashCan />
              </button>
            </div>
          </div>
        ))}
      </>
    );
  }, [savings, updateSaving, deleteSaving, people]);

  return (
    <SectionHeader
      title="Épargne"
      infoTextKey="SAVINGS"
      defaultOpenedSection={true}
    >
      {memoizedNewSavingForm}
      {memoizedSavingsList}
    </SectionHeader>
  );
};

export default SavingsManager;
