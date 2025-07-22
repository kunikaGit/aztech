import React from 'react';
import './HollowCard.scss';

const HollowCard = ({ fillPercent, imageUrl }) => {
  return (
    <div className="hollow-card">
      {/* Background box with white fill from bottom up */}
      <div className="hollow-card__background">
        <div 
          className="hollow-card__fill"
          style={{ height: `${fillPercent}%` }}
        />
      </div>

      {/* Hollow AZ image overlay */}
      <img 
        src={imageUrl} 
        alt="Hollow AZ overlay"
        className="hollow-card__overlay"
      />
    </div>
  );
};

export default HollowCard;
