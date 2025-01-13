import { useState, useCallback } from "react";
import { remoteUrl } from "../constants/api";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions {
  method: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
}

interface UseFetchResponse {
  get: <T = any>(endpoint: string, params?: Record<string, any>) => Promise<T>;
  post: <T = any>(endpoint: string, body?: any) => Promise<T>;
  put: <T = any>(endpoint: string, body?: any) => Promise<T>;
  del: <T = any>(endpoint: string, body?: any) => Promise<T>;
  loading: boolean;
  error: Error | null;
}

const useFetch = (): UseFetchResponse => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(
    async <T>(endpoint: string, options: FetchOptions): Promise<T> => {
      setLoading(true);
      setError(null);

      try {
        const accessToken = localStorage.getItem("accessToken");
        const url = `${remoteUrl}${endpoint}`;
        const headers: Record<string, string> = {
          Authorization: `Bearer ${accessToken || ""}`,
          ...options.headers,
        };

        if (!(options.body instanceof FormData)) {
          headers["Content-Type"] = "application/json";
        }

        const response = await fetch(url, {
          method: options.method,
          headers,
          body:
            options.method !== "GET" && options.body
              ? options.body instanceof FormData
                ? options.body
                : JSON.stringify(options.body)
              : undefined,
        });

        const contentType = response.headers.get("content-type");
        const data = contentType?.includes("application/json")
          ? await response.json()
          : await response.text();

        if (!response.ok) {
          throw new Error(
            typeof data === "string" ? data : data.message || "Request failed"
          );
        }

        return data as T;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("An unknown error occurred");
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const get = useCallback(
    <T = any>(endpoint: string, params?: Record<string, any>): Promise<T> => {
      let queryString = "";
      if (params) {
        queryString = `?${new URLSearchParams(params).toString()}`;
      }

      return fetchData<T>(endpoint + queryString, {
        method: "GET",
      });
    },
    [fetchData]
  );

  const post = useCallback(
    <T = any>(endpoint: string, body?: any): Promise<T> => {
      return fetchData<T>(endpoint, {
        method: "POST",
        body,
      });
    },
    [fetchData]
  );

  const put = useCallback(
    <T = any>(endpoint: string, body?: any): Promise<T> => {
      return fetchData<T>(endpoint, {
        method: "PUT",
        body,
      });
    },
    [fetchData]
  );

  const del = useCallback(
    <T = any>(endpoint: string, body?: any): Promise<T> => {
      return fetchData<T>(endpoint, {
        method: "DELETE",
        body,
      });
    },
    [fetchData]
  );

  return {
    get,
    post,
    put,
    del,
    loading,
    error,
  };
};

export default useFetch;
