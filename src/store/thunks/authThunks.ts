import useFetch from "@/hooks/use-fetch";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginFail, loginStart, loginSuccess } from "../slices/authSlice";

interface LoginPayload {
  username: string;
  password: string;
}

// const { post } = useFetch();

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: LoginPayload, { dispatch }) => {
    try {
      dispatch(loginStart());
      //   const response = await post("/api/v1/auth/login", {
      //     username: payload.username,
      //     password: payload.password,
      //   });

      const response = await fetch("http://localhost:7979/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }

      dispatch(
        loginSuccess({ id: data.id, name: data.name, email: data.email })
      );
    } catch (error: any) {
      return dispatch(loginFail(error.message));
    }
  }
);
