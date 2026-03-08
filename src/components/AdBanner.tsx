import React from 'react';

interface AdBannerProps {
  className?: string;
  slot?: string;
  format?: 'horizontal' | 'vertical' | 'rectangle';
}

const AdBanner: React.FC<AdBannerProps> = ({ className = '', slot = '1234567890', format = 'horizontal' }) => {
  return (
    <div className={`bg-gray-100 border border-gray-200 flex flex-col items-center justify-center p-4 text-gray-400 text-sm font-medium ${className}`}>
      <span className="uppercase tracking-widest mb-1 text-xs">Advertisement</span>
      {/* 
        This is a placeholder for Google AdSense. 
        In production, replace the div content below with your <ins> tag.
      */}
      <div className={`bg-gray-200 w-full flex items-center justify-center rounded ${format === 'vertical' ? 'h-96' : 'h-24'}`}>
        <span>Google Ad Slot #{slot}</span>
      </div>
    </div>
  );
};

export default AdBanner;