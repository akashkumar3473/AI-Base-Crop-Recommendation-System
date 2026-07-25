import React from 'react';

const Card = ({ children, className = '', style = {} }) => (
  <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl ${className}`} style={style}>
    {children}
  </div>
);

export default Card;
