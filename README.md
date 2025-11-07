# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 🌤️ React + Node Weather App (Full-Stack Starter)

Welcome!  
This is a **beginner-friendly full-stack example** that connects a React (Vite) frontend with your Node.js backend.

It’s designed to be **small, visual, and easy to expand** — perfect for learning how frontend and backend talk to each other.

---

## 🧠 What This Project Does

It shows weather data from your Node server’s endpoint:

```
GET /api/weather?latitude=31.5&longitude=74.3&limit=8
```

Your Node server calls the **Open-Meteo API**, sends the result to the frontend,  
and React renders it as a list of hourly temperatures.

---

## 🧩 Tech Stack

| Layer | Tool | Purpose |
|-------|------|----------|
| **Frontend** | React + Vite | Modern fast UI with instant updates |
| **Backend** | Node.js + Express | Serves `/api/weather` and other demo routes |
| **HTTP Helper** | `api()` function | Reusable fetch wrapper |
| **Hook** | `useApi()` | Handles loading, error, data state |

---

## ⚙️ How To Run It

### 1️⃣ Start your Node server
Make sure your **Node Starter** project is running:
```bash
node server.js
# or npm start
```

✅ It should log something like:
```
✅ Server running on http://localhost:3000
```

### 2️⃣ Start this React app
In this project folder:
```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (e.g. `http://localhost:5173`).

> The React app automatically proxies all `/api/*` and `/health` calls to your Node server (thanks to `vite.config.js`),  
> so you **don’t** have to deal with CORS errors.

---

## 🧭 How It Works (Step-by-Step)

1. The React page (`src/pages/Weather.jsx`) runs:
   ```js
   api(`/api/weather?latitude=${lat}&longitude=${lon}&limit=${limit}`)
   ```
2. The call goes through **Vite’s proxy** → `http://localhost:3000/api/weather`
3. Your **Node server** fetches data from **Open-Meteo API**
4. JSON is returned to the frontend
5. React displays it inside styled cards

That’s the entire full-stack loop 🌍➡️🌦️➡️📊

---

## 📁 Folder Overview

```
src/
├── api/
│   └── client.js      # api() helper (wraps fetch)
├── hooks/
│   └── useApi.js      # useApi(fetcher, deps) custom hook
├── pages/
│   └── Weather.jsx    # main weather page (fetch + render)
├── App.jsx            # app shell, imports Weather
├── main.jsx           # React root
└── index.css          # minimal dark theme
```

---

## 🧰 Key Concepts

### 1. **Frontend ↔ Backend**
- Frontend never talks directly to Open-Meteo.
- It calls your Node server → Node fetches real data.
- This is how we hide API keys and stay secure.

### 2. **Proxy Instead of CORS**
In `vite.config.js`:
```js
server: {
  proxy: {
    "^/(health|api)": { target: "http://localhost:3000", changeOrigin: true },
  },
}
```
This means:  
When you call `/api/weather` from React, Vite automatically sends it to `http://localhost:3000/api/weather`.

### 3. **Custom Hook Pattern**
The `useApi()` hook:
- Loads data automatically
- Handles `loading`, `error`, and `data` states
- Can be reused for any new endpoint

### 4. **Visual Feedback**
Students can:
- Change coordinates → instantly see different temperatures  
- Adjust `limit` → get more or fewer hourly readings  
- Observe live reloading → understand state updates

---

## 💡 Add a New Page (Mini Guide)

Let’s say you want a `/users` page.

### Step 1. Create a new file
`src/pages/Users.jsx`
```jsx
import { api } from "../api/client";
import { useApi } from "../hooks/useApi";

export default function Users() {
  const users = useApi(() => api("/api/users/42"), []);
  if (users.loading) return <div>Loading…</div>;
  if (users.error) return <div style={{color:"#ff6b6b"}}>{users.error}</div>;
  return <pre>{JSON.stringify(users.data, null, 2)}</pre>;
}
```

### Step 2. Show it in your app
Edit `src/App.jsx`:
```jsx
import Weather from "./pages/Weather.jsx";
import Users from "./pages/Users.jsx";

export default function App() {
  return (
    <>
      <Weather />
      {/* <Users />  ← enable this line when you want to show it */}
    </>
  );
}
```

Now React will fetch `/api/users/42` using the same hook pattern.

---

## 🧑‍🏫 Teaching Flow (Suggested 15-minute explanation)

1. **Start both servers**
   - Node on port 3000
   - React via Vite on port 5173

2. **Explain the proxy**
   - All `/api/*` requests go through to Node.

3. **Open `Weather.jsx`**
   - Show how `useApi` calls `api('/api/weather?...')`.

4. **Open Network tab**
   - Show the real call → JSON response → React renders.

5. **Try a new coordinate**
   - “Let’s check Karachi, latitude 24.8, longitude 67.0”
   - Watch it live update.

6. **Show how to make new pages**
   - Copy `Weather.jsx` → rename → adjust endpoint.

7. **Optional homework**
   - Make `/users` or `/todos` page
   - Add a small “loading” animation
   - Style the cards differently

---

## 🪄 For Students (Quick Summary)

- React is the **frontend**
- Node/Express is the **backend**
- `fetch('/api/...')` connects them
- `useApi()` makes it easy to reuse this pattern
- You can create new pages and call new endpoints anytime

---

## 🧹 Troubleshooting

| Issue | Fix |
|-------|-----|
| Blank white screen | Check console → import/export mismatch or syntax error |
| CORS error | Ensure Vite proxy in `vite.config.js` is active |
| Node not reachable | Confirm Node server runs on port 3000 |
| Wrong data | Adjust latitude/longitude values |
| JSON parse error | Your Node route must return `res.json(...)` |

---

## 🎯 Learning Outcomes

By the end of this exercise, students should understand:
1. How frontend and backend communicate via API calls.  
2. What “fetching data” and “state updates” mean in React.  
3. Why we keep API logic separate (`api()` and `useApi()`).  
4. How to easily add new features (pages + endpoints).  

---

**Instructor tip:**  
Run this demo live → change coordinates → show the request in Chrome DevTools → highlight the JSON payload.  
It helps students connect *“what React shows”* with *“what the server sends.”*

---

✅ That’s it — one clean, understandable full-stack example!  
React handles the interface, Node handles the data.  
Add a new page, change an API, and watch it all update in real time.
