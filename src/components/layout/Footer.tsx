import React, { useState } from "react";
import PrivacyPolicyModal from "@/components/layout/PrivacyPolicy";

const Footer: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} BEA. Tous droits
          réservés.
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Politique de confidentialité
        </button>
      </div>

      <PrivacyPolicyModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </footer>
  );
};

export default Footer;
