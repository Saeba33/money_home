"use client";

import Header from "@/components/layout/Header";
import RevenuesManager from "@/components/sections/RevenuesManager";
import AnalyseManager from "@/components/sections/AnalyseManager";
import ContributionChart from "@/components/sections/chart/ContributionChart";
import ContributionManager from "@/components/sections/ContributionManager";
import DistributionMode from "@/components/sections/DistributionMode";
import ExpensesManager from "@/components/sections/ExpensesManager";
import PeopleManager from "@/components/sections/PeopleManager";
import SavingsManager from "@/components/sections/SavingsManager";
import PDFExportButton from "@/components/ui/ExportButton";
import React from "react";
import { AppProvider } from "@/contexts/AppContext";

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="max-w-[1500px] mx-auto p-4">
        <Header />
        <div className="flex flex-col gap-6">
          <PeopleManager />
          <RevenuesManager />
          <SavingsManager />
          <ExpensesManager />
          <DistributionMode />
          <ContributionManager />
          <ContributionChart />
          <AnalyseManager />
        </div>
        <PDFExportButton />
      </div>
    </AppProvider>
  );
};

export default App;
