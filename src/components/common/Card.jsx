import React from "react";

const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-lg border bg-white text-gray-900 shadow-sm p-4 sm:p-6 ${className}`}
  >
    {children}
  </div>
);

export default Card; 