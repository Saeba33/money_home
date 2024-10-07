"use client";

import React from "react";
import { AppProvider } from "../contexts/AppContext";
import Header from "@/components/Header";
import PeopleManager from "@/components/PeopleManager";
import IncomeManager from "@/components/IncomeManager";
import ExpenseManager from "@/components/ExpenseManager";
import ContributionManager from "@/components/ContributionManager";
import DistributionMode from "@/components/DistributionMode";
import ContributionChart from "@/components/ContributionChart";
import PDFExportButton from "@/components/ExportButton";
import SavingsManager from "@/components/SavingsManager";
import AnalyseManager from "@/components/AnalyseManager";

const App: React.FC = () => {
  return (
      <AppProvider>
        <div className="max-w-[1500px] mx-auto p-4">
          <Header />
          <div className="flex flex-col gap-6">
            <PeopleManager />
            <IncomeManager />
            <SavingsManager />
            <ExpenseManager />
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
