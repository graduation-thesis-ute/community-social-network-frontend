import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import LoginPage from "./page/login-page";
import HomePage from "./page/home-page";
import LoginGGPage from "./page/test-login-gg";
import { Provider } from "react-redux";
import store from "./store";
import Auth from "./components/specific/auth/auth-redux";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  );
}
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login-gg" element={<LoginGGPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
