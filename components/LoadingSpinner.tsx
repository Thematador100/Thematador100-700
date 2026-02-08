
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      <p className="text-slate-300 text-lg">Generating Audience Insights...</p>
      <p className="text-slate-500 text-sm">This may take a moment.</p>
    </div>
  );
};

export default LoadingSpinner;
