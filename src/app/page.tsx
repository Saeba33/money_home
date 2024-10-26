"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import AnalyseManager from "@/components/sections/AnalyseManager";
import BudgetChart from "@/components/sections/BudgetCharts";
import BudgetManager from "@/components/sections/BudgetManager";
import DistributionMode from "@/components/sections/DistributionMode";
import ExpensesManager from "@/components/sections/ExpensesManager";
import IncomeManager from "@/components/sections/IncomeManager";
import PeopleManager from "@/components/sections/PeopleManager";
import SavingsManager from "@/components/sections/SavingsManager";
import ExportButton from "@/components/ui/ExportButton";
import { NotificationProvider } from "@/components/ui/Notifications";
import ResetButton from "@/components/ui/ResetButton";
import { AppProvider } from "@/contexts/AppContext";
import { useHasFinancialData } from "@/hooks/useHasFinancialData";
import React from "react";
import { useAppContext } from "@/contexts/AppContext";

const AppContent: React.FC = () => {
  const { hasAnySignificantData } = useHasFinancialData();
  const { people } = useAppContext();

  return (
    <div className="flex flex-col min-h-screen text-gray-100">
      <div className="flex-grow relative">
        <div className="relative max-w-[1800px] mx-auto p-4">
          <Header />
          <div
            className={`flex flex-col gap-6 w-full ${
              hasAnySignificantData ? "3xl:flex-row 3xl:gap-20" : "3xl:flex-col"
            }`}
          >
            <div
              className={`flex flex-col gap-6 ${
                hasAnySignificantData ? "3xl:w-2/5" : "3xl:w-full"
              }`}
            >
              <PeopleManager />
              <IncomeManager />
              <SavingsManager />
              <ExpensesManager />
            </div>
            {hasAnySignificantData && (
              <div className="flex flex-col gap-6 3xl:w-3/5">
                {people.length > 1 && <DistributionMode />}
                <BudgetManager />
                <div className="flex flex-col 3xl:flex-row gap-6">
                  <div className="3xl:w-1/2">
                    <BudgetChart />
                  </div>
                  <div className="3xl:w-1/2">
                    <AnalyseManager />
                  </div>
                </div>
                <div className="flex flex-wrap items-center mb-12 gap-2 justify-center md:justify-between">
                  <ExportButton />
                  <ResetButton />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </AppProvider>
  );
};

export default App;
