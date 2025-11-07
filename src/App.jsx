import Weather from "./pages/Weather.jsx";
import Chat from "./pages/Chat.jsx";

export default function App() {
  return (
    <div style={{ minHeight: "100dvh", background: "linear-gradient(180deg,#0b0b0c,#111217)", color: "#fff",
                  fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" }}>
      <header style={{ padding: "20px 20px 0" }}>
        <div style={{ opacity: 0.85 }}>React × Node — Minimal Weather App</div>
      </header>
      <Weather />
      <Chat />
    </div>
  );
}
