"use client";

import React from "react";
import Header from "@/components/layout/Header";
import RevenuesManager from "@/components/sections/RevenuesManager";
import AnalyseManager from "@/components/sections/AnalyseManager";
import ContributionChart from "@/components/sections/ContributionChart";
import ContributionManager from "@/components/sections/ContributionManager";
import DistributionMode from "@/components/sections/DistributionMode";
import ExpensesManager from "@/components/sections/ExpensesManager";
import PeopleManager from "@/components/sections/PeopleManager";
import SavingsManager from "@/components/sections/SavingsManager";
import PDFExportButton from "@/components/ui/ExportButton";
import { AppProvider } from "@/contexts/AppContext";
import { useHasFinancialData } from "@/hooks/useHasFinancialData";
import { NotificationProvider } from "@/components/ui/Notifications";
import ResetButton from "@/components/ui/ResetButton";
import Footer from "@/components/layout/Footer";

const AppContent: React.FC = () => {
  const { hasAnySignificantData } = useHasFinancialData();

  return (
    <div className="max-w-[1500px] mx-auto p-4">
      <Header />
      <div className="flex flex-col gap-6">
        <PeopleManager />
        <RevenuesManager />
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
      <PDFExportButton />
      <ResetButton />
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