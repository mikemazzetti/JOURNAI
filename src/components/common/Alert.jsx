import React from "react";

const Alert = ({ message, type = "info", className = "" }) => {
  const colors = {
    info: "bg-blue-100 border-blue-300 text-blue-800",
    error: "bg-red-100 border-red-300 text-red-800",
    warning: "bg-yellow-100 border-yellow-300 text-yellow-800",
    success: "bg-green-100 border-green-300 text-green-800",
  };
  
  if (!message) return null;
  
  return (
    <div
      className={`border rounded-md p-3 text-sm ${colors[type]} ${className}`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Alert; 