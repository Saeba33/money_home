import React, { useMemo } from "react";
import { useAppContext } from "../contexts/AppContext";
import { INFO_TEXTS } from "../constants/index";
import { FaRegTrashCan } from "react-icons/fa6";
import SectionHeader from "./SectionHeader";

const PeopleManager: React.FC = () => {
  const {
    people,
    setPeople,
    handleAddPerson,
    handleRemovePerson,
    handlePercentageChange,
  } = useAppContext();

  const memoizedPeopleList = useMemo(() => {
    return people.map((person, personIndex) => (
      <div
        key={personIndex}
        className="section-field flex items-center space-x-2 mb-2"
      >
        <input
          type="text"
          value={person.name}
          onChange={(e) => {
            const updatedPeople = [...people];
            updatedPeople[personIndex].name = e.target.value;
            setPeople(updatedPeople);
          }}
          className="input flex-grow min-w-0 text-sm sm:text-base"
          maxLength={50}
        />
        {people.length > 1 && (
          <>
            <div className="flex items-center flex-shrink-0 w-24 sm:w-32 md:w-40">
              <input
                type="range"
                min="0"
                max="100"
                value={person.percentage}
                onChange={(e) =>
                  handlePercentageChange(personIndex, Number(e.target.value))
                }
                className="w-full"
              />
              <span className="ml-1 text-xs sm:text-sm w-10 text-right">
                {person.percentage.toFixed(0)}%
              </span>
            </div>
            <button
              onClick={() => handleRemovePerson(personIndex)}
              className="can flex-shrink-0"
            >
              <FaRegTrashCan className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </>
        )}
      </div>
    ));
  }, [people, setPeople, handlePercentageChange, handleRemovePerson]);

  return (
    <SectionHeader
      title="Personnes dans le foyer"
      infoText={INFO_TEXTS.PEOPLE}
      defaultOpenedSection={true}
    >
      <div className="space-y-2">
        {memoizedPeopleList}
        <button onClick={handleAddPerson} className="btn w-full sm:w-auto">
          Ajouter une personne
        </button>
      </div>
    </SectionHeader>
  );
};

export default PeopleManager;
