import React from 'react';

const SectionHeading = ({ title, subtitle, center = false, className = '' }) => {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${className}`}>{title}</h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl mx-auto ${className}`}>{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeading;