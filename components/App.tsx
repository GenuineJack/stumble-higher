import React from "react";

interface AppProps {
  title: string;
  children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ title, children }) => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", textAlign: "center" }}>
      <h1>{title}</h1>
      <main>{children}</main>
    </div>
  );
};

export default App;
