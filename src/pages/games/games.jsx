import React from 'react';

const GameEmbed = ({ src, width = 200, height = 200 }) => {
  return (
      <iframe
        src={src}
        width={width}
        height={height}
        scrolling="none"
        frameBorder="0"
        allowFullScreen
        title="Game"
        style={{ border: 'none', borderRadius: '10px' }}
      ></iframe>
  );
};

export default GameEmbed;
