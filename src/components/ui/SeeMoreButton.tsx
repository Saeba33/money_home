import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ExpandCollapseButtonProps } from "@/types/types";

const ExpandCollapseButton: React.FC<ExpandCollapseButtonProps> = ({
  isExpanded,
  onClick,
  expandedText,
  collapsedText,
}) => (
  <button
    onClick={onClick}
    aria-label={isExpanded ? "Réduire la section" : "Étendre la section"}
    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
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

export default ExpandCollapseButton;
