import React, {useEffect, useRef} from "react";
import { InfoPopupProps } from "@/types/types";

const InfoPopup: React.FC<InfoPopupProps> = ({ text, isOpen, onClose }) => {
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
      return <p>{text}</p>;
    } else if (typeof text === "object" && text !== null) {
      return (
        <>
          <p>{text.description}</p>
          {text.example && (
            <>
              <hr className="my-2" />
              <p className="italic text-blue-500">{text.example}</p>
            </>
          )}
        </>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
      <div
        ref={popupRef}
        className={`bg-white p-4 rounded-lg shadow-lg max-w-md w-full relative transform transition-all duration-300 ease-in-out ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &#x2715;
        </button>
        <div className="mt-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default InfoPopup;
