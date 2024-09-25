import React from 'react';

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  disabled?: boolean;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, icon, disabled }) => (
  <button
    className={`hover:text-cyan-400 transition-colors ${
      isActive ? "text-cyan-400" : "text-gray-300"
    }`}
    onClick={onClick}
    disabled={disabled}
  >
    {icon}
  </button>
);

export default TabButton;