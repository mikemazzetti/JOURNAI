import React from "react";

const TextArea = ({
  value,
  onChange,
  placeholder,
  className = "",
  rows = 6,
  ...props
}) => {
  const base = "w-full min-h-[80px] rounded-md border px-3 py-2 text-sm focus:ring-2";

  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`${base} ${className}`}
      {...props}
    />
  );
};

export default TextArea; 