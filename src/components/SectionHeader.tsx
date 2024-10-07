import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { BsInfoSquareFill } from "react-icons/bs";
import InfoPopup from "./InfoPopup";
import { SectionHeaderProps } from "../types/types";

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  infoText,
  children,
  defaultOpenedSection = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpenedSection);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);

  const toggleInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsInfoPopupOpen(!isInfoPopupOpen);
  };

  return (
    <div className="section-container">
      <div
        className={`section-header-${isOpen ? "open" : "closed"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="section-title">
          {title}
          <button
            onClick={toggleInfo}
            className="section-info"
            aria-label="Plus d'informations"
          >
            <BsInfoSquareFill />
          </button>
        </h2>
        {isOpen ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
      </div>
      {isOpen && <div className="section-content">{children}</div>}
      <InfoPopup
        text={infoText}
        isOpen={isInfoPopupOpen}
        onClose={() => setIsInfoPopupOpen(false)}
      />
    </div>
  );
};

export default SectionHeader;
