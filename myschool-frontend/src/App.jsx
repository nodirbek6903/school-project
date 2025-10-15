import { BrowserRouter, Routes, Route, } from "react-router-dom";
import WebsiteLayout from "./components/websitelayout/websiteLayout";
import Home from "./pages/Websites/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import NotFound from "./pages/NotFound/NotFound";
import AppRoutes from "./routes/AppRoutes";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state) => state.auth.token);
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>
        {token && role ? (
          <>
            <Route path="/*" element={<AppRoutes />} />
          </>
        ) : (
          <>
            <Route element={<WebsiteLayout />}>
              <Route index element={<Home />} />
            </Route>
          </>
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
