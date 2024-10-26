import Modal from "@/components/ui/Modal";
import { InfoPopupProps } from "@/types/types";
import React from "react";

const InfoPopup: React.FC<InfoPopupProps> = ({
  text,
  isOpen,
  onClose,
  title,
}) => {
  const renderContent = () => {
    if (typeof text === "string") {
      return <p>{text}</p>;
    }

    if (typeof text === "object" && text !== null) {
      return (
        <>
          <p className="whitespace-pre-wrap mb-4">{text.description}</p>
          {text.example && (
            <p className="my-4 text-blue-600 italic whitespace-pre-wrap">
              {text.example}
            </p>
          )}
        </>
      );
    }

    return null;
  };

  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      {renderContent()}
    </Modal>
  );
};

export default InfoPopup;
