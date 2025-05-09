import React from "react";

const Input = ({
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
  ...props
}) => {
  const base = "w-full h-10 rounded-md border px-3 py-2 text-sm focus:ring-2";

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${base} ${className}`}
      {...props}
    />
  );
};

export default Input; 