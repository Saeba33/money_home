import React, { useMemo } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { useAppContext } from "@/contexts/AppContext";
import SectionHeader from "@/components/ui/SectionHeader";

const ExpensesManager: React.FC = () => {
  const {
    expenses,
    newExpense,
    updateNewExpense,
    addExpense,
    updateExpense,
    deleteExpense,
    people,
  } = useAppContext();

  const memoizedNewExpenseForm = useMemo(
    () => (
      <div className="section-field bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex flex-wrap gap-2 w-full items-center">
          <input
            type="text"
            value={newExpense.name}
            onChange={(e) =>
              updateNewExpense({ ...newExpense, name: e.target.value })
            }
            className="input flex-grow min-w-[200px]"
            placeholder="Nom de la dépense"
          />
          <select
            value={newExpense.assignedTo}
            onChange={(e) =>
              updateNewExpense({ ...newExpense, assignedTo: e.target.value })
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
            value={newExpense.amount || ""}
            onChange={(e) =>
              updateNewExpense({
                ...newExpense,
                amount: Number(e.target.value),
              })
            }
            className="input w-full sm:w-32"
            placeholder="Montant"
          />
          <input
            type="text"
            value={newExpense.comments}
            onChange={(e) =>
              updateNewExpense({ ...newExpense, comments: e.target.value })
            }
            className="input flex-grow min-w-[200px] lg:flex-grow-[2]"
            placeholder="Commentaires"
          />
          <button onClick={addExpense} className="btn">
            Ajouter
          </button>
        </div>
      </div>
    ),
    [newExpense, updateNewExpense, addExpense, people]
  );

  const memoizedExpensesList = useMemo(() => {
    if (expenses.length === 0) return null;

    return (
      <>
        <h3 className="font-bold mt-4 mb-2">Liste des dépenses saisies</h3>
        <hr className="mb-4" />
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
              />
              <select
                value={expense.assignedTo}
                onChange={(e) =>
                  updateExpense(expense.id, {
                    ...expense,
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
                value={expense.amount || ""}
                onChange={(e) =>
                  updateExpense(expense.id, {
                    ...expense,
                    amount: Number(e.target.value),
                  })
                }
                className="input w-full sm:w-32"
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
              />
              <button
                onClick={() => deleteExpense(expense.id)}
                className="can"
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
      {memoizedNewExpenseForm}
      {memoizedExpensesList}
    </SectionHeader>
  );
};

export default ExpensesManager;
