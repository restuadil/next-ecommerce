import React from "react";

const Button = ({ onClick, children, variant, className, type }) => {
  const backgroundColor =
    variant === "primary" ? "bg-slate-900" : "bg-blue-500";

  return (
    <button
      type={type}
      className={` ${backgroundColor}  font-semibold hover:bg-opacity-80 transition duration-300 ${className} `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
