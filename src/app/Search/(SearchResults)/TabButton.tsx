import React from "react";

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  disabled?: boolean;
  text: string;
}

const TabButton: React.FC<TabButtonProps> = ({
  isActive,
  onClick,
  icon,
  disabled,
  text,
}) => (
  <button
    className={`hover:text-teal-400 transition-colors flex items-center gap-1 ${
      isActive ? "text-teal-400" : "text-header"
    }`}
    onClick={onClick}
    disabled={disabled}
  >
    {icon}
    <div className="hidden md:inline-block text-sm">{text}</div>
  </button>
);

export default TabButton;
