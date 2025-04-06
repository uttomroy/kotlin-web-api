import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main
    style={{
      position: "relative", // Make the main container a positioned element
      minHeight: "100vh",
      width: "100%",
    }}
  >
    {/* Background Image */}
    <div
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.1, // Reduce the opacity of the background image
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1, // Ensure the background is behind the content
      }}
    ></div>

    {/* Main Content */}
    <h1>Welcome to My Page</h1>
    <p>This is the main content area.</p>
  </main>
      <footer>
        <p>This is the footer.</p>
      </footer>
    </div>
  );
}
