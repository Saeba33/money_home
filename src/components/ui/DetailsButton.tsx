import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ShowHideDetailsButtonProps } from "@/types/types";

const ShowHideDetailsButton: React.FC<ShowHideDetailsButtonProps> = ({
  isExpanded,
  onClick,
  expandedText,
  collapsedText,
}) => (
  <button
    onClick={onClick}
    aria-label={isExpanded ? "Réduire la section" : "Étendre la section"}
    className="mt-2 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 flex items-center"
  >
    {isExpanded ? (
      <>
        {expandedText} <FaChevronUp className="ml-2" />
      </>
    ) : (
      <>
        {collapsedText} <FaChevronDown className="ml-2" />
      </>
    )}
  </button>
);

export default ShowHideDetailsButton;
