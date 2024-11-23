import React from "react";
import PropTypes from "prop-types";

const BudgetProcess = ({ step }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center relative mb-4">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 -z-10" />
        {["Add Items", "Preview", "Confirm & Save"].map((label, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center 
                ${
                  step === index + 1
                    ? "bg-blue-600 text-white"
                    : step > index + 1
                    ? "bg-green-600 text-white"
                    : "bg-gray-700 text-gray-400"
                }`}
            >
              {step > index + 1 ? "✓" : index + 1}
            </div>
            <span className="text-sm text-gray-300">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

BudgetProcess.propTypes = {
  step: PropTypes.number.isRequired,
};
export default BudgetProcess;
