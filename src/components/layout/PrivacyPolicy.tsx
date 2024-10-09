import React from "react";

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full shadow-lg">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Politique de confidentialité</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
            aria-label="Fermer"
          >
            &#10005;
          </button>
        </div>

        <div className="text-sm text-gray-700 max-h-96 overflow-y-auto">
          <h3 className="font-semibold">Responsable du traitement</h3>
          <p>
            Cette application est développée par Charles Proust. Pour toute question concernant vos données, vous pouvez nous contacter à contact@cproust.com
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
            Les informations que vous entrez dans l&apos;application sont uniquement
            utilisées pour permettre le calcul et l&apos;analyse de votre situation
            financière. Aucune donnée n&apos;est collectée, partagée ou envoyée à des
            tiers, ni stockée sur des serveurs externes.
          </p>

          <h3 className="font-semibold mt-4">Vos droits</h3>
          <p>
            Vous avez le droit de réinitialiser vos données à tout moment. Cela
            supprimera toutes les informations enregistrées localement sur votre
            appareil via le bouton &quot;Réinitialiser les données&quot; présent dans
            l&apos;application. Aucune de vos données n&apos;est accessible par nous ni
            par des tiers.
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
            Les informations que vous entrez sont stockées localement jusqu&apos;à ce
            que vous choisissiez de réinitialiser ou de supprimer l&apos;application.
            Nous n&apos;avons aucun contrôle sur cette durée de stockage.
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
