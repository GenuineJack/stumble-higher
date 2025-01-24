import React from "react";

interface FrameButtonProps {
  title: string;
  url: string;
  splashImageUrl: string;
  splashBackgroundColor: string;
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
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center rounded-lg p-4 text-white"
      style={{
        backgroundImage: `url(${splashImageUrl})`,
        backgroundSize: "cover",
        backgroundColor: splashBackgroundColor,
      }}
    >
      {title}
    </a>
  );
};

export default FrameButton;
