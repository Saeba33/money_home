import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useAppContext } from "@/contexts/AppContext";
import SectionHeader from "@/components/ui/SectionHeader";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} cursor-pointer`}
      style={{ ...style, display: "block", right: "10px" }}
      onClick={onClick}
    >
      <FaChevronRight size={24} color="#333" />
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} cursor-pointer`}
      style={{ ...style, display: "block", left: "10px", zIndex: 1 }}
      onClick={onClick}
    >
      <FaChevronLeft size={24} color="#333" />
    </div>
  );
};

const ContributionChart: React.FC = () => {
  const { contributions } = useAppContext();

  if (
    !contributions.contributions ||
    contributions.contributions.length === 0 ||
    !contributions.summary
  ) {
    return <div>Aucune donnée disponible pour afficher les graphiques.</div>;
  }

  const pieChartData = contributions.contributions.map((c) => ({
    name: c.name,
    value: c.contributionFoyer,
  }));

  const barChartData = contributions.contributions.map((c) => ({
    name: c.name,
    Revenus: c.totalRevenue,
    Dépenses: c.personalExpenses + c.contributionFoyer,
    Épargne: c.personalSavings,
  }));

  const lineChartData = [
    { name: "Revenus", value: contributions.summary.totalRevenues },
    { name: "Dépenses", value: contributions.summary.totalExpenses },
    { name: "Épargne", value: contributions.summary.totalSavings },
    { name: "Balance", value: contributions.summary.totalBalance },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots: any) => (
      <div style={{ bottom: "-30px" }}>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          background: i === 0 ? "#333" : "#ccc",
          borderRadius: "50%",
          margin: "0 5px",
        }}
      />
    ),
  };

  return (
    <SectionHeader
      title="Graphiques des Contributions"
      infoTextKey="CHARTS"
      defaultOpenedSection={false}
    >
      <div className="relative pb-10">
        <Slider {...sliderSettings}>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-center">
              Répartition des contributions au foyer
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-center">
              Comparaison des revenus, dépenses et épargnes par personne
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={barChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Revenus" fill="#0088FE" />
                <Bar dataKey="Dépenses" fill="#00C49F" />
                <Bar dataKey="Épargne" fill="#FFBB28" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-center">
              Aperçu global des finances
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={lineChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Slider>
      </div>
    </SectionHeader>
  );
};

export default ContributionChart;
