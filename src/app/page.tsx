"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import AnalyseManager from "@/components/sections/AnalyseManager";
import ContributionChart from "@/components/sections/BudgetCharts";
import ContributionManager from "@/components/sections/BudgetManager";
import DistributionMode from "@/components/sections/DistributionMode";
import ExpensesManager from "@/components/sections/ExpensesManager";
import IncomeManager from "@/components/sections/IncomeManager";
import PeopleManager from "@/components/sections/PeopleManager";
import SavingsManager from "@/components/sections/SavingsManager";
import PDFExportButton from "@/components/ui/ExportButton";
import { NotificationProvider } from "@/components/ui/Notifications";
import ResetButton from "@/components/ui/ResetButton";
import { AppProvider } from "@/contexts/AppContext";
import { useHasFinancialData } from "@/hooks/useHasFinancialData";
import React from "react";

const AppContent: React.FC = () => {
  const { hasAnySignificantData } = useHasFinancialData();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="max-w-[1500px] mx-auto p-4">
          <Header />
          <div className="flex flex-col gap-6">
            <PeopleManager />
            <IncomeManager />
            <SavingsManager />
            <ExpensesManager />
            <DistributionMode />
            {hasAnySignificantData && (
              <>
                <ContributionManager />
                <ContributionChart />
                <AnalyseManager />
              </>
            )}
          </div>
          <div className="flex items-center justify-between">
            <PDFExportButton />
            <ResetButton />
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
