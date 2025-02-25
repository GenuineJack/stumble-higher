import { Metadata } from "next";
import App from "~/components/App";

interface Props {
  params: { name: string };
}

export default function FramePage({ params }: Props): JSX.Element {
  return (
    <App title={`Welcome to ${params.name}'s Frame!`}>
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Hello, {params.name}!</h1>
        <p>This is your custom frame content. Enjoy your experience!</p>
      </div>
    </App>
  );
}
