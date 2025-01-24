import React from 'react';

export const Alert = ({ children, variant = 'default', className }) => {
  const baseStyles = 'p-4 rounded border';
  const variantStyles = {
    default: 'bg-gray-100 border-gray-300 text-gray-800',
    destructive: 'bg-red-100 border-red-400 text-red-700',
    success: 'bg-green-100 border-green-400 text-green-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-800',
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant] || variantStyles.default} ${className}`}>
      {children}
    </div>
  );
};

export const AlertTitle = ({ children }) => (
  <h2 className="font-bold text-lg">{children}</h2>
);

export const AlertDescription = ({ children }) => (
  <p className="text-sm mt-2">{children}</p>
);
