import React from 'react';

const GameEmbed = ({ src, width = 200, height = 200 }) => {
  return (
      <div ><iframe
        src={src}
        width={width}
        height={height}
        scrolling="none"
        frameBorder="0"
        allowFullScreen
        title="Game"
        style={{ border: 'none', borderRadius: '10px' }}
      ></iframe></div>
  );
};

export default GameEmbed;
