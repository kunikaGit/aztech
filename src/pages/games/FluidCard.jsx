import React from 'react';
import './FluidCard.scss'; // Assuming SCSS is in the same folder

const FluidCard = ({
  fillColor = '#3B82F6',
  fillPercentage = 70,
  backgroundImage = 'https://images.pexels.com/photos/3912979/pexels-photo-3912979.jpeg?auto=compress&cs=tinysrgb&w=800',
  width = '400px',
  height = '300px',
  className = ''
}) => {
  const styleVars = {
    '--fill-color': fillColor,
    '--fill-percentage': `${fillPercentage}%`,
    '--card-width': width,
    '--card-height': height,
    '--bg-image': `url(${backgroundImage})`,
  };

  return (
    <div className={`fluid-card ${className}`} style={styleVars}>
      <div className="fluid-card__background"></div>
      <div className="fluid-card__overlay"></div>
      <div className="fluid-card__text-container">
        <div className="fluid-card__fluid-bg"></div>
        <div className="fluid-card__text">AZ</div>
      </div>
    </div>
  );
};

export default FluidCard;
