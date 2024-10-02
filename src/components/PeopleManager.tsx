import React from "react";
import { Person } from "../types/types";

interface PeopleManagerProps {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  handleAddPerson: () => void;
  handleRemovePerson: (index: number) => void;
  handlePercentageChange: (index: number, value: number) => void;
}

const PeopleManager: React.FC<PeopleManagerProps> = ({
  people,
  setPeople,
  handleAddPerson,
  handleRemovePerson,
  handlePercentageChange,
}) => {
  return (
    <div>
      <h2 className="text-xl mb-2">Personnes dans le foyer</h2>
      {people.map((person, personIndex) => (
        <div key={personIndex} className="flex items-center mb-2">
          <input
            type="text"
            value={person.name}
            onChange={(e) => {
              const updatedPeople = [...people];
              updatedPeople[personIndex].name = e.target.value;
              setPeople(updatedPeople);
            }}
            className="border rounded p-2 flex-1 text-black"
          />
          <input
            type="range"
            min="0"
            max="100"
            value={person.percentage}
            onChange={(e) =>
              handlePercentageChange(personIndex, Number(e.target.value))
            }
            className={`ml-2 ${
              people.length === 1 ? "bg-gray-200 cursor-not-allowed" : ""
            }`}
            disabled={people.length === 1}
          />
          <span>{person.percentage.toFixed(2)}%</span>
          {people.length > 1 && (
            <button
              onClick={() => handleRemovePerson(personIndex)}
              className="text-red-500 ml-2"
            >
              Supprimer
            </button>
          )}
        </div>
      ))}
      <button
        onClick={handleAddPerson}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Ajouter une personne
      </button>
    </div>
  );
};

export default PeopleManager;
