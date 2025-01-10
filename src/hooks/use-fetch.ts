import { useState } from "react";

type FetchMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

function useFetch() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (
    url: string,
    method: FetchMethod = "GET",
    body?: any,
    headers?: Record<string, string>
  ) => {
    setLoading(true);
    setError(null);
    try {
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      };

      if (body && method !== "GET") {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setData(data);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, fetchData };
}

export default useFetch;
