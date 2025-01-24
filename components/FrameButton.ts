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
      style={{
        display: "block",
        backgroundColor: splashBackgroundColor,
        color: "#fff",
        padding: "1rem",
        borderRadius: "8px",
        textAlign: "center",
        textDecoration: "none",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backgroundImage: `url(${splashImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "150px",
          width: "100%",
          marginBottom: "0.5rem",
        }}
      />
      <span>{title}</span>
    </a>
  );
};

export default FrameButton;
