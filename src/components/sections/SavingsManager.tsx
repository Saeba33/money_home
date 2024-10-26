import SectionHeader from "@/components/ui/SectionHeader";
import { useAppContext } from "@/contexts/AppContext";
import React, { useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

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
      <div className="flex flex-wrap md:flex-nowrap items-center gap-2 w-full ">
        <input
          type="text"
          value={draftSaving.name}
          onChange={(e) =>
            updateDraftSaving({ ...draftSaving, name: e.target.value })
          }
          className="input w-full md:w-[180px] flex-shrink-0"
          placeholder="Nom de l'épargne"
          aria-label="Nom de l'épargne"
        />
        <select
          value={draftSaving.assignedTo}
          onChange={(e) =>
            updateDraftSaving({ ...draftSaving, assignedTo: e.target.value })
          }
          className="select w-full md:w-auto flex-shrink-0"
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
            updateDraftSaving({
              ...draftSaving,
              amount: Number(e.target.value),
            })
          }
          className="input w-full md:w-32 flex-shrink-0"
          placeholder="Montant"
          aria-label="Montant"
        />
        <div className="w-full md:flex-1 flex gap-2 items-center min-w-0">
          <input
            type="text"
            value={draftSaving.comments}
            onChange={(e) =>
              updateDraftSaving({ ...draftSaving, comments: e.target.value })
            }
            className="input flex-1 min-w-0"
            placeholder="Commentaires"
            aria-label="Commentaires"
          />
          <button
            onClick={addSaving}
            className="add-button-icon flex-shrink-0"
            aria-label="Ajouter une épargne"
          >
            <FaPlus />
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
        <h3 className="list">Liste des épargnes saisies</h3>
        {savings.map((saving) => (
          <div
            key={saving.id}
            className="flex flex-wrap md:flex-nowrap md:pb-2 pb-8 items-center gap-2 w-full"
          >
            <input
              type="text"
              value={saving.name}
              onChange={(e) =>
                updateSaving(saving.id, { ...saving, name: e.target.value })
              }
              className="input w-full md:w-[180px] flex-shrink-0"
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
              className="select w-full md:w-auto flex-shrink-0"
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
              className="input w-full md:w-32 flex-shrink-0"
              aria-label="Montant"
            />
            <div className="w-full md:flex-1 flex gap-2 items-center min-w-0">
              <input
                type="text"
                value={saving.comments}
                onChange={(e) =>
                  updateSaving(saving.id, {
                    ...saving,
                    comments: e.target.value,
                  })
                }
                className="input flex-1 min-w-0"
                placeholder="Commentaires"
                aria-label="Commentaires"
              />
              <button
                onClick={() => deleteSaving(saving.id)}
                className="delete-button-icon flex-shrink-0"
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
      <div className="flex flex-col w-full">
        {memoizedDraftSavingForm}
        {memoizedSavingsList}
      </div>
    </SectionHeader>
  );
};

export default SavingsManager;
