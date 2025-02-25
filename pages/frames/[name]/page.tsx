import { Metadata } from "next";
import App from "~/components/App";

const appUrl = process.env.NEXT_PUBLIC_URL || "https://www.stumblehigher.press";

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
        splashBackgroundColor: "#f7f7f7",
      },
    },
  };

  return (
  <App title={`Welcome to ${params.name}'s Frame!`}>
    <div>
      <p>This is your frame content for {params.name}.</p>
    </div>
  </App>
);
}

// Main component for dynamic frames
export default function FramePage({ params }: Props) {
  return <App title={`Welcome to ${params.name}'s Frame!`} />;
}
