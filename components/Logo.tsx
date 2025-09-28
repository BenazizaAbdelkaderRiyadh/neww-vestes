import React from 'react';

type LogoProps = {
  nameParts: [string, string, string];
};

export const Logo: React.FC<LogoProps> = ({ nameParts }) => {
  return (
    <div className="font-['Roboto_Mono',_monospace] text-4xl font-bold tracking-tight text-black">
      <span>{nameParts[0]}</span>
      <span className="bg-gradient-to-r from-fuchsia-600 to-purple-600 text-transparent bg-clip-text">
        {nameParts[1]}
      </span>
      <span>{nameParts[2]}</span>
    </div>
  );
};