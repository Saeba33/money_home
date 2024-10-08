import React, { useMemo } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { INFO_TEXTS } from "@/constants/index";
import { useAppContext } from "@/contexts/AppContext";
import SectionHeader from "@/components/ui/SectionHeader";

const RevenuesManager: React.FC = () => {
  const {
    revenues,
    newRevenue,
    updateNewRevenue,
    addRevenue,
    updateRevenue,
    deleteRevenue,
    people,
  } = useAppContext();

  const memoizedNewRevenueForm = useMemo(
    () => (
      <div className="section-field bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex flex-wrap gap-2 w-full items-center">
          <input
            type="text"
            value={newRevenue.name}
            onChange={(e) =>
              updateNewRevenue({ ...newRevenue, name: e.target.value })
            }
            className="input flex-grow min-w-[200px]"
            placeholder="Nom du revenu"
          />
          <select
            value={newRevenue.assignedTo}
            onChange={(e) =>
              updateNewRevenue({ ...newRevenue, assignedTo: e.target.value })
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
            value={newRevenue.amount || ""}
            onChange={(e) =>
              updateNewRevenue({
                ...newRevenue,
                amount: Number(e.target.value),
              })
            }
            className="input w-full sm:w-32"
            placeholder="Montant"
          />
          <input
            type="text"
            value={newRevenue.comments}
            onChange={(e) =>
              updateNewRevenue({ ...newRevenue, comments: e.target.value })
            }
            className="input flex-grow min-w-[200px] lg:flex-grow-[2]"
            placeholder="Commentaires"
          />
          <button onClick={addRevenue} className="btn w-full sm:w-auto">
            Ajouter
          </button>
        </div>
      </div>
    ),
    [newRevenue, updateNewRevenue, addRevenue, people]
  );

  const memoizedRevenueList = useMemo(() => {
    if (revenues.length === 0) return null;

    return (
      <>
        <h3 className="font-bold mt-4 mb-2">Liste des revenus saisis</h3>
        <hr className="mb-4" />
        {revenues.map((revenue) => (
          <div
            key={revenue.id}
            className="section-field bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4"
          >
            <div className="flex flex-wrap gap-2 w-full items-center">
              <input
                type="text"
                value={revenue.name}
                onChange={(e) =>
                  updateRevenue(revenue.id, {
                    ...revenue,
                    name: e.target.value,
                  })
                }
                className="input flex-grow min-w-[200px]"
              />
              <select
                value={revenue.assignedTo}
                onChange={(e) =>
                  updateRevenue(revenue.id, {
                    ...revenue,
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
                value={revenue.amount || ""}
                onChange={(e) =>
                  updateRevenue(revenue.id, {
                    ...revenue,
                    amount: Number(e.target.value),
                  })
                }
                className="input w-full sm:w-32"
              />
              <input
                type="text"
                value={revenue.comments}
                onChange={(e) =>
                  updateRevenue(revenue.id, {
                    ...revenue,
                    comments: e.target.value,
                  })
                }
                className="input flex-grow min-w-[200px] lg:flex-grow-[2]"
                placeholder="Commentaires"
              />
              <button
                onClick={() => deleteRevenue(revenue.id)}
                className="can w-full sm:w-auto"
              >
                <FaRegTrashCan />
              </button>
            </div>
          </div>
        ))}
      </>
    );
  }, [revenues, updateRevenue, deleteRevenue, people]);

  return (
    <SectionHeader
      title="Revenus"
      infoText={INFO_TEXTS.REVENUES}
      defaultOpenedSection={true}
    >
      {memoizedNewRevenueForm}
      {memoizedRevenueList}
    </SectionHeader>
  );
};

export default RevenuesManager;
