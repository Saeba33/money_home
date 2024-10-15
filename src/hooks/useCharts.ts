import { useAppContext } from "@/contexts/AppContext";
import { ChartData, ChartOptions } from "chart.js";
import { COLORS_CHART_1, COLORS_CHART_2, COLORS_CHART_3 } from "@/constants/charts";

export const useCharts = () => {
  const { budgets, people, distributionMode } = useAppContext();

  const pieChartData: ChartData<"pie", number[], string> = {
    labels: budgets.budgets.map((b) => b.name),
    datasets: [
      {
        data: budgets.budgets.map((b) => b.totalOutflows),
        backgroundColor: Object.values(COLORS_CHART_1),
      },
    ],
  };

  const barChartData: ChartData<"bar", number[], string> = {
    labels: budgets.budgets.map((b) => b.name),
    datasets: [
      {
        label: "Revenus personnels",
        data: budgets.budgets.map((b) => b.personalIncome),
        backgroundColor: COLORS_CHART_2.revenusPersonnels,
        stack: "revenus",
      },
      {
        label: "Revenus du foyer",
        data: budgets.budgets.map((b) => b.foyerIncome),
        backgroundColor: COLORS_CHART_2.revenusFoyer,
        stack: "revenus",
      },
      {
        label: "Dépenses personnelles",
        data: budgets.budgets.map((b) => b.personalExpenses),
        backgroundColor: COLORS_CHART_2.depensesPersonnelles,
        stack: "depenses",
      },
      {
        label: "Dépenses du foyer",
        data: budgets.budgets.map((b) => b.foyerExpenses),
        backgroundColor: COLORS_CHART_2.depensesFoyer,
        stack: "depenses",
      },
      {
        label: "Épargne personnelle",
        data: budgets.budgets.map((b) => b.personalSavings),
        backgroundColor: COLORS_CHART_2.epargnePersonnelle,
        stack: "depenses",
      },
      {
        label: "Épargne du foyer",
        data: budgets.budgets.map((b) => b.foyerSavings),
        backgroundColor: COLORS_CHART_2.epargneFoyer,
        stack: "depenses",
      },
    ],
  };

  const lineChartData: ChartData<"line", number[], string> = {
    labels: ["Revenus totaux", "Dépenses totales", "Épargne totale", "Balance"],
    datasets: [
      {
        label: "Montant",
        data: [
          budgets.summary.totalGlobalIncome,
          budgets.summary.totalGlobalExpenses,
          budgets.summary.totalGlobalSavings,
          budgets.summary.totalBalance,
        ],
        borderColor: COLORS_CHART_3.balance,
        tension: 0.1,
        pointBackgroundColor: COLORS_CHART_3.balance,
      },
    ],
  };

  const pieChartOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const personalPercentage =
              distributionMode === "égalitaire"
                ? (100 / people.length).toFixed(2)
                : budgets.budgets
                    .find((b) => b.name === label)
                    ?.percentage.toFixed(2) || "0";
            return [
              `${new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(value)} (${personalPercentage}%)`,
            ];
          },
        },
      },
    },
  };

  const barChartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += " : ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  const lineChartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "line",
        },
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: function (context) {
            let label = "Montant : ";
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        grid: {
          display: true,
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 4,
        hoverRadius: 6,
      },
    },
  };

  return {
    pieChartData,
    barChartData,
    lineChartData,
    pieChartOptions,
    barChartOptions,
    lineChartOptions,
    peopleCount: people.length,
  };
};
