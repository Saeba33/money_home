import React from "react";
import { Person, Revenue } from "../types/types";

interface IncomeManagerProps {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  newRevenue: Revenue;
  setNewRevenue: React.Dispatch<React.SetStateAction<Revenue>>;
  handleAddOrUpdateRevenue: () => void;
  handleDeleteRevenue: (personIndex: number, revenueIndex: number) => void;
}

const IncomeManager: React.FC<IncomeManagerProps> = ({
  people,
  setPeople,
  newRevenue,
  setNewRevenue,
  handleAddOrUpdateRevenue,
  handleDeleteRevenue,
}) => {
  return (
    <div>
      <h2 className="text-xl mt-4">Revenus</h2>
      <div className="flex mb-2">
        <input
          type="text"
          placeholder="Source de revenu"
          value={newRevenue.name}
          onChange={(e) =>
            setNewRevenue({ ...newRevenue, name: e.target.value })
          }
          className="border rounded p-2 text-black flex-1"
        />
        <input
          type="number"
          placeholder="Montant"
          value={newRevenue.amount !== undefined ? newRevenue.amount : ""}
          onChange={(e) =>
            setNewRevenue({ ...newRevenue, amount: Number(e.target.value) })
          }
          className="border rounded p-2 text-black"
        />
        <select
          value={newRevenue.assignedTo}
          onChange={(e) =>
            setNewRevenue({ ...newRevenue, assignedTo: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="foyer">Foyer</option>
          {people.map((person, personIndex) => (
            <option key={personIndex} value={person.name}>
              {person.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddOrUpdateRevenue}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ajouter un revenu
        </button>
      </div>

      {people.flatMap((person, personIndex) =>
        person.revenues.map((revenue, revenueIndex) => (
          <div
            key={`${personIndex}-${revenueIndex}`}
            className="flex space-x-2 mb-2"
          >
            <input
              type="text"
              value={revenue.name}
              onChange={(e) => {
                const updatedPeople = [...people];
                updatedPeople[personIndex].revenues[revenueIndex].name =
                  e.target.value;
                setPeople(updatedPeople);
              }}
              className="border rounded p-2 text-black flex-1"
            />
            <input
              type="number"
              value={revenue.amount !== undefined ? revenue.amount : ""}
              onChange={(e) => {
                const updatedPeople = [...people];
                updatedPeople[personIndex].revenues[revenueIndex].amount =
                  Number(e.target.value);
                setPeople(updatedPeople);
              }}
              className="border rounded p-2 text-black"
            />
            <select
              value={revenue.assignedTo}
              onChange={(e) => {
                const updatedPeople = [...people];
                updatedPeople[personIndex].revenues[revenueIndex].assignedTo =
                  e.target.value;
                setPeople(updatedPeople);
              }}
              className="border p-2 rounded"
            >
              <option value="foyer">Foyer</option>
              {people.map((person, idx) => (
                <option key={idx} value={person.name}>
                  {person.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => handleDeleteRevenue(personIndex, revenueIndex)}
              className="text-red-500"
            >
              Supprimer
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default IncomeManager;
