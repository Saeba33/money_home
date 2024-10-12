import SectionHeader from "@/components/ui/SectionHeader";
import { useAppContext } from "@/contexts/AppContext";
import React, { useMemo } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

const IncomeManager: React.FC = () => {
  const {
    income,
    newIncome,
    updateNewIncome,
    addIncome,
    updateIncome,
    deleteIncome,
    people,
  } = useAppContext();

  const memoizedNewIncomeForm = useMemo(
    () => (
      <div className="section-field bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex flex-wrap gap-2 w-full items-center">
          <input
            type="text"
            value={newIncome.name}
            onChange={(e) =>
              updateNewIncome({ ...newIncome, name: e.target.value })
            }
            className="input flex-grow min-w-[200px]"
            placeholder="Nom du revenu"
            aria-label="Nom du revenu"
          />
          <select
            value={newIncome.assignedTo}
            onChange={(e) =>
              updateNewIncome({ ...newIncome, assignedTo: e.target.value })
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
            value={newIncome.amount || ""}
            onChange={(e) =>
              updateNewIncome({
                ...newIncome,
                amount: Number(e.target.value),
              })
            }
            className="input w-full sm:w-32"
            placeholder="Montant"
            aria-label="Montant"
          />
          <input
            type="text"
            value={newIncome.comments}
            onChange={(e) =>
              updateNewIncome({ ...newIncome, comments: e.target.value })
            }
            className="input flex-grow min-w-[200px] lg:flex-grow-[2]"
            placeholder="Commentaires"
            aria-label="Commentaires"
          />
          <button
            onClick={addIncome}
            className="btn"
            aria-label="Ajouter un revenu"
          >
            Ajouter
          </button>
        </div>
      </div>
    ),
    [newIncome, updateNewIncome, addIncome, people]
  );

  const memoizedIncomeList = useMemo(() => {
    if (income.length === 0) return null;

    return (
      <>
        <h3 className="font-bold mt-4 mb-2">Liste des revenus saisis</h3>
        <hr className="mb-4" />
        {income.map((income) => (
          <div
            key={income.id}
            className="section-field bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4"
          >
            <div className="flex flex-wrap gap-2 w-full items-center">
              <input
                type="text"
                value={income.name}
                onChange={(e) =>
                  updateIncome(income.id, {
                    ...income,
                    name: e.target.value,
                  })
                }
                className="input flex-grow min-w-[200px]"
                aria-label="Nom du revenu"
              />
              <select
                value={income.assignedTo}
                onChange={(e) =>
                  updateIncome(income.id, {
                    ...income,
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
                value={income.amount || ""}
                onChange={(e) =>
                  updateIncome(income.id, {
                    ...income,
                    amount: Number(e.target.value),
                  })
                }
                className="input w-full sm:w-32"
                aria-label="Montant"
              />
              <input
                type="text"
                value={income.comments}
                onChange={(e) =>
                  updateIncome(income.id, {
                    ...income,
                    comments: e.target.value,
                  })
                }
                className="input flex-grow min-w-[200px] lg:flex-grow-[2]"
                placeholder="Commentaires"
                aria-label="Commentaires"
              />
              <button
                onClick={() => deleteIncome(income.id)}
                className="can"
                aria-label="Supprimer le revenu"
              >
                <FaRegTrashCan />
              </button>
            </div>
          </div>
        ))}
      </>
    );
  }, [income, updateIncome, deleteIncome, people]);

  return (
    <SectionHeader
      title="Revenus"
      infoTextKey="INCOME"
      defaultOpenedSection={true}
    >
      {memoizedNewIncomeForm}
      {memoizedIncomeList}
    </SectionHeader>
  );
};

export default IncomeManager;
