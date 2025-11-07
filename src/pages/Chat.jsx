import { useState } from "react";
import { api } from "../api/client.js";
import { useApi } from "../hooks/useApi.js";

function Card({ title, children }) {
  return (
    <div style={{
      border: "1px solid #2b2b2b", borderRadius: 12, padding: 16,
      background: "#0f0f10", color: "#eaeaea"
    }}>
      <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 18 }}>{title}</div>
      {children}
    </div>
  );
}

export default function Chat() {
    const [question, setQuestion] = useState("hi");

  const chat = useApi(
    () => api(`/api/chat`, { method: "POST", body: { question } }),
    
  );

  return (
    <main style={{ padding: 20, display: "grid", gap: 16, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ margin: 0 }}>AI Chatbot App</h1>
      <p style={{ opacity: 0.8, marginTop: 4 }}>
        Fetches from your Node API: <code>/api/chat</code>
      </p>

      <Card title="Ask Chatgpt">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 8 }}>
        <input
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Type a question for ChatGPT…"
            style={iStyle}
          />
          <button onClick={()=>chat.reload()} style={bStyle}>Send</button>
        </div>
        <div style={{ marginTop: 8, opacity: 0.8, fontSize: 13 }}>
          Try Lahore default (31.5, 74.3) or your city’s coordinates.
        </div>
      </Card>

      <Card title="Forecast (first N hourly temps)">
        {chat.loading && <div>Loading…</div>}
        {chat.error && <div style={{ color: "#ff6b6b" }}>{achat.error}</div>}
        {chat.data && (
          <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
            <div style={{ fontSize: 13, opacity: 0.8 }}>
              <b>Model:</b> {chat.data.model}
            </div>
            <div style={{ fontSize: 13, opacity: 0.8 }}>
              <b>Question:</b> {chat.data.question}
            </div>
            <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.5, border: "1px solid #2b2b2b", borderRadius: 8, padding: 12 }}>
              {chat.data.response}
            </div>
          </div>
        )}
      </Card>
    </main>
  );
}

const iStyle = { padding: "8px 10px", borderRadius: 8, border: "1px solid #2b2b2b", background: "#0b0b0c", color: "#fff" };
const bStyle = { padding: "8px 12px", borderRadius: 8, border: "1px solid #2b2b2b", background: "#17181f", color: "#fff", cursor: "pointer" };
