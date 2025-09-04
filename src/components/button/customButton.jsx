import React from "react";

const CustomButton = (props) => {
  return (
    <div className="flex items-center">
      <button className="bg-teal-600 text-white px-4 py-2 rounded-full font-bold shadow-lg cursor-pointer text-shadow-md hover:bg-teal-700 transition duration-200">
        {props.label}
      </button>
    </div>
  );
};

export default CustomButton;
