import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { INFO_TEXTS } from "@/constants/index";
import { useAppContext } from "@/contexts/AppContext";
import SectionHeader from "@/components/ui/SectionHeader";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

const ContributionChart: React.FC = () => {
  const {
    contributions: { contributions },
    people,
    expenses,
  } = useAppContext();

  const hasRevenuesAndExpenses =
    people.some((person) => person.revenues.length > 0) && expenses.length > 0;

  if (!hasRevenuesAndExpenses) {
    return null;
  }

  const data = contributions.map((contribution) => ({
    name: contribution.name,
    value: contribution.contributionFoyer,
  }));

  return (
    <SectionHeader
      title="Répartition des contributions du foyer"
      infoText={INFO_TEXTS.CHART}
      defaultOpenedSection={true}
    >
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${Number(value).toFixed(2)} €`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </SectionHeader>
  );
};

export default ContributionChart;
