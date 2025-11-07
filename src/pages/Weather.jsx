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

export default function Weather() {
  const [lat, setLat] = useState("31.5");
  const [lon, setLon] = useState("74.3");
  const [limit, setLimit] = useState("8");

  const weather = useApi(
    () => api(`/api/weather?latitude=${lat}&longitude=${lon}&limit=${limit}`),
    [lat, lon, limit]
  );

  return (
    <main style={{ padding: 20, display: "grid", gap: 16, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ margin: 0 }}>Weather App</h1>
      <p style={{ opacity: 0.8, marginTop: 4 }}>
        Fetches from your Node API: <code>/api/weather?latitude=&longitude=&limit=</code>
      </p>

      <Card title="Location & Options">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 8 }}>
          <input value={lat} onChange={e=>setLat(e.target.value)} placeholder="Latitude" style={iStyle}/>
          <input value={lon} onChange={e=>setLon(e.target.value)} placeholder="Longitude" style={iStyle}/>
          <input value={limit} onChange={e=>setLimit(e.target.value)} placeholder="Limit" style={iStyle}/>
          <button onClick={()=>weather.reload()} style={bStyle}>Reload</button>
        </div>
        <div style={{ marginTop: 8, opacity: 0.8, fontSize: 13 }}>
          Try Lahore default (31.5, 74.3) or your city’s coordinates.
        </div>
      </Card>

      <Card title="Forecast (first N hourly temps)">
        {weather.loading && <div>Loading…</div>}
        {weather.error && <div style={{ color: "#ff6b6b" }}>{weather.error}</div>}
        {weather.data && (
          <div style={{ display: "grid", gap: 8 }}>
            <div>Lat: <b>{weather.data.latitude}</b> · Lon: <b>{weather.data.longitude}</b> · Count: <b>{weather.data.count}</b></div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
              {weather.data.temperatures?.map((t, idx) => (
                <li key={idx} style={{ padding: 10, border: "1px solid #2b2b2b", borderRadius: 8 }}>
                  Hour #{idx + 1}: <b>{t}°C</b>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </main>
  );
}

const iStyle = { padding: "8px 10px", borderRadius: 8, border: "1px solid #2b2b2b", background: "#0b0b0c", color: "#fff" };
const bStyle = { padding: "8px 12px", borderRadius: 8, border: "1px solid #2b2b2b", background: "#17181f", color: "#fff", cursor: "pointer" };
