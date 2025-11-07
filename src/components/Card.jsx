// src/components/Card.jsx
export default function Card({ title, children }) {
    return (
      <div style={{
        border: "1px solid #2b2b2b",
        borderRadius: 12,
        padding: 16,
        background: "#0f0f10",
        color: "#eaeaea",
        boxShadow: "0 4px 18px rgba(0,0,0,.25)"
      }}>
        <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 18 }}>{title}</div>
        <div>{children}</div>
      </div>
    );
  }
  