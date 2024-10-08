import React from "react";

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl ">
        <span className="text-primary">B</span>
        <span className="text-secondary">E</span>
        <span className="text-primary">A</span>
      </h1>
      <h2 className="text-2xl font-semibold mb-1">
        <span className="text-primary">B</span>udget,
        <span className="text-secondary"> É</span>pargne,
        <span className="text-primary"> A</span>nalyse
      </h2>
      <p className="text-lg text-gray-600 italic">
        Votre alliée pour maîtriser budget et épargne
      </p>
    </header>
  );
};

export default Header;
