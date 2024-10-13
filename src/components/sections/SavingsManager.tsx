import React, { useMemo } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { useAppContext } from "@/contexts/AppContext";
import SectionHeader from "@/components/ui/SectionHeader";

const SavingsManager: React.FC = () => {
  const {
    savings,
    draftSaving,
    updateDraftSaving,
    addSaving,
    updateSaving,
    deleteSaving,
    people,
  } = useAppContext();

  const memoizedDraftSavingForm = useMemo(
    () => (
      <div className="section-field bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex flex-wrap gap-2 w-full items-center">
          <input
            type="text"
            value={draftSaving.name}
            onChange={(e) =>
              updateDraftSaving({ ...draftSaving, name: e.target.value })
            }
            className="input flex-grow min-w-[200px]"
            placeholder="Nom de l'épargne"
            aria-label="Nom de l'épargne"
          />
          <select
            value={draftSaving.assignedTo}
            onChange={(e) =>
              updateDraftSaving({ ...draftSaving, assignedTo: e.target.value })
            }
            className="select"
            aria-label="Assigné à"
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
            value={draftSaving.amount || ""}
            onChange={(e) =>
              updateDraftSaving({ ...draftSaving, amount: Number(e.target.value) })
            }
            className="input w-full sm:w-32"
            placeholder="Montant"
            aria-label="Montant"
          />
          <input
            type="text"
            value={draftSaving.comments}
            onChange={(e) =>
              updateDraftSaving({ ...draftSaving, comments: e.target.value })
            }
            className="input flex-grow min-w-[200px] lg:flex-grow-[2]"
            placeholder="Commentaires"
            aria-label="Commentaires"
          />
          <button
            onClick={addSaving}
            className="btn"
            aria-label="Ajouter une épargne"
          >
            Ajouter
          </button>
        </div>
      </div>
    ),
    [draftSaving, updateDraftSaving, addSaving, people]
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
                aria-label="Nom de l'épargne"
              />
              <select
                value={saving.assignedTo}
                onChange={(e) =>
                  updateSaving(saving.id, {
                    ...saving,
                    assignedTo: e.target.value,
                  })
                }
                className="select"
                aria-label="Assigné à"
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
                aria-label="Montant"
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
                aria-label="Commentaires"
              />
              <button
                onClick={() => deleteSaving(saving.id)}
                className="can"
                aria-label="Supprimer l'épargne"
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
      {memoizedDraftSavingForm}
      {memoizedSavingsList}
    </SectionHeader>
  );
};

export default SavingsManager;
