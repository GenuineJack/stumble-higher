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
        display: "inline-block",
        backgroundColor: splashBackgroundColor,
        padding: "10px 20px",
        borderRadius: "5px",
        color: "#fff",
        textDecoration: "none",
        textAlign: "center",
      }}
    >
      <div
        style={{
          backgroundImage: `url(${splashImageUrl})`,
          backgroundSize: "cover",
          height: "150px",
          width: "150px",
          margin: "0 auto",
          borderRadius: "50%",
        }}
      ></div>
      <span>{title}</span>
    </a>
  );
};

export default FrameButton;
