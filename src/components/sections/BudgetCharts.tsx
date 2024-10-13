import React from "react";
import Slider from "react-slick";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useAppContext } from "@/contexts/AppContext";
import SectionHeader from "@/components/ui/SectionHeader";
import { CustomTooltipProps } from "@/types/types";

const COLORS = {
  "Revenus personnels": "#0088FE",
  "Revenus du foyer": "#00C49F",
  "Dépenses personnelles": "#FFBB28",
  "Dépenses du foyer": "#FF8042",
  "Épargne personnelle": "#8884d8",
  "Épargne du foyer": "#82ca9d",
};

const BudgetCharts: React.FC = () => {
  const { budgets, people } = useAppContext();

  if (!budgets.budgets || budgets.budgets.length === 0 || !budgets.summary) {
    return <div>Aucune donnée disponible pour afficher les graphiques.</div>;
  }

  const pieChartData = budgets.budgets.map((b) => ({
    name: b.name,
    value: b.totalOutflows,
  }));

  const barChartData = budgets.budgets.map((b) => ({
    name: b.name,
    "Revenus personnels": b.personalIncome,
    "Revenus du foyer": b.foyerIncome,
    "Dépenses personnelles": b.personalExpenses,
    "Dépenses du foyer": b.foyerExpenses,
    "Épargne personnelle": b.personalSavings,
    "Épargne du foyer": b.foyerSavings,
  }));

  const lineChartData = [
    {
      name: "Revenus totaux",
      Montant: budgets.summary.totalGlobalIncome,
    },
    {
      name: "Dépenses totales",
      Montant: budgets.summary.totalGlobalExpenses,
    },
    {
      name: "Épargne totale",
      Montant: budgets.summary.totalGlobalSavings,
    },
    { name: "Balance", Montant: budgets.summary.totalBalance },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    arrows: false,
  };

  const PieChartTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
  }) => {
    if (active && payload && payload.length) {
      const totalOutflows = pieChartData.reduce(
        (sum, item) => sum + item.value,
        0
      );
      const percentage = ((payload[0].value / totalOutflows) * 100).toFixed(2);
      return (
        <div className="custom-tooltip bg-white p-2 border border-gray-300">
          <p className="label">{`${
            payload[0].payload.name
          } : ${payload[0].value.toFixed(2)} €`}</p>
          <p className="intro">{`${percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  const BarChartTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white p-2 border border-gray-300">
          <p className="label">{`${label}`}</p>
          {payload.map((pld) => (
            <p
              key={pld.name}
              style={{ color: COLORS[pld.name as keyof typeof COLORS] }}
            >
              {`${pld.name} : ${pld.value.toFixed(2)} €`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const LineChartTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white p-2 border border-gray-300">
          <p className="label">{`${label} : ${payload[0].value.toFixed(
            2
          )} €`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <SectionHeader
      title="Graphiques du Budget"
      infoTextKey="CHARTS"
      defaultOpenedSection={false}
    >
      <div className="budget-charts-container">
        <Slider {...sliderSettings}>
          {people.length > 1 && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center h-16">
                Répartition des dépenses et épargnes au foyer
              </h3>
              <ResponsiveContainer width="100%" height={500}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          Object.values(COLORS)[
                            index % Object.values(COLORS).length
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<PieChartTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          <div>
            <h3 className="text-xl font-semibold mb-4 text-center h-16">
              Comparaison revenus, dépenses et épargnes
            </h3>
            <ResponsiveContainer width="100%" height={500}>
              <BarChart data={barChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<BarChartTooltip />} />
                <Legend />
                <Bar
                  dataKey="Revenus personnels"
                  stackId="a"
                  fill={COLORS["Revenus personnels"]}
                />
                <Bar
                  dataKey="Revenus du foyer"
                  stackId="a"
                  fill={COLORS["Revenus du foyer"]}
                />
                <Bar
                  dataKey="Dépenses personnelles"
                  stackId="b"
                  fill={COLORS["Dépenses personnelles"]}
                />
                <Bar
                  dataKey="Dépenses du foyer"
                  stackId="b"
                  fill={COLORS["Dépenses du foyer"]}
                />
                <Bar
                  dataKey="Épargne personnelle"
                  stackId="b"
                  fill={COLORS["Épargne personnelle"]}
                />
                <Bar
                  dataKey="Épargne du foyer"
                  stackId="b"
                  fill={COLORS["Épargne du foyer"]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-center h-16">
              Aperçu global des finances du foyer
            </h3>
            <ResponsiveContainer width="100%" height={500}>
              <LineChart data={lineChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<LineChartTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="Montant" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Slider>
      </div>
      <style jsx global>{`
        .budget-charts-container {
          padding-bottom: 40px;
        }
        .slick-dots {
          bottom: -40px;
        }
        .slick-dots li button:before {
          font-size: 12px;
          color: #333;
        }
        .slick-dots li.slick-active button:before {
          color: #0088fe;
        }
        .h-16 {
          height: 4rem;
        }
      `}</style>
    </SectionHeader>
  );
};

export default BudgetCharts;
