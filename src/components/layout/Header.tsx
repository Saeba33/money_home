import React, { useEffect, useState } from "react";
import { FaBalanceScale, FaChartLine, FaPiggyBank } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { ColorKey, ColorClasses } from "@/types/types";

const Header: React.FC = () => {
  const [sizes, setSizes] = useState({
    icon: 80,
    title: "text-4xl",
    subtitle: "text-base",
    cardIcon: 24,
  });

  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setSizes({
        icon: 80,
        title: "text-4xl",
        subtitle: "text-sm",
        cardIcon: 24,
      });
    } else if (width < 768) {
      setSizes({
        icon: 100,
        title: "text-5xl",
        subtitle: "text-base",
        cardIcon: 28,
      });
    } else if (width < 1024) {
      setSizes({
        icon: 110,
        title: "text-6xl",
        subtitle: "text-lg",
        cardIcon: 32,
      });
    } else {
      setSizes({
        icon: 120,
        title: "text-7xl",
        subtitle: "text-xl",
        cardIcon: 36,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const colorClasses: ColorClasses = {
    amber: "text-amber-600",
    green: "text-green-600",
    red: "text-red-600",
  };

  const cards: Array<{
    text: string;
    icon: typeof FaHandHoldingDollar;
    color: ColorKey;
  }> = [
    {
      text: "Budget",
      icon: FaHandHoldingDollar,
      color: "amber",
    },
    {
      text: "Épargne",
      icon: FaPiggyBank,
      color: "green",
    },
    {
      text: "Analyse",
      icon: FaChartLine,
      color: "red",
    },
  ];

  return (
    <header className="text-center pt-8 pb-16 lg:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col items-center w-full justify-between gap-4 lg:gap-8">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4 sm:gap-8 mb-4">
              <FaBalanceScale
                size={sizes.icon}
                className="text-blue-800 transition-all duration-300"
              />
              <h1
                className={`${sizes.title} font-extrabold text-blue-800 transition-all duration-300`}
              >
                BÉA
              </h1>
            </div>
            <p
              className={`${sizes.subtitle} text-gray-700 italic max-w-2xl leading-relaxed transition-all duration-300`}
            >
              Votre alliée pour maîtriser votre budget
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
            {cards.map(({ text, icon: Icon, color }) => (
              <div
                key={text}
                className="flex flex-col items-center justify-between bg-white p-3 sm:p-4 md:p-5 rounded-lg shadow-md transition-all duration-300"
              >
                <span className="text-base sm:text-lg font-semibold mb-2">
                  {text}
                </span>
                <Icon
                  size={sizes.cardIcon}
                  className={`${colorClasses[color]} transition-all duration-300`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
