import { Metadata } from "next";

const appUrl = process.env.NEXT_PUBLIC_URL;

interface Props {
  params: {
    name: string;
  };
}

// Generate dynamic metadata for personalized Frames
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = params;

  const frame = {
    version: "next",
    imageUrl: `${appUrl}/frames/${name}/opengraph-image`,
    button: {
      title: "Launch Frame",
      action: {
        type: "launch_frame",
        name: `StumbleHigher Frame: ${name}`,
        url: `${appUrl}/frames/${name}/`,
        splashImageUrl: `${appUrl}/splash.png`,
        splashBackgroundColor: "#f7f7f7`,
      },
    },
  };

  return {
    title: `Discover: ${name}`,
    description: `Explore curated content about ${name}.`,
    openGraph: {
      title: `Discover: ${name}`,
      description: `Explore curated content about ${name}.`,
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

// Render the Frame content directly
export default function FramePage({ params }: Props) {
  const { name } = params;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to {name}'s Frame!</h1>
      <p>Explore curated content for {name}.</p>
    </div>
  );
}
