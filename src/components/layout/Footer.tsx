import React, { useState } from "react";
import PrivacyPolicy from "@/components/layout/PrivacyPolicy";

const Footer: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <footer className="bg-gray-800 text-white">
      <div className="p-4 flex items-center justify-between">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} - BEA
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="text-sm text-blue-300 hover:text-blue-100 transition-colors duration-200 underline"
        >
          Politique de confidentialité
        </button>
      </div>

      <PrivacyPolicy isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </footer>
  );
};

export default Footer;
