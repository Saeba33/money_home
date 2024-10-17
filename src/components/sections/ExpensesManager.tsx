import SectionHeader from "@/components/ui/SectionHeader";
import { useAppContext } from "@/contexts/AppContext";
import React, { useMemo } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

const ExpensesManager: React.FC = () => {
  const {
    expenses,
    draftExpense,
    updateDraftExpense,
    addExpense,
    updateExpense,
    deleteExpense,
    people,
  } = useAppContext();

  const memoizedDraftExpenseForm = useMemo(
    () => (
      <div className="section-field bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex flex-wrap gap-2 w-full items-center">
          <input
            type="text"
            value={draftExpense.name}
            onChange={(e) =>
              updateDraftExpense({ ...draftExpense, name: e.target.value })
            }
            className="input flex-grow min-w-[200px]"
            placeholder="Nom de la dépense"
            aria-label="Nom de la dépense"
          />
          <select
            value={draftExpense.assignedTo}
            onChange={(e) =>
              updateDraftExpense({
                ...draftExpense,
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
            value={draftExpense.amount || ""}
            onChange={(e) =>
              updateDraftExpense({
                ...draftExpense,
                amount: Number(e.target.value),
              })
            }
            className="input w-full sm:w-32"
            placeholder="Montant"
            aria-label="Montant"
          />
          <input
            type="text"
            value={draftExpense.comments}
            onChange={(e) =>
              updateDraftExpense({ ...draftExpense, comments: e.target.value })
            }
            className="input flex-grow min-w-[200px] lg:flex-grow-[2]"
            placeholder="Commentaires"
            aria-label="Commentaires"
          />
          <button
            onClick={addExpense}
            className="add-button"
            aria-label="Ajouter une dépense"
          >
            Ajouter
          </button>
        </div>
      </div>
    ),
    [draftExpense, updateDraftExpense, addExpense, people]
  );

  const memoizedExpensesList = useMemo(() => {
    if (expenses.length === 0) return null;

    return (
      <>
        <h3 className="list">Liste des dépenses saisies</h3>
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="section-field bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4"
          >
            <div className="flex flex-wrap gap-2 w-full items-center">
              <input
                type="text"
                value={expense.name}
                onChange={(e) =>
                  updateExpense(expense.id, {
                    ...expense,
                    name: e.target.value,
                  })
                }
                className="input flex-grow min-w-[200px]"
                aria-label="Nom de la dépense"
              />
              <select
                value={expense.assignedTo}
                onChange={(e) =>
                  updateExpense(expense.id, {
                    ...expense,
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
                value={expense.amount || ""}
                onChange={(e) =>
                  updateExpense(expense.id, {
                    ...expense,
                    amount: Number(e.target.value),
                  })
                }
                className="input w-full sm:w-32"
                placeholder="Montant"
                aria-label="Montant"
              />
              <input
                type="text"
                value={expense.comments}
                onChange={(e) =>
                  updateExpense(expense.id, {
                    ...expense,
                    comments: e.target.value,
                  })
                }
                className="input flex-grow min-w-[200px] lg:flex-grow-[2]"
                placeholder="Commentaires"
                aria-label="Commentaires"
              />
              <button
                onClick={() => deleteExpense(expense.id)}
                className="delete-button"
                aria-label="Supprimer la dépense"
              >
                <FaRegTrashCan />
              </button>
            </div>
          </div>
        ))}
      </>
    );
  }, [expenses, updateExpense, deleteExpense, people]);

  return (
    <SectionHeader
      title="Dépenses"
      infoTextKey="EXPENSES"
      defaultOpenedSection={true}
    >
      {memoizedDraftExpenseForm}
      {memoizedExpensesList}
    </SectionHeader>
  );
};

export default ExpensesManager;
