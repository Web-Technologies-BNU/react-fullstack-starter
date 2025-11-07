import { useEffect, useRef, useState } from "react";

export function useApi(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const mounted = useRef(true);

  async function run() {
    try {
      setLoading(true); setError("");
      const d = await fetcher();
      if (mounted.current) setData(d);
    } catch (e) {
      if (mounted.current) setError(e.message || "Unknown error");
    } finally {
      if (mounted.current) setLoading(false);
    }
  }

  useEffect(() => { mounted.current = true; run(); return () => { mounted.current = false; }; /* eslint-disable-next-line */ }, deps);

  return { data, error, loading, reload: run };
}
