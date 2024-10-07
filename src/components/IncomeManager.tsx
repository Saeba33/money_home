import React, { useMemo } from "react";
import { useAppContext } from "../contexts/AppContext";
import { INFO_TEXTS } from "../constants/index";
import { FaRegTrashCan } from "react-icons/fa6";
import SectionHeader from "./SectionHeader";

const IncomeManager: React.FC = () => {
  const {
    people,
    setPeople,
    newRevenue,
    setNewRevenue,
    addOrUpdateRevenue,
    deleteRevenue,
  } = useAppContext();

  const RevenueItem = ({
    revenue,
    personIndex,
    revenueIndex,
    isNew = false,
  }) => (
    <div className="section-field bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex flex-wrap gap-2 items-center w-full">
        <input
          type="text"
          value={revenue.name}
          onChange={(e) => {
            const updatedValue = e.target.value;
            isNew
              ? setNewRevenue({ ...revenue, name: updatedValue })
              : updateRevenue(personIndex, revenueIndex, {
                  name: updatedValue,
                });
          }}
          className="input flex-grow min-w-[200px]"
          placeholder="Nom du revenu"
        />
        <select
          value={revenue.assignedTo}
          onChange={(e) => {
            const updatedValue = e.target.value;
            isNew
              ? setNewRevenue({ ...revenue, assignedTo: updatedValue })
              : updateRevenue(personIndex, revenueIndex, {
                  assignedTo: updatedValue,
                });
          }}
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
          value={revenue.amount}
          onChange={(e) => {
            const updatedValue = Number(e.target.value);
            isNew
              ? setNewRevenue({ ...revenue, amount: updatedValue })
              : updateRevenue(personIndex, revenueIndex, {
                  amount: updatedValue,
                });
          }}
          className="input w-full sm:w-32"
          placeholder="Montant"
        />
        <input
          type="text"
          value={revenue.comments}
          onChange={(e) => {
            const updatedValue = e.target.value;
            isNew
              ? setNewRevenue({ ...revenue, comments: updatedValue })
              : updateRevenue(personIndex, revenueIndex, {
                  comments: updatedValue,
                });
          }}
          className="input flex-grow min-w-[200px] lg:flex-grow-[2]"
          placeholder="Commentaires"
        />
        {isNew ? (
          <button onClick={addOrUpdateRevenue} className="btn w-full sm:w-auto">
            Ajouter
          </button>
        ) : (
          <button
            onClick={() => deleteRevenue(personIndex, revenueIndex)}
            className="can w-full sm:w-auto"
          >
            <FaRegTrashCan />
          </button>
        )}
      </div>
    </div>
  );

  const updateRevenue = (personIndex, revenueIndex, updates) => {
    const updatedPeople = [...people];
    updatedPeople[personIndex].revenues[revenueIndex] = {
      ...updatedPeople[personIndex].revenues[revenueIndex],
      ...updates,
    };
    setPeople(updatedPeople);
  };

  const memoizedRevenueList = useMemo(() => {
    return people.flatMap((person, personIndex) =>
      person.revenues.map((revenue, revenueIndex) => (
        <RevenueItem
          key={`${personIndex}-${revenueIndex}`}
          revenue={revenue}
          personIndex={personIndex}
          revenueIndex={revenueIndex}
        />
      ))
    );
  }, [people, deleteRevenue]);

  const memoizedNewRevenueForm = useMemo(
    () => (
      <RevenueItem
        revenue={newRevenue}
        personIndex={-1}
        revenueIndex={-1}
        isNew={true}
      />
    ),
    [newRevenue, setNewRevenue, addOrUpdateRevenue]
  );

  return (
    <SectionHeader
      title="Revenus"
      infoText={INFO_TEXTS.INCOME}
      defaultOpenedSection={true}
    >
      {memoizedNewRevenueForm}
      {memoizedRevenueList}
    </SectionHeader>
  );
};

export default IncomeManager;
