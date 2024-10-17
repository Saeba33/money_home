import React, { useState, useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";
import SectionHeader from "@/components/ui/SectionHeader";
import { useCharts } from "@/hooks/useCharts";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
);

const BudgetCharts: React.FC = () => {
  const {
    pieChartData,
    barChartData,
    lineChartData,
    pieChartOptions,
    barChartOptions,
    lineChartOptions,
    peopleCount,
  } = useCharts();

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const slides: { title: string; chart: JSX.Element }[] = [
    ...(peopleCount > 1
      ? [
          {
            title: "Répartition des dépenses et épargnes par personne",
            chart: (
              <Pie
                data={pieChartData as ChartData<"pie", number[], string>}
                options={pieChartOptions as ChartOptions<"pie">}
              />
            ),
          },
        ]
      : []),
    {
      title: "Comparaison revenus, dépenses et épargnes",
      chart: (
        <Bar
          data={barChartData as ChartData<"bar", number[], string>}
          options={barChartOptions as ChartOptions<"bar">}
        />
      ),
    },
    {
      title: "Aperçu global des finances du foyer",
      chart: (
        <Line
          data={lineChartData as ChartData<"line", number[], string>}
          options={lineChartOptions as ChartOptions<"line">}
        />
      ),
    },
  ];

  useEffect(() => {
    if (currentSlide >= slides.length) {
      setCurrentSlide(0);
    }
  }, [peopleCount, currentSlide, slides.length]);

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    setIsDragging(true);
    setStartX("touches" in e ? e.touches[0].clientX : e.clientX);
  };

  const handleDragMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!isDragging) return;

    const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
      setIsDragging(false);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <SectionHeader
      title="Graphiques du Budget"
      infoTextKey="CHARTS"
      defaultOpenedSection={false}
    >
      <div
        className="budget-charts-container relative touch-pan-y"
        ref={sliderRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <h3 className="text-xl font-semibold mb-4 text-center h-16">
          {slides[currentSlide].title}
        </h3>
        <div className="chart-container h-[500px]">
          {slides[currentSlide].chart}
        </div>
        <div className="flex justify-center mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              aria-label="Changer de graphique"
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
                currentSlide === index
                  ? "bg-blue-500"
                  : "bg-gray-300 transform scale-75"
              }`}
            />
          ))}
        </div>
      </div>
    </SectionHeader>
  );
};

export default BudgetCharts;
