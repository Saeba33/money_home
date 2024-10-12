import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { PrivacyPolicyProps } from "@/types/types";


const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ isOpen, onClose }) => {
  const [copySuccess, setCopySuccess] = useState("");
  const email = "contact@cproust.com";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopySuccess("Copié !");
      setTimeout(() => setCopySuccess(""), 2000);
    } catch {
      setCopySuccess("Échec de la copie");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl text-gray-800 font-bold">
            Politique de confidentialité
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-4xl"
            aria-label="Fermer"
          >
            &times;
          </button>
        </div>

        <div className="overflow-y-auto p-4 text-sm text-gray-700">
          <h3 className="font-semibold mt-2">Responsable du traitement</h3>
          <p>
            Cette application est développée par Charles Proust. Pour toute
            question concernant vos données, vous pouvez nous contacter à
            <a
              href={`mailto:${email}`}
              className="text-blue-600 underline hover:text-blue-800 mx-2 inline-flex items-center"
            >
              {email}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  copyToClipboard();
                }}
                className="ml-1 p-1 text-gray-600 hover:text-gray-800 focus:outline-none"
                aria-label="Copier l'adresse e-mail"
              >
                <FaCopy className="w-4 h-4" />
              </button>
            </a>
            {copySuccess && (
              <span className="ml-2 text-green-600">{copySuccess}</span>
            )}
          </p>

          <h3 className="font-semibold mt-4">Données collectées</h3>
          <p>
            Notre application stocke des informations sur votre appareil, telles
            que les personnes de votre foyer, leurs revenus, leurs dépenses, et
            leurs épargnes. Ces données sont stockées localement grâce à une
            technologie appelée localStorage, utilisée uniquement pour améliorer
            votre expérience utilisateur.
          </p>

          <h3 className="font-semibold mt-4">Utilisation des données</h3>
          <p>
            Les informations que vous entrez dans l&apos;application sont
            uniquement utilisées pour permettre le calcul et l&apos;analyse de
            votre situation financière. Aucune donnée n&apos;est collectée,
            partagée ou envoyée à des tiers, ni stockée sur des serveurs
            externes.
          </p>

          <h3 className="font-semibold mt-4">Vos droits</h3>
          <p>
            Vous avez le droit de réinitialiser vos données à tout moment. Cela
            supprimera toutes les informations enregistrées localement sur votre
            appareil via le bouton &quot;Réinitialiser les données&quot; présent
            dans l&apos;application. Aucune de vos données n&apos;est accessible
            par nous ni par des tiers.
          </p>

          <h3 className="font-semibold mt-4">Sécurité des données</h3>
          <p>
            Comme vos données ne quittent pas votre appareil, vous en êtes le
            seul responsable. Nous ne collectons aucune donnée externe, mais
            vous êtes encouragé à sécuriser votre appareil et à vous assurer que
            vos informations restent confidentielles.
          </p>

          <h3 className="font-semibold mt-4">Durée de conservation</h3>
          <p>
            Les informations que vous entrez sont stockées localement
            jusqu&apos;à ce que vous choisissiez de réinitialiser ou de
            supprimer l&apos;application. Nous n&apos;avons aucun contrôle sur
            cette durée de stockage.
          </p>

          <h3 className="font-semibold mt-4">
            Modifications de cette politique
          </h3>
          <p>
            Cette politique de confidentialité peut être mise à jour pour
            refléter des modifications dans l&apos;application. Nous vous
            recommandons de consulter régulièrement cette section pour rester
            informé de tout changement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
