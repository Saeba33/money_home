import React, { useEffect, useState } from "react";
import { FaBalanceScale, FaChartLine, FaPiggyBank } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";

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

  const cards = [
    {
      text: "Budget",
      icon: FaHandHoldingDollar,
      description: "Gérez vos finances",
      gradient: "from-amber-500/80 to-orange-600/80",
      glow: "before:bg-amber-500/20",
    },
    {
      text: "Épargne",
      icon: FaPiggyBank,
      description: "Préparez l'avenir",
      gradient: "from-emerald-500/80 to-green-600/80",
      glow: "before:bg-emerald-500/20",
    },
    {
      text: "Analyse",
      icon: FaChartLine,
      description: "Suivez vos dépenses",
      gradient: "from-blue-500/80 to-indigo-600/80",
      glow: "before:bg-blue-500/20",
    },
  ];

  return (
    <header className="relative pt-8 pb-16 lg:py-20 overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl relative">
        <div className="flex flex-col items-center gap-12 lg:gap-16">
          <div className="flex flex-col items-center relative">
            <div className="absolute inset-0 scale-150" />
            <div className="group flex items-center gap-4 sm:gap-6 relative">
              <div className="relative">
                <div className="absolute inset-0 rounded-full transform group-hover:scale-110 transition-all duration-300" />
                <FaBalanceScale
                  size={sizes.icon}
                  className="relative text-blue-500 transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h1
                className={`${sizes.title} font-black bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent`}
              >
                BÉA
              </h1>
            </div>
            <p
              className={`${sizes.subtitle} mt-4 text-gray-300 font-light max-w-2xl text-center leading-relaxed relative`}
            >
              Votre alliée pour{" "}
              <span className="font-medium text-blue-400">
                maîtriser votre budget
              </span>{" "}
              et atteindre vos objectifs financiers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {cards.map(({ text, icon: Icon, description, gradient, glow }) => (
              <div
                key={text}
                className={`group relative p-6 rounded-2xl overflow-hidden before:absolute before:inset-0 before:blur-3xl before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 ${glow}`}
              >
                <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/[0.07] to-transparent" />

                <div className="relative flex flex-col items-center text-center gap-3">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}
                  >
                    <Icon size={sizes.cardIcon} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{text}</h3>
                    <p className="text-sm text-gray-400">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
