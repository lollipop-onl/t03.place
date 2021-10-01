import React from 'react';

export const AdminUiCard: React.FC = ({ children }) => {
  return (
    <div className="py-6 md:py-8 px-4 md:px-6 bg-white rounded-lg">
      {children}
    </div>
  );
};
