import React from 'react';

interface FrameButtonProps {
  title: string;
  url: string;
  splashImageUrl?: string;
  splashBackgroundColor?: string;
}

const FrameButton: React.FC<FrameButtonProps> = ({
  title,
  url,
  splashImageUrl,
  splashBackgroundColor,
}) => {
  return (
    <a
      href={url}
      style={{
        display: 'inline-block',
        padding: '10px 20px',
        backgroundColor: splashBackgroundColor || '#0070f3',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '4px'
      }}
    >
      {title}
    </a>
  );
};

export default FrameButton;
