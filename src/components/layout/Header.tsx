import React from "react";
import { FaBalanceScale, FaChartLine, FaPiggyBank } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";

const Header: React.FC = () => {
  return (
    <header className="text-center pt-8 pb-16 lg:py-20 ">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col items-center w-full justify-between gap-4 lg:gap-8">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4 sm:gap-8 mb-4">
              <FaBalanceScale
                size={80}
                className="text-blue-800"
              />

              <h1 className="text-4xl md:text-6xl font-extrabold text-blue-800">
                BÉA
              </h1>
            </div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 italic max-w-2xl leading-relaxed">
              Votre alliée pour maîtriser votre budget
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 lg:gap-6 3xl:gap-10">
            {[
              {
                text: "Budget",
                icon: FaHandHoldingDollar,
                color: "purple-600",
              },
              { text: "Épargne", icon: FaPiggyBank, color: "green-600" },
              { text: "Analyse", icon: FaChartLine, color: "red-600" },
            ].map(({ text, icon: Icon, color }) => (
              <div
                key={text}
                className="flex flex-col items-center justify-between bg-white p-5 rounded-lg shadow-md  w-28 h-28"
              >
                <span className="text-lg font-semibold mb-2">{text}</span>
                <Icon size={36} className={`text-${color}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
