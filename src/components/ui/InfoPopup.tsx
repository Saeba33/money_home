import React, { useEffect, useRef } from "react";
import { InfoPopupProps } from "@/types/types";

const InfoPopup: React.FC<InfoPopupProps> = ({
  text,
  isOpen,
  onClose,
  title,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const renderContent = () => {
    if (typeof text === "string") {
      return <p className="text-sm text-gray-700">{text}</p>;
    } else if (typeof text === "object" && text !== null) {
      return (
        <>
          <p className="text-sm mb-4 text-gray-700 whitespace-pre-wrap">
            {text.description}
          </p>
          {text.example && (
            <>
              <p className="text-sm my-4 text-blue-600 italic whitespace-pre-wrap">
                {text.example}
              </p>
            </>
          )}
        </>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={popupRef}
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl text-gray-800 font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-4xl"
            aria-label="Fermer"
          >
            &times;
          </button>
        </div>

        <div className="overflow-y-auto p-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default InfoPopup;
