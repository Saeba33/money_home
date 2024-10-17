import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-6">
        <div className="loader"></div>
        <p className="text-xl font-semibold text-gray-700">
          Chargement en cours...
        </p>
    </div>
  );
};

export default Loading;
