import React from "react";

const Button = ({
  onClick,
  children,
  className = "",
  disabled = false,
  variant = "default",
  type = "button",
  ...props
}) => {
  const base = "flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition focus:ring-2";
  
  const variants = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 