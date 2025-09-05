import React from "react";

const CustomButton = ({ label, onClick, className = "", ...props }) => {
  // Default classes
  const defaultClasses =
    "px-4 py-2 rounded-full font-bold shadow-lg text-shadow-sm cursor-pointer transition duration-200";

  const buttonClasses = className
    ? `${defaultClasses} ${className}`
    : `${defaultClasses} bg-teal-600 text-white hover:bg-teal-700`;

  return (
    <div className="flex items-center">
      <button className={buttonClasses} onClick={onClick} {...props}>
        {label}
      </button>
    </div>
  );
};

export default CustomButton;
