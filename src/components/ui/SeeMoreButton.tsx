// components/ui/ToggleButton.tsx
import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface ToggleButtonProps {
  isExpanded: boolean;
  onClick: () => void;
  expandedText: string;
  collapsedText: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isExpanded,
  onClick,
  expandedText,
  collapsedText,
}) => (
  <button
    onClick={onClick}
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

export default ToggleButton;
