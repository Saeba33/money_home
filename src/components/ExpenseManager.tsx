import React, { useMemo } from "react";
import { useAppContext } from "../contexts/AppContext";
import { INFO_TEXTS } from "../constants/index";
import { FaRegTrashCan } from "react-icons/fa6";
import SectionHeader from "./SectionHeader";

const ExpenseManager: React.FC = () => {
  const {
    expenses,
    newExpense,
    people,
    handleExpenseChange,
    handleDeleteExpense,
    handleNewExpenseChange,
    addNewExpense,
  } = useAppContext();

  const ExpenseItem = ({ expense, index, isNew = false }) => (
    <div className="section-field flex flex-col bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex flex-col sm:flex-row gap-2 mb-2">
        <div className="flex flex-grow gap-2 min-w-0">
          <input
            type="text"
            value={expense.name}
            onChange={(e) =>
              isNew
                ? handleNewExpenseChange("name", e.target.value)
                : handleExpenseChange(index, "name", e.target.value)
            }
            className="input flex-grow min-w-0"
            placeholder="Nom de la dépense"
          />
          <select
            value={expense.assignedTo}
            onChange={(e) =>
              isNew
                ? handleNewExpenseChange("assignedTo", e.target.value)
                : handleExpenseChange(index, "assignedTo", e.target.value)
            }
            className="input w-24 sm:w-32 flex-shrink-0"
          >
            <option value="foyer">Foyer</option>
            {people.map((person, personIndex) => (
              <option key={personIndex} value={person.name}>
                {person.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            value={
              expense.amountMonthly !== undefined ? expense.amountMonthly : ""
            }
            onChange={(e) =>
              isNew
                ? handleNewExpenseChange("amountMonthly", e.target.value)
                : handleExpenseChange(index, "amountMonthly", e.target.value)
            }
            placeholder="Montant Mensuel"
            className="input w-full sm:w-32"
          />
          <input
            type="number"
            value={
              expense.amountYearly !== undefined ? expense.amountYearly : ""
            }
            onChange={(e) =>
              isNew
                ? handleNewExpenseChange("amountYearly", e.target.value)
                : handleExpenseChange(index, "amountYearly", e.target.value)
            }
            placeholder="Montant Annuel"
            className="input w-full sm:w-32"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <textarea
          value={expense.comments}
          onChange={(e) =>
            isNew
              ? handleNewExpenseChange("comments", e.target.value)
              : handleExpenseChange(index, "comments", e.target.value)
          }
          placeholder="Commentaires"
          maxLength={500}
          className="input flex-grow"
        />
        {isNew ? (
          <button
            onClick={addNewExpense}
            className="btn self-stretch flex items-center justify-center"
          >
            Ajouter
          </button>
        ) : (
          <button
            onClick={() => handleDeleteExpense(index)}
            className="can self-stretch flex items-center justify-center"
          >
            <FaRegTrashCan />
          </button>
        )}
      </div>
    </div>
  );

  const memoizedExpenseList = useMemo(() => {
    return expenses.map((expense, index) => (
      <ExpenseItem key={index} expense={expense} index={index} />
    ));
  }, [expenses, people, handleExpenseChange, handleDeleteExpense]);

  const memoizedNewExpenseForm = useMemo(
    () => <ExpenseItem expense={newExpense} index={-1} isNew={true} />,
    [newExpense, people, handleNewExpenseChange, addNewExpense]
  );

  return (
    <SectionHeader
      title="Dépenses"
      infoText={INFO_TEXTS.EXPENSES}
      defaultOpenedSection={true}
    >
      {memoizedExpenseList}
      {memoizedNewExpenseForm}
    </SectionHeader>
  );
};

export default ExpenseManager;
