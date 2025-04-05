import React from "react";

const Button = ({ children, onClick, variant = "primary", size = "md", className = "" }) => {
    const baseStyles = "rounded-lg font-medium focus:outline-none transition-all";
    
    const variantStyles = {
        primary: "border border-white text-white bg-transparent hover:bg-white hover:text-black",
        secondary: "bg-gray-600 text-white hover:bg-gray-700",
        outline: "border border-white text-white hover:bg-white hover:text-black"
      };
      
      
    
    const sizeStyles = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg"
    };
    
    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;