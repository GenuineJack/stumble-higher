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
    <button
      style={{
        backgroundColor: splashBackgroundColor,
        padding: "10px 20px",
        borderRadius: "5px",
        color: "#000",
        border: "none",
        cursor: "pointer",
      }}
      onClick={() => {
        window.open(url, "_blank");
      }}
    >
      <img src={splashImageUrl} alt={title} style={{ marginRight: "10px", height: "20px" }} />
      {title}
    </button>
  );
};

export default FrameButton;
