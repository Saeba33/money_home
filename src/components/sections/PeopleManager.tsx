import React, { useMemo } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { useAppContext } from "@/contexts/AppContext";
import SectionHeader from "@/components/ui/SectionHeader";

const PeopleManager: React.FC = () => {
  const {
    people,
    addPerson,
    updatePerson,
    deletePerson,
    updatePersonPercentage,
    percentageWarning,
  } = useAppContext();

  const memoizedPeopleList = useMemo(() => {
    return people.map((person, index) => {
      const placeholderText = `Personne ${index + 1}`;

      return (
        <div
          key={person.id}
          className="section-field flex items-center space-x-2 mb-2"
        >
          <div className="relative flex-grow">
            <input
              type="text"
              value={person.name === placeholderText ? "" : person.name}
              onChange={(e) => {
                const newName = e.target.value || placeholderText;
                updatePerson(person.id, { name: newName });
              }}
              className={`input w-full min-w-0 text-sm sm:text-base ${
                person.name === placeholderText ? "text-gray-400" : ""
              }`}
              maxLength={50}
              placeholder={placeholderText}
            />
          </div>
          {people.length > 1 && (
            <>
              <div className="flex items-center flex-shrink-0 w-24 sm:w-32 md:w-40">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={person.percentage}
                  onChange={(e) =>
                    updatePersonPercentage(person.id, Number(e.target.value))
                  }
                  className="w-full"
                />
                <span className="ml-1 text-xs sm:text-sm w-10 text-right">
                  {person.percentage.toFixed(0)}%
                </span>
              </div>
              <button
                onClick={() => deletePerson(person.id)}
                className="can flex-shrink-0"
              >
                <FaRegTrashCan className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </>
          )}
        </div>
      );
    });
  }, [people, updatePerson, deletePerson, updatePersonPercentage]);

  return (
    <SectionHeader
      title="Personnes dans le foyer"
      infoTextKey="PEOPLE"
      defaultOpenedSection={true}
    >
      <div className="space-y-2">
        {memoizedPeopleList}
        {percentageWarning && (
          <div className="text-orange-500 mt-2">{percentageWarning}</div>
        )}
        <button onClick={addPerson} className="btn w-full sm:w-auto">
          Ajouter une personne
        </button>
      </div>
    </SectionHeader>
  );
};

export default PeopleManager;
