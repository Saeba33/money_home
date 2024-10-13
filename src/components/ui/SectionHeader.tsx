import React, { useState, useRef, useEffect } from "react";
import { BsInfoSquareFill } from "react-icons/bs";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { SectionHeaderProps } from "@/types/types";
import InfoPopup from "@/components/ui/InfoPopup";
import { INFO_TEXTS } from "@/constants";

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  infoTextKey,
  children,
  defaultOpenedSection = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpenedSection);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerId = `${title.toLowerCase().replace(/\s+/g, "-")}-header`;
  const contentId = `${title.toLowerCase().replace(/\s+/g, "-")}-content`;

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
      } else {
        contentRef.current.style.maxHeight = "0";
      }
    }
  }, [isOpen, children]);

  const toggleInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsInfoPopupOpen(!isInfoPopupOpen);
  };

  return (
    <div className="section-container">
      <div
        className={`section-header-${isOpen ? "open" : "closed"}`}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        id={headerId}
      >
        <h2 className="section-title">
          {title}
          <button
            onClick={toggleInfo}
            className="section-info"
            aria-label={`Plus d'informations sur ${title}`}
          >
            <BsInfoSquareFill />
          </button>
        </h2>
        {isOpen ? (
          <FaChevronUp size={20} aria-hidden="true" />
        ) : (
          <FaChevronDown size={20} aria-hidden="true" />
        )}
      </div>
      <div
        ref={contentRef}
        className={`section-content ${isOpen ? "open" : "closed"}`}
        id={contentId}
        role="region"
        aria-labelledby={headerId}
      >
        <div className="section-content-inner">{children}</div>
      </div>
      <InfoPopup
        text={INFO_TEXTS[infoTextKey]}
        isOpen={isInfoPopupOpen}
        onClose={() => setIsInfoPopupOpen(false)}
        title={title}
      />
    </div>
  );
};

export default SectionHeader;
