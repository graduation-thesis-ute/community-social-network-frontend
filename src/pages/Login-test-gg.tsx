import React from "react";

const LoginGGPage = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:7979/auth/google";
  };

  return (
    <div>
      <h1>Đăng nhập</h1>
      <button onClick={handleGoogleLogin}>Đăng nhập với Google</button>
    </div>
  );
};

export default LoginGGPage;
