import React from "react";
import { Expense, CustomExpense, Person } from "../types/types";

interface ExpenseManagerProps {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  customExpense: CustomExpense;
  setCustomExpense: React.Dispatch<React.SetStateAction<CustomExpense>>;
  people: Person[];
  handleExpenseChange: (
    index: number,
    field: keyof Expense,
    value: string
  ) => void;
  handleDeleteExpense: (index: number) => void;
  handleCustomExpenseChange: (
    field: keyof CustomExpense,
    value: string
  ) => void;
}

const ExpenseManager: React.FC<ExpenseManagerProps> = ({
  expenses,
  setExpenses,
  customExpense,
  setCustomExpense,
  people,
  handleExpenseChange,
  handleDeleteExpense,
  handleCustomExpenseChange,
}) => {
  return (
    <div>
      <h2 className="text-xl mt-4">Dépenses</h2>
      {expenses.map((expense, index) => (
        <div key={index} className="flex mb-2">
          <input
            type="text"
            value={expense.name}
            onChange={(e) => handleExpenseChange(index, "name", e.target.value)}
            className="border rounded p-2 text-black flex-1"
          />
          <input
            type="number"
            value={
              expense.amountMonthly !== undefined ? expense.amountMonthly : ""
            }
            onChange={(e) =>
              handleExpenseChange(index, "amountMonthly", e.target.value)
            }
            placeholder="Montant Mensuel"
            className="border rounded p-2 text-black"
          />
          <input
            type="number"
            value={
              expense.amountYearly !== undefined ? expense.amountYearly : ""
            }
            onChange={(e) =>
              handleExpenseChange(index, "amountYearly", e.target.value)
            }
            placeholder="Montant Annuel"
            className="border rounded p-2 text-black"
          />
          <input
            type="date"
            value={expense.date}
            onChange={(e) => handleExpenseChange(index, "date", e.target.value)}
            className="border rounded p-2 text-black"
          />
          <select
            value={expense.assignedTo}
            onChange={(e) =>
              handleExpenseChange(index, "assignedTo", e.target.value)
            }
            className="border rounded p-2"
          >
            <option value="foyer">Foyer</option>
            {people.map((person, personIndex) => (
              <option key={personIndex} value={person.name}>
                {person.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => handleDeleteExpense(index)}
            className="text-red-500"
          >
            Supprimer
          </button>
        </div>
      ))}
      <div className="flex mb-2">
        <input
          type="text"
          value={customExpense.name}
          onChange={(e) => handleCustomExpenseChange("name", e.target.value)}
          placeholder="Nom de la dépense personnalisée"
          className="border rounded p-2 text-black flex-1"
        />
        <input
          type="number"
          value={
            customExpense.amountMonthly !== undefined
              ? customExpense.amountMonthly
              : ""
          }
          onChange={(e) =>
            handleCustomExpenseChange("amountMonthly", e.target.value)
          }
          placeholder="Montant Mensuel"
          className="border rounded p-2 text-black"
        />
        <input
          type="number"
          value={
            customExpense.amountYearly !== undefined
              ? customExpense.amountYearly
              : ""
          }
          onChange={(e) =>
            handleCustomExpenseChange("amountYearly", e.target.value)
          }
          placeholder="Montant Annuel"
          className="border rounded p-2 text-black"
        />
        <input
          type="date"
          value={customExpense.date}
          onChange={(e) => handleCustomExpenseChange("date", e.target.value)}
          className="border rounded p-2 text-black"
        />
        <select
          value={customExpense.assignedTo}
          onChange={(e) =>
            handleCustomExpenseChange("assignedTo", e.target.value)
          }
          className="border rounded p-2"
        >
          <option value="foyer">Foyer</option>
          {people.map((person, personIndex) => (
            <option key={personIndex} value={person.name}>
              {person.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            if (
              customExpense.name &&
              (customExpense.amountMonthly !== undefined ||
                customExpense.amountYearly !== undefined)
            ) {
              const newExpense: Expense = {
                ...customExpense,
                date: new Date().toISOString().split("T")[0],
                amountMonthly: customExpense.amountMonthly
                  ? Number(customExpense.amountMonthly)
                  : undefined,
                amountYearly: customExpense.amountYearly
                  ? Number(customExpense.amountYearly)
                  : undefined,
              };

              setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

              setCustomExpense({
                name: "",
                amountMonthly: undefined,
                amountYearly: undefined,
                date: "",
                assignedTo: "foyer",
              });
            } else {
              alert(
                "Veuillez remplir le nom de la dépense et au moins un montant."
              );
            }
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ajouter une dépense personnalisée
        </button>
      </div>
    </div>
  );
};

export default ExpenseManager;
