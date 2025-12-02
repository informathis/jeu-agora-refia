import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "py-3 px-6 rounded transition-all duration-300 font-serif font-bold tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-agora-blue text-white hover:bg-blue-900 shadow-md hover:shadow-lg border border-transparent",
    secondary: "bg-agora-gold text-white hover:bg-yellow-700 shadow-md hover:shadow-lg border border-transparent",
    outline: "bg-transparent border-2 border-agora-blue text-agora-blue hover:bg-blue-50",
    ghost: "bg-transparent text-stone-600 hover:text-agora-blue hover:bg-stone-200"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;